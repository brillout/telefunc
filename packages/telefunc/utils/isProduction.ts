export { isProduction }
export { getNodeEnv }

import { assertIsNotBrowser } from './assertIsNotBrowser.js'
assertIsNotBrowser()

function isProduction(): boolean {
  if (globalThis.__TELEFUNC__IS_NON_RUNNABLE_DEV) return false
  // If the server environment isn't a Node.js server, then we assume an Edge environment (e.g. Cloudflare Workers)
  if (isNotNode()) return true
  const val = getNodeEnv()
  if (val === undefined || val === 'development' || val === '') return false
  // We consider production if `val` is 'production', 'staging', 'test', etc.
  return true
}

// Caching calls to process.env because it's expensive
let nodeEnv: undefined | { value: ReturnType<typeof getNodeEnv> }
function getNodeEnv(): null | undefined | string {
  if (!nodeEnv) {
    if (isNotNode()) {
      nodeEnv = { value: null }
    } else {
      nodeEnv = { value: process.env.NODE_ENV }
    }
  }
  return nodeEnv.value
}
let isNotNode_: undefined | { value: ReturnType<typeof isNotNode> }
function isNotNode(): boolean {
  if (!isNotNode_) {
    isNotNode_ = {
      value: typeof process == 'undefined' || !('env' in process),
    }
  }
  return isNotNode_.value
}
