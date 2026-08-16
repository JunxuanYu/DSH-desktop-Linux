# `@deepseek-ai/dsh-desktop`

English | [中文](README.zh.md)

The desktop client for DeepSeek Harness: launches the `dsh web` runtime as an owned child process and hosts its GUI in one Electron window. [`src/main.ts`](src/main.ts) orchestrates the boot sequence; pure-logic modules ([`config.ts`](src/config.ts), [`ports.ts`](src/ports.ts), [`ready.ts`](src/ready.ts), [`launch.ts`](src/launch.ts)) never import Electron so the boot path is unit-testable headless.

## Run

From a repository checkout, after the runtime and web frontend are built:

```sh
pnpm --filter @deepseek-ai/dsh-desktop run build:lib:host
pnpm dsh-desktop
```

The launcher [`src/bin.ts`](src/bin.ts) spawns the installed Electron binary with the main entry and forwards arguments verbatim; SIGINT/SIGTERM relay to Electron so the runtime disposal ladder runs. Alternatively, launch Electron directly with `electron apps/desktop/lib/main.js`.

## Boot sequence

1. Resolve the [desktop configuration](#configuration) from `DSH_DESKTOP_*` environment variables.
2. Probe the preferred port; when occupied, `pickFreePort` picks an ephemeral loopback port.
3. Spawn the runtime command (`dsh web --port <p>` by default) detached on POSIX, so its whole process group can be signaled.
4. Poll the runtime's HTTP endpoint until it answers 2xx or the readiness deadline passes.
5. Open a 1280×800 `BrowserWindow` pointed at `http://127.0.0.1:<port>`.

Quitting stops the runtime exactly once: SIGTERM to the group, escalated to SIGKILL after the stop grace. A runtime that fails to start, never becomes ready, or dies mid-session surfaces an error dialog and quits. `RuntimeProcess` retains a bounded tail of the runtime's stderr for crash diagnostics.

## Configuration

| Variable | Default | Meaning |
|---|---|---|
| `DSH_DESKTOP_COMMAND` | `dsh` | Command that starts the harness web runtime. |
| `DSH_DESKTOP_ARGS` | `web` | Arguments passed before the runtime's own flags (`--port` is appended). |
| `DSH_DESKTOP_PORT` | `3080` | Preferred HTTP port; a free port replaces it when occupied. |
| `DSH_DESKTOP_READY_TIMEOUT_MS` | `30000` | How long the GUI waits for the runtime's HTTP endpoint before failing. |
| `DSH_DESKTOP_READY_INTERVAL_MS` | `250` | Polling interval between readiness probes. |
| `DSH_DESKTOP_STOP_GRACE_MS` | `5000` | How long a SIGTERM gets to stop the runtime before SIGKILL. |

Invalid values fail loud at launch instead of silently degrading the runtime launch. Deployment-varying choices are configurable; there are no hardcoded tunables.

## Development

Unit tests cover the pure-logic modules ([`tests/config.spec.ts`](tests/config.spec.ts), [`tests/ports.spec.ts`](tests/ports.spec.ts), [`tests/ready.spec.ts`](tests/ready.spec.ts), [`tests/launch.spec.ts`](tests/launch.spec.ts)); the smoke e2e ([`tests/desktop-smoke.e2e.ts`](tests/desktop-smoke.e2e.ts)) boots the real runtime from built artifacts and asserts the HTTP endpoint becomes ready. The smoke test runs under `vitest.e2e.config.ts` and requires the built `apps/cli/lib/bin.js` and `apps/web/dist/index.html`.
