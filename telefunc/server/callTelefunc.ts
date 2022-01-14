export { callTelefunc }
export { config }

import { callTelefuncStart } from './callTelefunc/index'
import { resolveConfigDefaults, ServerConfig, validateConfigObject } from './configSpec'
import { HttpRequest } from './types'
import { assertUsage, checkType, hasProp, isObject, objectAssign } from './utils'

const config: ServerConfig = getConfigObject()

/**
 * Get the HTTP response of a telefunction call.
 * @param httpRequest.url HTTP request URL
 * @param httpRequest.method HTTP request method
 * @param httpRequest.body HTTP request body
 * @returns HTTP response
 */
function callTelefunc(httpRequest: HttpRequest) {
  assertHttpRequest(httpRequest, arguments.length)

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

function assertHttpRequest(httpRequest: unknown, numberOfArguments: number) {
  assertUsage(httpRequest, '`callTelefunc(httpRequest)`: argument `httpRequest` is missing.')
  assertUsage(numberOfArguments === 1, '`callTelefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(isObject(httpRequest), '`callTelefunc(httpRequest)`: argument `httpRequest` should be an object.')
  assertUsage(hasProp(httpRequest, 'url'), '`callTelefunc({ url })`: argument `url` is missing.')
  assertUsage(hasProp(httpRequest, 'url', 'string'), '`callTelefunc({ url })`: argument `url` should be a string.')
  assertUsage(hasProp(httpRequest, 'method'), '`callTelefunc({ method })`: argument `method` is missing.')
  assertUsage(
    hasProp(httpRequest, 'method', 'string'),
    '`callTelefunc({ method })`: argument `method` should be a string.',
  )
  assertUsage('body' in httpRequest, '`callTelefunc({ body })`: argument `body` is missing.')
  const { body } = httpRequest
  assertUsage(
    body !== undefined && body !== null,
    '`callTelefunc({ body })`: argument `body` should be a string or an object but `body === ' +
      body +
      '`. Note that with some server frameworks, such as Express.js and Koa, you need to use a server middleware that parses the body.',
  )
  assertUsage(
    typeof body === 'string' || isObject(body),
    "`callTelefunc({ body })`: argument `body` should be a string or an object but `typeof body === '" +
      typeof body +
      "'`",
  )
  checkType<HttpRequest['body']>(body)
  checkType<Omit<HttpRequest, 'body'>>(httpRequest)
}
