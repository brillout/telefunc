export { parseHttpRequest }

import { parse } from '@brillout/json-s'
import { HttpRequest } from '../types'
import { assertUsage, hasProp } from '../utils'

function parseHttpRequest(runContext: {
  _httpRequest: HttpRequest
  _isProduction: boolean
}): { telefunctionName: string; telefunctionArgs: unknown[]; isMalformed: false } | { isMalformed: true } {
  const { url, body } = runContext._httpRequest
  const bodyString = typeof body === 'string' ? body : JSON.stringify(body)

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err_) {}

  if (!hasProp(bodyParsed, 'name', 'string') || !hasProp(bodyParsed, 'args', 'array')) {
    if (runContext._isProduction) {
      return { isMalformed: true }
    } else {
      assertUsage(
        false,
        '`telefunc({ body })`: The `body` you provided to `telefunc()` should be the body of the HTTP request `' +
          url +
          '`. This is not the case; make sure you are properly retrieving the HTTP request body and pass it to `telefunc({ body })`. ' +
          '(Parsed `body`: `' +
          JSON.stringify(bodyParsed) +
          '`.)',
      )
    }
  }

  const telefunctionName = bodyParsed.name
  const telefunctionArgs = bodyParsed.args

  return {
    telefunctionName,
    telefunctionArgs,
    isMalformed: false,
  }
}
