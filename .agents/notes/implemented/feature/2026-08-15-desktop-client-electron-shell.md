# Agent Note: Desktop client as an Electron shell over the web runtime

Status: implemented

English | [中文](2026-08-15-desktop-client-electron-shell.zh.md)

## Problem

The product had no desktop entry point: the web UI requires a browser and a manually launched `dsh web` server. A desktop client should boot the same web runtime and host its GUI in a native window without duplicating the runtime or introducing a second agent loop.

## Decision

**The desktop client is an Electron shell over the existing web profile.** `apps/desktop` (`@deepseek-ai/dsh-desktop`) spawns the runtime command (`dsh web --port <p>` by default) as an owned child process, polls its HTTP endpoint until it answers 2xx, and loads that endpoint in one 1280×800 `BrowserWindow`. There is no second runtime, no bundled Chromium UI, and no change to `agent-loop` or any capability seam.

**Pure-logic modules never import Electron.** `config.ts`, `ports.ts`, `ready.ts`, and `launch.ts` are headless-testable; `main.ts` (Electron main) and `bin.ts` (launcher) are the only Electron-touching modules. `ports.ts` probes loopback (`127.0.0.1`) because that is the authority the `dsh web` profile serves; `ready.ts` polls with an injectable `fetch`; `launch.ts` exposes injectable spawn and kill seams.

**The runtime is an owned child with group-signal disposal.** On POSIX the child spawns detached so its whole process group can be signaled; Windows falls back to `taskkill /T /F`. Quitting stops the runtime exactly once: SIGTERM to the group, escalated to SIGKILL after a configurable grace. `RuntimeProcess` retains a bounded stderr tail for crash diagnostics. Spawn failures, readiness timeouts, and mid-session deaths surface a `dialog.showErrorBox` and quit.

**All deployment-varying choices are environment configuration.** `DSH_DESKTOP_COMMAND`, `DSH_DESKTOP_ARGS`, `DSH_DESKTOP_PORT` (default 3080, with a free-port fallback), `DSH_DESKTOP_READY_TIMEOUT_MS` (default 30000), `DSH_DESKTOP_READY_INTERVAL_MS` (default 250), and `DSH_DESKTOP_STOP_GRACE_MS` (default 5000) are validated `DesktopConfig` fields; invalid values fail loud at launch.

**`ChildLike.pid` is `pid?: number | undefined`.** The `exactOptionalPropertyTypes` compiler option requires the explicit `undefined` union for an optional property assigned against `@types/node`'s `pid?: number | undefined`; neither `pid?: number` nor `pid: number | undefined` satisfies it.

**Test strategy: unit tests on the pure modules plus one real smoke e2e.** The unit suites inject fakes for `spawn`, `killGroup`, `fetch`, and `probe`; `launch.spec.ts` also runs two real-child tests that assert the SIGTERM→SIGKILL ladder end to end. The smoke e2e (`desktop-smoke.e2e.ts`, under `vitest.e2e.config.ts`) boots the built runtime from `apps/cli/lib/bin.js` and `apps/web/dist/index.html`, waits for readiness on a free port, asserts an HTML response, and stops cleanly — no Electron, no display server, no credentials.

**Signal handlers register before the readiness line in child scripts.** A pipe write is synchronous into the kernel buffer, so a parent can read `ready` before the child reaches a later handler registration; tests that must observe a signal place `process.on(SIGTERM, ...)` before `process.stdout.write('ready')`.

## Alternatives considered

**A native shell that reimplements the agent loop.** Rejected: the web profile already owns session, tools, and the loop; a second loop would duplicate behavior and drift.

**Embedding the web runtime in-process.** Rejected: the runtime is a server process with its own lifecycle; owning it as a child with group signals gives clean stop semantics and keeps the desktop package thin.

**A system tray app with auto-update and packaging.** Deferred to a later iteration; v1 is a single window with a launcher script, and the package is publishable but not yet distributable.

## Consequences

`pnpm dsh-desktop` boots the desktop client from a source checkout once `build:lib:host`, `build:lib:client`, and `build:web` have run. The client inherits the web profile's behavior — including its `node-pty` native dependency, which on linux-x64 must be compiled with `node-gyp` because the npm package ships no linux prebuild. The desktop package adds no `agent-loop` or capability-seam changes, and its README documents the configuration surface.
