export { parseStringBody }

import { parse } from '@brillout/json-serializer/parse'
import { assertUsage, hasProp, getTelefunctionKey } from '../../utils.js'
import { logParseError, type ParseResult } from './utils.js'

function parseStringBody(
  body: unknown,
  runContext: {
    logMalformedRequests: boolean
    serverConfig: { telefuncUrl: string }
  },
): ParseResult {
  if (typeof body !== 'string') {
    if (runContext.logMalformedRequests) {
      assertBody(body, runContext)
    } else {
      // In production `body` can be any value really.
      // Therefore we `assertBody(body)` only development.
    }
    return { isMalformedRequest: true }
  }
  const bodyString: string = body

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err: unknown) {
    logParseError(
      [
        'The argument `body` passed to `telefunc({ body })`',
        "couldn't be parsed",
        `(\`body === '${bodyString}'\`).`,
        !hasProp(err, 'message') ? null : `Parse error: ${err.message}.`,
      ]
        .filter(Boolean)
        .join(' '),
      runContext,
    )
    return { isMalformedRequest: true }
  }

  if (
    !hasProp(bodyParsed, 'file', 'string') ||
    !hasProp(bodyParsed, 'name', 'string') ||
    !hasProp(bodyParsed, 'args', 'array')
  ) {
    logParseError(
      [
        'The argument `body` passed to `telefunc({ body })`',
        'can be parsed but its content is unexpected',
        `(\`body === '${bodyString}'\`).`,
      ].join(' '),
      runContext,
    )
    return { isMalformedRequest: true }
  }

  const telefuncFilePath = bodyParsed.file
  const telefunctionName = bodyParsed.name
  const telefunctionArgs = bodyParsed.args
  const telefunctionKey = getTelefunctionKey(telefuncFilePath, telefunctionName)

  return {
    telefuncFilePath,
    telefunctionName,
    telefunctionKey,
    telefunctionArgs,
    isMalformedRequest: false,
  }
}

function assertBody(body: unknown, runContext: { serverConfig: { telefuncUrl: string } }) {
  const errorNote = [
    `Make sure that \`body\` is the HTTP body string of the request HTTP POST \`Content-Type: text/plain\` \`${runContext.serverConfig.telefuncUrl}\`.`,
    'Note that with some server frameworks, such as Express.js, a server middleware is needed to process the HTTP body of `Content-Type: text/plain` requests.',
  ].join(' ')
  assertUsage(
    body !== undefined && body !== null,
    ['`telefunc({ body })`: argument `body` should be a string but', `\`body === ${body}\`.`, errorNote].join(' '),
  )
  assertUsage(
    typeof body === 'string',
    [
      '`telefunc({ body })`: argument `body` should be a string but',
      `\`typeof body === '${typeof body}'\`.`,
      errorNote,
    ].join(' '),
  )
  assertUsage(
    // Express.js sets `req.body === '{}'` upon wrong Content-Type
    body !== '{}',
    ["`telefunc({ body })`: argument `body` is an empty JSON object (`body === '{}'`).", errorNote].join(' '),
  )
}
