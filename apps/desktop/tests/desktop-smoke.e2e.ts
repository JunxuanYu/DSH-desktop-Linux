import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { RuntimeProcess } from '../src/launch.ts'
import { pickFreePort } from '../src/ports.ts'
import { waitForHttpReady } from '../src/ready.ts'

/** The desktop client booting the real built web runtime end to end, without Electron. */
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url))
const dshBin = join(repoRoot, 'apps/cli/lib/bin.js')
const webIndex = join(repoRoot, 'apps/web/dist/index.html')

function childEnv(home: string): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries({ ...process.env, DSH_HOME: home, DSH_TELEMETRY_DISABLED: '1' })
      .filter((entry): entry is [string, string] => entry[1] !== undefined),
  )
}

describe.skipIf(!existsSync(dshBin) || !existsSync(webIndex))('dsh-desktop web-runtime smoke', () => {
  it('launches the built web runtime on a free port, serves HTTP, and stops cleanly', async () => {
    const home = mkdtempSync(join(tmpdir(), 'dsh-desktop-smoke-'))
    const port = await pickFreePort()
    const runtime = new RuntimeProcess(process.execPath, [dshBin, 'web', '--port', String(port)], {
      env: childEnv(home),
    })
    try {
      await waitForHttpReady(`http://127.0.0.1:${port}`, { timeoutMs: 60_000, intervalMs: 250 })
      const response = await fetch(`http://127.0.0.1:${port}/`)
      expect(response.ok, runtime.stderrTail).toBe(true)
      expect(await response.text()).toContain('<!doctype html')
      const exit = await runtime.stop(5_000)
      expect(exit).toMatchObject({ code: 0, signal: null })
    } finally {
      await runtime.stop(1_000).catch(() => {})
      rmSync(home, { recursive: true, force: true })
    }
  }, 90_000)
})
