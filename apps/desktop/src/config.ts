/**
 * Desktop client configuration, resolved from `DSH_DESKTOP_*` environment
 * variables at launch. Every field has a default; invalid values fail loud
 * instead of silently degrading the runtime launch.
 * @module @deepseek-ai/dsh-desktop/config
 */

export interface DesktopConfig {
  /** Command that starts the harness web runtime; `dsh web` by default. */
  command: string
  /** Arguments passed before the runtime's own flags (`--port` is appended). */
  args: readonly string[]
  /** Preferred HTTP port for the web runtime; a free port replaces it when occupied. */
  port: number
  /** How long the GUI waits for the runtime's HTTP endpoint before failing. */
  readyTimeoutMs: number
  /** Polling interval between readiness probes. */
  readyIntervalMs: number
  /** How long a SIGTERM gets to stop the runtime before SIGKILL. */
  stopGraceMs: number
}

function readNumber(env: NodeJS.ProcessEnv, key: string, fallback: number, min: number, max: number): number {
  const raw = env[key]
  if (raw === undefined || raw === '') return fallback
  const value = Number(raw)
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${key} must be an integer in [${min}, ${max}], got ${JSON.stringify(raw)}`)
  }
  return value
}

/** Resolve the launch configuration from process environment values. */
export function resolveDesktopConfig(env: NodeJS.ProcessEnv = process.env): DesktopConfig {
  return {
    command: env.DSH_DESKTOP_COMMAND ?? 'dsh',
    args: (env.DSH_DESKTOP_ARGS ?? 'web').split(/\s+/).filter(arg => arg !== ''),
    port: readNumber(env, 'DSH_DESKTOP_PORT', 3080, 1, 65_535),
    readyTimeoutMs: readNumber(env, 'DSH_DESKTOP_READY_TIMEOUT_MS', 30_000, 100, 300_000),
    readyIntervalMs: readNumber(env, 'DSH_DESKTOP_READY_INTERVAL_MS', 250, 10, 10_000),
    stopGraceMs: readNumber(env, 'DSH_DESKTOP_STOP_GRACE_MS', 5_000, 50, 60_000),
  }
}
