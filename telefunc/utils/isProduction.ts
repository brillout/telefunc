export { isProduction, getNodeEnv }

function isProduction(): boolean {
  // If the server environment isn't a Node.js server, then we assume an Edge environment (e.g. Cloudflare Workers)
  if (isNotNode()) return true
  const val = getNodeEnv()
  if (val === undefined || val === 'development' || val === '') return false
  // We consider production if `val` is 'production', 'staging', 'test', etc.
  return true
}

// Caching calls to process.env because it's expensive
let nodeEnv: undefined | { value: null | undefined | string }
function getNodeEnv(): null | undefined | string {
  if (nodeEnv === undefined) {
    if (isNotNode()) {
      nodeEnv = { value: null }
    } else {
      nodeEnv = { value: process.env.NODE_ENV }
    }
  }
  return nodeEnv.value
}
let isNotNode_: undefined | boolean
function isNotNode(): boolean {
  if (isNotNode_ === undefined) {
    isNotNode_ = typeof process == 'undefined' || !('env' in process)
  }
  return isNotNode_
}
