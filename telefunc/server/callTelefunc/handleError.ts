export { handleError }

import type { ViteDevServer } from 'vite'
import { hasProp } from '../utils'

function handleError(err: unknown, callContext: { _isProduction: boolean; _viteDevServer: ViteDevServer | null }) {
  // We ensure we print a string; Cloudflare Workers doesn't seem to properly stringify `Error` objects.
  const errStr = (hasProp(err, 'stack') && String(err.stack)) || String(err)
  if (!callContext._isProduction && callContext._viteDevServer) {
    // TODO: check if Vite already logged the error
  }

  if (viteAlreadyLoggedError(err, callContext)) {
    return
  }
  viteErrorCleanup(err, callContext._viteDevServer)

  console.error(errStr)
}

function viteAlreadyLoggedError(
  err: unknown,
  callContext: { _isProduction: boolean; _viteDevServer: ViteDevServer | null },
) {
  if (callContext._isProduction) {
    return false
  }
  if (callContext._viteDevServer && callContext._viteDevServer.config.logger.hasErrorLogged(err as Error)) {
    return true
  }
  return false
}

function viteErrorCleanup(err: unknown, viteDevServer: ViteDevServer | null) {
  if (viteDevServer) {
    if (hasProp(err, 'stack')) {
      // Apply source maps
      viteDevServer.ssrFixStacktrace(err as Error)
    }
  }
}
