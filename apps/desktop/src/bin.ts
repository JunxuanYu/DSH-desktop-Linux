#!/usr/bin/env node
/**
 * dsh-desktop launcher: runs the Electron main entry on the installed electron
 * binary. Forwarded arguments reach the Electron main process verbatim, and
 * SIGINT/SIGTERM relay to the child so the runtime disposal ladder runs.
 * @module @deepseek-ai/dsh-desktop/bin
 */

import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
// The electron package's main export is the installed binary path when loaded
// outside the runtime; its d.ts types the runtime API face used by main.ts.
const electronPath = require('electron') as string
const mainEntry = fileURLToPath(new URL('./main.js', import.meta.url))

const child = spawn(electronPath, [mainEntry, ...process.argv.slice(2)], { stdio: 'inherit' })

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => child.kill(signal))
}

child.on('exit', (code, signal) => {
  if (signal !== null) {
    process.kill(process.pid, signal)
  } else {
    process.exit(code ?? 0)
  }
})
