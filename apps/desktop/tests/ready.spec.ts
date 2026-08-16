import { createServer } from 'node:http'
import type { ServerResponse } from 'node:http'
import { afterEach, describe, expect, it } from 'vitest'
import { waitForHttpReady } from '../src/ready.ts'
import type { FetchLike } from '../src/ready.ts'

const servers: ReturnType<typeof createServer>[] = []

afterEach(async () => {
  await Promise.all(servers.map(server => new Promise<void>(resolve => server.close(() => { resolve() }))))
  servers.length = 0
})

async function startHttpServer(handler: (response: ServerResponse) => void): Promise<string> {
  const server = createServer((_request, response) => { handler(response) })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  servers.push(server)
  const address = server.address()
  if (typeof address !== 'object' || address === null) throw new Error('server did not bind a port')
  return `http://127.0.0.1:${address.port}/`
}

describe('waitForHttpReady', () => {
  it('resolves as soon as the endpoint answers 2xx', async () => {
    const url = await startHttpServer((response) => {
      response.writeHead(200)
      response.end()
    })
    await expect(waitForHttpReady(url, { timeoutMs: 2_000, intervalMs: 20 })).resolves.toBeUndefined()
  })

  it('keeps polling through connection failures and non-2xx responses', async () => {
    let attempts = 0
    const fetchLike: FetchLike = async () => {
      attempts += 1
      if (attempts < 3) throw new Error('fetch failed: connection refused')
      if (attempts < 4) return { ok: false, status: 503 }
      return { ok: true, status: 200 }
    }
    await expect(waitForHttpReady('http://127.0.0.1:1/', { timeoutMs: 2_000, intervalMs: 10 }, fetchLike)).resolves.toBeUndefined()
    expect(attempts).toBe(4)
  })

  it('rejects with the last response status when the deadline passes', async () => {
    const fetchLike: FetchLike = async () => ({ ok: false, status: 503 })
    await expect(
      waitForHttpReady('http://127.0.0.1:1/', { timeoutMs: 100, intervalMs: 10 }, fetchLike),
    ).rejects.toThrow(/HTTP 503/)
  })

  it('rejects with the last connection error when the deadline passes', async () => {
    const fetchLike: FetchLike = async () => {
      throw new Error('fetch failed: connection refused')
    }
    await expect(
      waitForHttpReady('http://127.0.0.1:1/', { timeoutMs: 100, intervalMs: 10 }, fetchLike),
    ).rejects.toThrow(/connection refused/)
  })
})
