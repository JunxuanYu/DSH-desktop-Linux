/**
 * Electron main entry: resolves the desktop configuration, launches the dsh
 * web runtime as an owned child on a free loopback port, waits for its HTTP
 * endpoint, and hosts the GUI in one BrowserWindow. Quitting stops the runtime
 * exactly once; a runtime that fails to start, never becomes ready, or dies
 * mid-session surfaces a dialog and quits.
 * @module @deepseek-ai/dsh-desktop/main
 */

import { app, BrowserWindow, dialog } from 'electron'
import { resolveDesktopConfig } from './config.ts'
import { RuntimeProcess } from './launch.ts'
import { isPortFree, pickFreePort } from './ports.ts'
import { waitForHttpReady } from './ready.ts'

async function boot(): Promise<void> {
  let config
  try {
    config = resolveDesktopConfig(process.env)
  } catch (error) {
    dialog.showErrorBox('dsh-desktop', error instanceof Error ? error.message : String(error))
    app.exit(1)
    return
  }

  const port = await isPortFree(config.port) ? config.port : await pickFreePort()
  const runtime = new RuntimeProcess(config.command, [...config.args, '--port', String(port)])
  const state: { shuttingDown: boolean } = { shuttingDown: false }
  const failAndQuit = (title: string, message: string): void => {
    state.shuttingDown = true
    dialog.showErrorBox(title, message)
    void runtime.stop(config.stopGraceMs).then(() => { app.quit() })
  }
  void runtime.exit.then((exit) => {
    if (state.shuttingDown) return
    const detail = `${exit.error !== undefined ? exit.error.message : `code ${exit.code ?? 'unknown'}`}\n\n${runtime.stderrTail.trim()}`
    failAndQuit(exit.error !== undefined ? 'dsh-desktop could not start the runtime' : 'dsh-desktop runtime exited', detail)
  })

  try {
    await waitForHttpReady(`http://127.0.0.1:${port}`, {
      timeoutMs: config.readyTimeoutMs,
      intervalMs: config.readyIntervalMs,
    })
  } catch (error) {
    if (!state.shuttingDown) {
      failAndQuit('dsh-desktop runtime did not become ready', error instanceof Error ? error.message : String(error))
    }
    return
  }
  if (state.shuttingDown) return

  const window = new BrowserWindow({ width: 1280, height: 800, autoHideMenuBar: true })
  void window.loadURL(`http://127.0.0.1:${port}`)

  app.on('before-quit', (event) => {
    if (state.shuttingDown) return
    event.preventDefault()
    state.shuttingDown = true
    void runtime.stop(config.stopGraceMs).then(() => { app.quit() })
  })
}

void app.whenReady().then(boot)
app.on('window-all-closed', () => { app.quit() })
