/**
 * HTTP readiness polling: resolve once the runtime's endpoint answers 2xx,
 * reject when the deadline passes. Connection failures and non-2xx responses
 * both mean "not ready yet" and keep polling.
 * @module @deepseek-ai/dsh-desktop/ready
 */

export interface ReadyOptions {
  timeoutMs: number
  intervalMs: number
}

/** The `fetch` surface the poller needs, injectable for tests. */
export interface FetchLike {
  (url: string, init?: { signal?: AbortSignal }): Promise<{ ok: boolean; status: number }>
}

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

/** Poll `url` until it answers 2xx or `timeoutMs` elapses. */
export async function waitForHttpReady(url: string, options: ReadyOptions, fetchLike: FetchLike = fetch): Promise<void> {
  const deadline = Date.now() + options.timeoutMs
  let lastDetail = 'no probe completed'
  while (Date.now() < deadline) {
    try {
      const response = await fetchLike(url, { signal: AbortSignal.timeout(options.intervalMs) })
      if (response.ok) return
      lastDetail = `HTTP ${response.status}`
    } catch (error) {
      lastDetail = error instanceof Error ? error.message : String(error)
    }
    await sleep(options.intervalMs)
  }
  throw new Error(`runtime did not become ready at ${url} within ${options.timeoutMs} ms (${lastDetail})`)
}
