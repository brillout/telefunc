export { telefunc }

import { runTelefunc, HttpResponse } from './runTelefunc'
import { assertUsage, hasProp, isObject } from '../utils'

/** Get HTTP Response for a telefunction remote call HTTP Request.
 * @returns HTTP Response
 */
async function telefunc(httpRequest: {
  /** The URL of the HTTP Request */
  url: string
  /** The method of the HTTP Request ('GET', 'POST', ...) */
  method: string
  /** The body of HTTP Request */
  body: string
  /** The context object, see https://telefunc.com/getContext  */
  context?: Telefunc.Context
}): Promise<HttpResponse> {
  assertHttpRequest(httpRequest, arguments.length)
  const httpResponse = await runTelefunc(httpRequest)
  return httpResponse
}

function assertHttpRequest(httpRequest: unknown, numberOfArguments: number) {
  assertUsage(numberOfArguments === 1, '`telefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(httpRequest, '`telefunc(httpRequest)`: argument `httpRequest` is missing.')
  assertUsage(isObject(httpRequest), '`telefunc(httpRequest)`: argument `httpRequest` should be an object.')
  assertUsage(hasProp(httpRequest, 'url'), '`telefunc({ url })`: argument `url` is missing.')
  assertUsage(hasProp(httpRequest, 'url', 'string'), '`telefunc({ url })`: argument `url` should be a string.')
  assertUsage(hasProp(httpRequest, 'method'), '`telefunc({ method })`: argument `method` is missing.')
  assertUsage(hasProp(httpRequest, 'method', 'string'), '`telefunc({ method })`: argument `method` should be a string.')
  assertUsage(hasProp(httpRequest, 'body'), '`telefunc({ body })`: argument `body` is missing.')
  assertUsage(
    !('context' in httpRequest) || hasProp(httpRequest, 'context', 'object'),
    '`telefunc({ context })`: argument `context` should be an object.'
  )
  Object.keys(httpRequest).forEach((key) => {
    assertUsage(
      ['url', 'method', 'body', 'context'].includes(key),
      '`telefunc({ ' + key + ' })`: Unknown argument `' + key + '`.'
    )
  })
  // We further assert the `httpRequest` in `./runTelefunc/parseHttpRequest.ts`
}
