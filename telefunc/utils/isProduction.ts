export { isProduction, getNodeEnv }

function isProduction(): boolean {
  // If the server environment isn't a Node.js server, then we assume an Edge environment (e.g. Cloudflare Workers)
  if (isNotNode()) return true
  const val = getNodeEnv()
  if (val === undefined || val === 'development' || val === '') return false
  // We consider production if `val` is 'production', 'staging', 'test', etc.
  return true
}
function getNodeEnv(): null | undefined | string {
  if (isNotNode()) return null
  return process.env.NODE_ENV
}
function isNotNode() {
  return typeof process == 'undefined' || !('env' in process)
}
