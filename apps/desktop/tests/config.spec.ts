import { describe, expect, it } from 'vitest'
import { resolveDesktopConfig } from '../src/config.ts'

describe('resolveDesktopConfig', () => {
  it('applies defaults for an empty environment', () => {
    expect(resolveDesktopConfig({})).toEqual({
      command: 'dsh',
      args: ['web'],
      port: 3080,
      readyTimeoutMs: 30_000,
      readyIntervalMs: 250,
      stopGraceMs: 5_000,
    })
  })

  it('overrides every field from DSH_DESKTOP_* variables', () => {
    const config = resolveDesktopConfig({
      DSH_DESKTOP_COMMAND: '/opt/dsh/bin',
      DSH_DESKTOP_ARGS: 'web --trusted-host localhost',
      DSH_DESKTOP_PORT: '4000',
      DSH_DESKTOP_READY_TIMEOUT_MS: '10000',
      DSH_DESKTOP_READY_INTERVAL_MS: '100',
      DSH_DESKTOP_STOP_GRACE_MS: '2000',
    })
    expect(config).toEqual({
      command: '/opt/dsh/bin',
      args: ['web', '--trusted-host', 'localhost'],
      port: 4000,
      readyTimeoutMs: 10_000,
      readyIntervalMs: 100,
      stopGraceMs: 2_000,
    })
  })

  it('treats an empty args string as no extra arguments', () => {
    expect(resolveDesktopConfig({ DSH_DESKTOP_ARGS: '   ' }).args).toEqual([])
  })

  it('rejects a non-integer port', () => {
    expect(() => resolveDesktopConfig({ DSH_DESKTOP_PORT: '80.5' })).toThrow(/DSH_DESKTOP_PORT/)
  })

  it('rejects a port outside the valid range', () => {
    expect(() => resolveDesktopConfig({ DSH_DESKTOP_PORT: '70000' })).toThrow(/DSH_DESKTOP_PORT/)
    expect(() => resolveDesktopConfig({ DSH_DESKTOP_PORT: '0' })).toThrow(/DSH_DESKTOP_PORT/)
  })

  it('rejects a timeout below its minimum', () => {
    expect(() => resolveDesktopConfig({ DSH_DESKTOP_READY_TIMEOUT_MS: '50' })).toThrow(/DSH_DESKTOP_READY_TIMEOUT_MS/)
  })
})
