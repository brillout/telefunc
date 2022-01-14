import { parse } from '@brillout/json-s'
import { HttpRequest } from '../types'
import { assertUsage, isObject, hasProp } from '../utils'

export { parseHttpRequest }

function parseHttpRequest(callContext: { _httpRequest: HttpRequest }) {
  const { url, body } = callContext._httpRequest
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
      "'`. (Server frameworks, such as Express.js, provide the body as object if the HTTP request body is already JSON-parsed, or as string if not.)",
  )
  const bodyString = typeof body === 'string' ? body : JSON.stringify(body)

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err_) {}
  assertUsage(
    hasProp(bodyParsed, 'name', 'string') && hasProp(bodyParsed, 'args', 'array'),
    '`callTelefunc({ body })`: The `body` you provided to `callTelefunc()` should be the body of the HTTP request `' +
      url +
      '`. This is not the case; make sure you are properly retrieving the HTTP request body and pass it to `callTelefunc({ body })`. ' +
      '(Parsed `body`: `' +
      JSON.stringify(bodyParsed) +
      '`.)',
  )

  const telefunctionName = bodyParsed.name
  const telefunctionArgs = bodyParsed.args

  return {
    telefunctionName,
    telefunctionArgs,
  }
}
