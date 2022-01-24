export { assertHttpRequest }

import { assertUsage, checkType, hasProp, isObject } from '../../utils'
import type { HttpRequest } from '../types'

function assertHttpRequest(httpRequest: unknown, numberOfArguments: number) {
  assertUsage(httpRequest, '`telefunc(httpRequest)`: argument `httpRequest` is missing.')
  assertUsage(numberOfArguments === 1, '`telefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(isObject(httpRequest), '`telefunc(httpRequest)`: argument `httpRequest` should be an object.')
  assertUsage(hasProp(httpRequest, 'url'), '`telefunc({ url })`: argument `url` is missing.')
  assertUsage(hasProp(httpRequest, 'url', 'string'), '`telefunc({ url })`: argument `url` should be a string.')
  assertUsage(hasProp(httpRequest, 'method'), '`telefunc({ method })`: argument `method` is missing.')
  assertUsage(hasProp(httpRequest, 'method', 'string'), '`telefunc({ method })`: argument `method` should be a string.')
  assertUsage('body' in httpRequest, '`telefunc({ body })`: argument `body` is missing.')
  const { body } = httpRequest
  assertUsage(
    body !== undefined && body !== null,
    '`telefunc({ body })`: argument `body` should be a string or an object but `body === ' +
      body +
      '`. Note that with some server frameworks, such as Express.js, you need to use a server middleware that parses the body.',
  )
  assertUsage(
    typeof body === 'string' || isObject(body),
    "`telefunc({ body })`: argument `body` should be a string or an object but `typeof body === '" + typeof body + "'`",
  )
  checkType<HttpRequest['body']>(body)
  checkType<Omit<HttpRequest, 'body'>>(httpRequest)
}
