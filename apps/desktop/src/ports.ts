/**
 * Loopback port probing for the web runtime. Probing binds `127.0.0.1`, the
 * same authority the `dsh web` profile serves, so an occupied loopback or
 * wildcard listener reports busy.
 * @module @deepseek-ai/dsh-desktop/ports
 */

import { createServer } from 'node:net'

interface ProbeResult {
  free: boolean
  port: number
}

/** One bind attempt: whether the port was free and which port the kernel bound. */
export type Probe = (port: number) => Promise<ProbeResult>

const defaultProbe: Probe = (port: number): Promise<ProbeResult> => new Promise((resolve) => {
  const server = createServer()
  const settled = (free: boolean, port: number): void => {
    server.close(() => { resolve({ free, port }) })
  }
  server.on('error', () => { settled(false, port) })
  server.listen(port, '127.0.0.1', () => {
    const address = server.address()
    const bound = typeof address === 'object' && address !== null ? address.port : port
    settled(true, bound)
  })
})

/** Whether nothing else listens on the given loopback port. */
export async function isPortFree(port: number, probe: Probe = defaultProbe): Promise<boolean> {
  return (await probe(port)).free
}

/** An ephemeral loopback port the kernel assigned, released before the caller binds it. */
export async function pickFreePort(probe: Probe = defaultProbe): Promise<number> {
  return (await probe(0)).port
}
