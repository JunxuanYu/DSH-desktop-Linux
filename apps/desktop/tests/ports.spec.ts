import { createServer } from 'node:net'
import { afterEach, describe, expect, it } from 'vitest'
import { isPortFree, pickFreePort } from '../src/ports.ts'

const occupied: ReturnType<typeof createServer>[] = []

afterEach(async () => {
  await Promise.all(occupied.map(server => new Promise<void>(resolve => server.close(() => { resolve() }))))
  occupied.length = 0
})

async function occupyLoopback(port: number): Promise<void> {
  const server = createServer()
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, '127.0.0.1', () => { resolve() })
  })
  occupied.push(server)
}

describe('pickFreePort', () => {
  it('returns an ephemeral loopback port that is actually bindable', async () => {
    const port = await pickFreePort()
    expect(port).toBeGreaterThan(0)
    expect(port).toBeLessThanOrEqual(65_535)
    await expect(isPortFree(port)).resolves.toBe(true)
  })

  it('hands the probe result through without rebinding', async () => {
    await expect(pickFreePort(async () => ({ free: true, port: 4321 }))).resolves.toBe(4321)
  })
})

describe('isPortFree', () => {
  it('reports false for a port with a live loopback listener', async () => {
    const port = await pickFreePort()
    await occupyLoopback(port)
    await expect(isPortFree(port)).resolves.toBe(false)
  })

  it('reports true for an unused port', async () => {
    const port = await pickFreePort()
    await expect(isPortFree(port)).resolves.toBe(true)
  })

  it('reports false when the injected probe refuses the bind', async () => {
    await expect(isPortFree(3080, async () => ({ free: false, port: 3080 }))).resolves.toBe(false)
  })
})
