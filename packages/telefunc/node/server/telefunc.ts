export { telefunc }

import { runTelefunc, HttpResponse } from './runTelefunc.js'
import { Telefunc } from './getContext.js'
import { assertUsage, hasProp, isObject } from './utils.js'

type TelefuncHttpRequest =
  | {
      /** The URL of the HTTP Request */
      url: string
      /** The method of the HTTP Request ('GET', 'POST', ...) */
      method: string
      /** The body of HTTP Request. */
      body: string
      /** The context object, see https://telefunc.com/getContext  */
      context?: Telefunc.Context
    }
  | {
      /** A standard Web Request object. Telefunc extracts url, method, and body from it. */
      request: Request
      /** The context object, see https://telefunc.com/getContext  */
      context?: Telefunc.Context
    }

/** Get HTTP Response for a telefunction remote call HTTP Request.
 * @returns HTTP Response
 */
async function telefunc(httpRequest: TelefuncHttpRequest): Promise<HttpResponse> {
  assertHttpRequest(httpRequest, arguments.length)
  const resolved = await resolveHttpRequest(httpRequest)
  const httpResponse = await runTelefunc(resolved)
  return httpResponse
}

async function resolveHttpRequest(
  httpRequest: TelefuncHttpRequest,
): Promise<{ request: Request; context?: Telefunc.Context }> {
  if ('request' in httpRequest) {
    return { request: httpRequest.request, context: httpRequest.context }
  }
  // Backward compat: construct a Request from primitives
  const request = new Request('http://localhost' + httpRequest.url, {
    method: httpRequest.method,
    body: httpRequest.body,
    headers: { 'content-type': 'text/plain' },
  })
  return { request, context: httpRequest.context }
}

function assertHttpRequest(httpRequest: unknown, numberOfArguments: number) {
  assertUsage(numberOfArguments === 1, '`telefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(httpRequest, '`telefunc(httpRequest)`: argument `httpRequest` is missing.')
  assertUsage(isObject(httpRequest), '`telefunc(httpRequest)`: argument `httpRequest` should be an object.')
  const hasRequest = hasProp(httpRequest, 'request')
  if (hasRequest) {
    assertUsage(
      httpRequest.request instanceof Request,
      '`telefunc({ request })`: argument `request` should be a Web Request object.',
    )
  } else {
    assertUsage(hasProp(httpRequest, 'url'), '`telefunc({ url })`: argument `url` is missing.')
    assertUsage(hasProp(httpRequest, 'url', 'string'), '`telefunc({ url })`: argument `url` should be a string.')
    assertUsage(hasProp(httpRequest, 'method'), '`telefunc({ method })`: argument `method` is missing.')
    assertUsage(
      hasProp(httpRequest, 'method', 'string'),
      '`telefunc({ method })`: argument `method` should be a string.',
    )
    assertUsage(hasProp(httpRequest, 'body'), '`telefunc({ body })`: argument `body` is missing.')
  }
  assertUsage(
    !('context' in httpRequest) || hasProp(httpRequest, 'context', 'object'),
    '`telefunc({ context })`: argument `context` should be an object.',
  )
  const allowedKeys = hasRequest ? ['request', 'context'] : ['url', 'method', 'body', 'context']
  Object.keys(httpRequest).forEach((key) => {
    assertUsage(allowedKeys.includes(key), '`telefunc({ ' + key + ' })`: Unknown argument `' + key + '`.')
  })
  // We further assert the `httpRequest` in `./runTelefunc/parseHttpRequest.ts`
}
