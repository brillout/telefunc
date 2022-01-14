export { callTelefunc }
export { config }

import { callTelefuncStart } from './callTelefunc/index'
import { resolveConfigDefaults, ServerConfig, validateConfigObject } from './configSpec'
import { HttpRequest } from './types'
import { objectAssign } from './utils'

const config: ServerConfig = getConfigObject()

/**
 * Get the HTTP response of a telefunction call.
 * @param httpRequest.url HTTP request URL
 * @param httpRequest.method HTTP request method
 * @param httpRequest.body HTTP request body
 * @param context The context object
 * @returns HTTP response
 */
function callTelefunc(httpRequest: HttpRequest) {
  const callContext = {}

  objectAssign(callContext, {
    _httpRequest: httpRequest,
  })

  const { viteDevServer, telefuncFiles, root, isProduction, telefuncUrl, disableEtag } = resolveConfigDefaults(config)
  objectAssign(callContext, {
    _isProduction: isProduction,
    _root: root,
    _viteDevServer: viteDevServer,
    _telefuncFilesProvidedByUser: telefuncFiles,
    _disableEtag: disableEtag,
    _telefuncUrl: telefuncUrl,
  })

  return callTelefuncStart(callContext)
}

function getConfigObject() {
  const config: Record<string, unknown> = {}
  return new Proxy(config, { set })
  function set(_: never, prop: string, val: unknown) {
    config[prop] = val
    validateConfigObject(config)
    return true
  }
}
