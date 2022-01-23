export { parseHttpRequest }

import { parse } from '@brillout/json-s'
import { assertUsage, hasProp } from '../utils'

function parseHttpRequest(runContext: {
  httpRequest: { body: string | object }
  isProduction: boolean
}): { telefunctionName: string; telefunctionArgs: unknown[]; isMalformed: false } | { isMalformed: true } {
  const { body } = runContext.httpRequest
  const bodyString = typeof body === 'string' ? body : JSON.stringify(body)

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err_) {}

  if (!hasProp(bodyParsed, 'name', 'string') || !hasProp(bodyParsed, 'args', 'array')) {
    if (runContext.isProduction) {
      // In production, a third party can make a malformed request.
      return { isMalformed: true }
    } else {
      // If in development, then something is wrong
      assertUsage(
        false,
        '`telefunc({ body })`: argument `body` should be the body of the HTTP request. This is not the case; make sure you are properly retrieving the HTTP request body and pass it to `telefunc({ body })`. ' +
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
