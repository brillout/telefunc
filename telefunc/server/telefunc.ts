export { telefunc }
export { telefuncConfig }

import { assertHttpRequest } from './callTelefunc/assertHttpRequest'
import { callTelefuncStart } from './callTelefunc/index'
import { resolveConfigDefaults, ServerConfig, validateConfigObject } from './configSpec'
import { HttpRequest } from './types'
import { assertUsage, getUrlPathname, objectAssign } from './utils'

const telefuncConfig: ServerConfig = getConfigObject()

/**
 * Get the HTTP response of a telefunction call.
 * @param httpRequest.url HTTP request URL
 * @param httpRequest.method HTTP request method
 * @param httpRequest.body HTTP request body
 * @returns HTTP response
 */
function telefunc(httpRequest: HttpRequest) {
  assertHttpRequest(httpRequest, arguments.length)

  const callContext = {}

  objectAssign(callContext, {
    _httpRequest: httpRequest,
  })

  const { viteDevServer, telefuncFiles, root, isProduction, telefuncUrl, disableEtag } =
    resolveConfigDefaults(telefuncConfig)
  objectAssign(callContext, {
    _isProduction: isProduction,
    _root: root,
    _viteDevServer: viteDevServer,
    _telefuncFilesProvidedByUser: telefuncFiles,
    _disableEtag: disableEtag,
    _telefuncUrl: telefuncUrl,
  })

  assertUrl(callContext)

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

function assertUrl(callContext: { _httpRequest: { url: string }; _telefuncUrl: string }) {
  const urlPathname = getUrlPathname(callContext._httpRequest.url)
  assertUsage(
    urlPathname === callContext._telefuncUrl,
    `telefunc({ url }): The HTTP request \`url\` pathname \`${urlPathname}\` should be \`${callContext._telefuncUrl}\`. Make sure that \`url\` is the HTTP request URL, or change \`config.telefuncUrl\` to \`${urlPathname}\`.`,
  )
}
