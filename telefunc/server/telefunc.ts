export { telefunc }
export { telefuncConfig }

import { assertHttpRequest } from './runTelefunc/assertHttpRequest'
import { runTelefunc } from './runTelefunc'
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

  const runContext = {}

  objectAssign(runContext, {
    _httpRequest: httpRequest,
  })

  const { viteDevServer, telefuncFiles, root, isProduction, telefuncUrl, disableEtag } =
    resolveConfigDefaults(telefuncConfig)
  objectAssign(runContext, {
    _isProduction: isProduction,
    _root: root,
    _viteDevServer: viteDevServer,
    _telefuncFilesProvidedByUser: telefuncFiles,
    _disableEtag: disableEtag,
    _telefuncUrl: telefuncUrl,
  })

  assertUrl(runContext)

  return runTelefunc(runContext)
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

function assertUrl(runContext: { _httpRequest: { url: string }; _telefuncUrl: string }) {
  const urlPathname = getUrlPathname(runContext._httpRequest.url)
  assertUsage(
    urlPathname === runContext._telefuncUrl,
    `telefunc({ url }): The HTTP request \`url\` pathname \`${urlPathname}\` should be \`${runContext._telefuncUrl}\`. Make sure that \`url\` is the HTTP request URL, or change \`config.telefuncUrl\` to \`${urlPathname}\`.`,
  )
}
