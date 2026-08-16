/**
 * Owned harness-runtime child process: spawns the web runtime detached on
 * POSIX so its whole process group can be signaled, and exposes a bounded
 * SIGTERM → SIGKILL disposal ladder. The spawn and kill seams are injectable
 * so unit tests never touch real processes except where they assert the
 * ladder end to end.
 * @module @deepseek-ai/dsh-desktop/launch
 */

import { spawn, spawnSync } from 'node:child_process'

/** The stdout/stderr surface the process tails; broader than what tests fake. */
interface StreamLike {
  on(event: 'data', listener: (chunk: Buffer | string) => void): unknown
}

export interface ChildLike {
  pid?: number | undefined
  stdout: StreamLike
  stderr: StreamLike
  on(event: 'exit', listener: (code: number | null, signal: NodeJS.Signals | null) => void): unknown
  on(event: 'error', listener: (error: Error) => void): unknown
  kill(signal?: NodeJS.Signals): boolean
}

interface SpawnOptions {
  detached: boolean
  stdio: readonly ('ignore' | 'pipe')[]
  env?: NodeJS.ProcessEnv
}

/** Spawn a runtime child; injectable so unit tests never spawn a real process. */
export type SpawnLike = (command: string, args: readonly string[], options: SpawnOptions) => ChildLike

/** One outcome of the child's lifetime; `error` is set when the spawn itself failed. */
export interface ExitInfo {
  code: number | null
  signal: NodeJS.Signals | null
  error: Error | undefined
}

/** Signal a process group by id; rejects silently when the group is already gone. */
export type KillGroup = (pid: number, signal: NodeJS.Signals) => void

export interface RuntimeProcessOptions {
  spawn?: SpawnLike
  killGroup?: KillGroup
  platform?: NodeJS.Platform
  /** Bounded stderr retention for crash diagnostics, in bytes. */
  stderrTailBytes?: number
  /** Child environment; defaults to the parent's environment. */
  env?: NodeJS.ProcessEnv
}

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

const defaultKillGroup: KillGroup = (pid, signal) => {
  try {
    process.kill(-pid, signal)
  } catch {
    // The group already exited between the liveness check and the signal.
  }
}

const defaultSpawn: SpawnLike = (command, args, options) => spawn(command, args, {
  detached: options.detached,
  stdio: ['ignore', 'pipe', 'pipe'],
  ...(options.env === undefined ? {} : { env: options.env }),
})

/** The harness runtime as a child process with group-signal disposal. */
export class RuntimeProcess {
  /** The spawned child; exposed for tests that read its streams. */
  readonly child: ChildLike
  private readonly killGroup: KillGroup
  private readonly platform: NodeJS.Platform
  private readonly stderrTailBytes: number
  private readonly stderrChunks: string[] = []
  private settled: ExitInfo | undefined
  private stopping = false
  readonly exit: Promise<ExitInfo>

  constructor(command: string, args: readonly string[], options: RuntimeProcessOptions = {}) {
    this.platform = options.platform ?? process.platform
    this.killGroup = options.killGroup ?? defaultKillGroup
    this.stderrTailBytes = options.stderrTailBytes ?? 8 * 1024
    this.child = (options.spawn ?? defaultSpawn)(command, args, {
      detached: this.platform !== 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
      ...(options.env === undefined ? {} : { env: options.env }),
    })
    this.child.stderr.on('data', (chunk: Buffer | string) => {
      const text = typeof chunk === 'string' ? chunk : chunk.toString('utf8')
      this.stderrChunks.push(text)
      let joined = this.stderrChunks.join('')
      if (joined.length > this.stderrTailBytes) {
        joined = joined.slice(joined.length - this.stderrTailBytes)
        this.stderrChunks.length = 0
        this.stderrChunks.push(joined)
      }
    })
    this.exit = new Promise<ExitInfo>((resolve) => {
      const settle = (info: ExitInfo): void => {
        if (this.settled === undefined) {
          this.settled = info
          resolve(info)
        }
      }
      this.child.on('exit', (code, signal) => { settle({ code, signal, error: undefined }) })
      this.child.on('error', (error) => { settle({ code: null, signal: null, error }) })
    })
  }

  /** The child's process id; undefined when the spawn never started. */
  get pid(): number | undefined {
    return this.child.pid
  }

  /** The retained tail of the runtime's stderr, for crash diagnostics. */
  get stderrTail(): string {
    return this.stderrChunks.join('')
  }

  /** Whether the child has already exited (or never started). */
  get exited(): boolean {
    return this.settled !== undefined
  }

  private runningPid(): number | undefined {
    return this.exited ? undefined : this.child.pid
  }

  /** Send one signal to the runtime's whole process group (POSIX) or the child (Windows). */
  signal(signal: NodeJS.Signals): void {
    if (this.exited || this.child.pid === undefined) return
    if (this.platform === 'win32') {
      this.child.kill(signal)
    } else {
      this.killGroup(this.child.pid, signal)
    }
  }

  /**
   * Stop the runtime: SIGTERM to the group, escalate to SIGKILL after
   * `graceMs`, and wait for the exit to settle.
   */
  async stop(graceMs: number): Promise<ExitInfo> {
    if (this.stopping) return this.exit
    this.stopping = true
    if (!this.exited) {
      this.signal('SIGTERM')
      const softExit = await this.raceExit(graceMs)
      const pid = this.runningPid()
      if (softExit === undefined && pid !== undefined) {
        if (this.platform === 'win32') {
          spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' })
        } else {
          this.killGroup(pid, 'SIGKILL')
        }
      }
    }
    const finalExit = await this.raceExit(5_000)
    return finalExit ?? { code: null, signal: null, error: new Error('runtime did not exit after SIGKILL') }
  }

  private async raceExit(timeoutMs: number): Promise<ExitInfo | undefined> {
    return Promise.race([this.exit, sleep(timeoutMs).then(() => undefined)])
  }
}
