export { isProduction, getNodeEnv }

function isProduction(): boolean {
  // If the server environment isn't a Node.js server, then we assume an Edge environment (e.g. Cloudflare Workers)
  if (isNotNode()) return true
  const val = getNodeEnv()
  if (val === undefined || val === 'development' || val === '') return false
  // We consider production if `val` is 'production', 'staging', 'test', etc.
  return true
}

// caching calls to process.env because it's expensive
let _nodeEnv: null | undefined | string
function getNodeEnv(): null | undefined | string {
  if (_nodeEnv === undefined) {
    if (isNotNode()) return null
    _nodeEnv = process.env.NODE_ENV
  }
  return _nodeEnv
}

let _isNotNode: undefined | boolean
function isNotNode() {
  if (_isNotNode === undefined) {
    _isNotNode = typeof process == 'undefined' || !('env' in process)
  }
  return _isNotNode
}
