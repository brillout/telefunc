export { handleError }

import type { ViteDevServer } from 'vite'
import { hasProp } from '../utils'

function handleError(err: unknown, callContext: { _viteDevServer: ViteDevServer | null }) {
  // We ensure we print a string; Cloudflare Workers doesn't seem to properly stringify `Error` objects.
  const errStr = (hasProp(err, 'stack') && String(err.stack)) || String(err)

  if (viteAlreadyLoggedError(err, callContext)) {
    return
  }
  viteErrorCleanup(err, callContext)

  console.error(errStr)
}

function viteAlreadyLoggedError(err: unknown, callContext: { _viteDevServer: ViteDevServer | null }) {
  if (!callContext._viteDevServer) {
    return false
  }
  return callContext._viteDevServer.config.logger.hasErrorLogged(err as Error)
}

function viteErrorCleanup(err: unknown, callContext: { _viteDevServer: ViteDevServer | null }) {
  if (!callContext._viteDevServer) {
    return false
  }
  if (hasProp(err, 'stack')) {
    // Apply source maps
    callContext._viteDevServer.ssrFixStacktrace(err as Error)
  }
}
