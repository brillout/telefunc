export { assertHttpRequest }

import { assertUsage, checkType, hasProp, isObject } from '../utils'
import type { HttpRequest } from '../types'

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
