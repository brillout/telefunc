export { handleError }

import type { ViteDevServer } from 'vite'
import { hasProp } from '../utils'

function handleError(err: unknown, runContext: { _viteDevServer: ViteDevServer | null }) {
  // We ensure we print a string; Cloudflare Workers doesn't seem to properly stringify `Error` objects.
  const errStr = (hasProp(err, 'stack') && String(err.stack)) || String(err)

  if (viteAlreadyLoggedError(err, runContext)) {
    return
  }
  viteErrorCleanup(err, runContext)

  console.error(errStr)
}

function viteAlreadyLoggedError(err: unknown, runContext: { _viteDevServer: ViteDevServer | null }) {
  if (!runContext._viteDevServer) {
    return false
  }
  return runContext._viteDevServer.config.logger.hasErrorLogged(err as Error)
}

function viteErrorCleanup(err: unknown, runContext: { _viteDevServer: ViteDevServer | null }) {
  if (!runContext._viteDevServer) {
    return false
  }
  if (hasProp(err, 'stack')) {
    // Apply source maps
    runContext._viteDevServer.ssrFixStacktrace(err as Error)
  }
}
