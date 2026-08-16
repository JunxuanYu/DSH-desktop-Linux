import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { RuntimeProcess } from '../src/launch.ts'
import type { ChildLike, KillGroup, SpawnLike } from '../src/launch.ts'

const scratch: string[] = []

async function makeScript(body: string): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-desktop-launch-'))
  scratch.push(dir)
  const file = join(dir, 'script.cjs')
  await writeFile(file, body)
  return file
}

/** Resolve once the child has written its readiness line, after its handlers are installed. */
async function whenReady(runtime: RuntimeProcess): Promise<void> {
  await new Promise<void>((resolve) => {
    runtime.child.stdout.on('data', () => { resolve() })
  })
}

afterAll(async () => {
  await Promise.all(scratch.map(dir => rm(dir, { recursive: true, force: true })))
})

describe('RuntimeProcess', () => {
  it('resolves exit when the child exits cleanly', async () => {
    const file = await makeScript('process.exit(0)')
    const runtime = new RuntimeProcess(process.execPath, [file])
    await expect(runtime.exit).resolves.toEqual({ code: 0, signal: null, error: undefined })
  })

  it('resolves exit with the nonzero code and keeps the stderr tail', async () => {
    const file = await makeScript("console.error('boom detail'); process.exit(3)")
    const runtime = new RuntimeProcess(process.execPath, [file])
    const exit = await runtime.exit
    expect(exit).toEqual({ code: 3, signal: null, error: undefined })
    expect(runtime.stderrTail).toContain('boom detail')
  })

  it('resolves exit with the spawn error when the command cannot start', async () => {
    const runtime = new RuntimeProcess('/nonexistent/dsh-desktop-binary', [])
    const exit = await runtime.exit
    expect(exit.code).toBeNull()
    expect(exit.signal).toBeNull()
    expect(exit.error).toBeInstanceOf(Error)
  })

  it('stop() terminates a process group that ignores SIGTERM, then SIGKILL', async () => {
    const file = await makeScript(`
      process.on('SIGTERM', () => {})
      process.stdout.write('ready')
      setInterval(() => {}, 1000)
    `)
    const runtime = new RuntimeProcess(process.execPath, [file])
    await whenReady(runtime)
    const started = Date.now()
    await runtime.stop(300)
    const exit = await runtime.exit
    expect(Date.now() - started).toBeGreaterThanOrEqual(280)
    expect(exit.signal).toBe('SIGKILL')
  })

  it('stop() with a bounded grace sends SIGTERM first for a cooperative child', async () => {
    const file = await makeScript(`
      process.on('SIGTERM', () => process.exit(0))
      process.stdout.write('ready')
      setInterval(() => {}, 1000)
    `)
    const runtime = new RuntimeProcess(process.execPath, [file])
    await whenReady(runtime)
    await runtime.stop(5_000)
    const exit = await runtime.exit
    expect(exit).toEqual({ code: 0, signal: null, error: undefined })
  })

  it('stop() is idempotent and waits for the same exit', async () => {
    const file = await makeScript(`
      process.on('SIGTERM', () => {})
      process.stdout.write('ready')
      setInterval(() => {}, 1000)
    `)
    const runtime = new RuntimeProcess(process.execPath, [file])
    await whenReady(runtime)
    const first = runtime.stop(1_000)
    const second = runtime.stop(1_000)
    await expect(first).resolves.toMatchObject({ signal: 'SIGKILL' })
    await expect(second).resolves.toMatchObject({ signal: 'SIGKILL' })
    await expect(runtime.exit).resolves.toMatchObject({ signal: 'SIGKILL' })
  })

  it('propagates the env option to the child', async () => {
    const file = await makeScript('console.log(process.env.DSH_DESKTOP_TEST_ENV); process.exit(0)')
    const stdout: string[] = []
    const runtime = new RuntimeProcess(process.execPath, [file], {
      env: { DSH_DESKTOP_TEST_ENV: 'sentinel' },
    })
    runtime.child.stdout.on('data', chunk => stdout.push(String(chunk)))
    await runtime.exit
    expect(stdout.join('')).toContain('sentinel')
  })

  it('defaults to inheriting the parent environment', async () => {
    process.env.DSH_DESKTOP_INHERITED_ENV = 'inherited-sentinel'
    const file = await makeScript('console.log(process.env.DSH_DESKTOP_INHERITED_ENV); process.exit(0)')
    const stdout: string[] = []
    const runtime = new RuntimeProcess(process.execPath, [file])
    runtime.child.stdout.on('data', chunk => stdout.push(String(chunk)))
    await runtime.exit
    expect(stdout.join('')).toContain('inherited-sentinel')
    delete process.env.DSH_DESKTOP_INHERITED_ENV
  })

  it('delegates process-group signaling to the injected killGroup', async () => {
    const kills: NodeJS.Signals[] = []
    const killGroup: KillGroup = (pid, signal) => {
      kills.push(signal)
      process.kill(-pid, signal)
    }
    const file = await makeScript(`
      process.on('SIGTERM', () => {})
      process.stdout.write('ready')
      setInterval(() => {}, 1000)
    `)
    const runtime = new RuntimeProcess(process.execPath, [file], { killGroup })
    await whenReady(runtime)
    const exit = await runtime.stop(100)
    expect(kills).toEqual(['SIGTERM', 'SIGKILL'])
    expect(exit.signal).toBe('SIGKILL')
  })

  it('surfaces child stderr through the stderr stream with a bounded tail', async () => {
    const file = await makeScript("console.error('line one'); console.error('line two'); process.exit(0)")
    const stderr: string[] = []
    const runtime = new RuntimeProcess(process.execPath, [file], { stderrTailBytes: 16 })
    runtime.child.stderr.on('data', chunk => stderr.push(String(chunk)))
    await runtime.exit
    expect(stderr.join('')).toContain('line two')
    expect(runtime.stderrTail).not.toContain('line one')
    expect(runtime.stderrTail).toContain('line two')
  })

  it('uses the injected spawn instead of a real child', async () => {
    const called: { command: string; args: readonly string[]; options: unknown }[] = []
    const exitListeners: ((code: number | null, signal: NodeJS.Signals | null) => void)[] = []
    const childLike: ChildLike = {
      pid: 123,
      stdout: { on: () => undefined },
      stderr: { on: () => undefined },
      on: (
        event: 'exit' | 'error',
        listener: ((code: number | null, signal: NodeJS.Signals | null) => void) | ((error: Error) => void),
      ) => {
        if (event === 'exit') {
          exitListeners.push(listener as (code: number | null, signal: NodeJS.Signals | null) => void)
        }
        return childLike
      },
      kill: () => true,
    }
    const killGroup: KillGroup = (_pid, signal) => {
      for (const listener of exitListeners) listener(null, signal)
    }
    const spawnLike: SpawnLike = (command, args, options) => {
      called.push({ command, args, options })
      return childLike
    }
    const runtime = new RuntimeProcess('dsh', ['web', '--port', '4000'], { spawn: spawnLike, killGroup })
    expect(called[0]?.command).toBe('dsh')
    expect(called[0]?.args).toEqual(['web', '--port', '4000'])
    expect(called[0]?.options).toMatchObject({ detached: true, stdio: ['ignore', 'pipe', 'pipe'] })
    await expect(runtime.stop(100)).resolves.toMatchObject({ code: null, signal: 'SIGTERM' })
  })
})
