export { parseHttpRequest }

import { parse } from '@brillout/json-s/parse'
import { getTelefunctionKey } from './getTelefunctionKey'
import { assertUsage, hasProp, getPluginError, getUrlPathname, assert } from '../../utils'
import { getTelefunctionName } from './getTelefunctionName'

function parseHttpRequest(runContext: {
  httpRequest: { body: unknown; url: string; method: string }
  isProduction: boolean
  telefuncUrl: string
}):
  | {
      telefunctionFilePath: string
      telefunctionFileExport: string
      telefunctionName: string
      telefunctionKey: string
      telefunctionArgs: unknown[]
      isMalformed: false
    }
  | { isMalformed: true } {
  assertUrl(runContext)

  if (isWrongMethod(runContext)) {
    return { isMalformed: true }
  }

  const { body } = runContext.httpRequest
  if (typeof body !== 'string') {
    if (!runContext.isProduction) {
      assertBody(body, runContext)
    } else {
      // In production `body` can be any value really.
      // Therefore we `assertBody(body)` only development.
    }
    return { isMalformed: true }
  }
  const bodyString: string = body

  let bodyParsed: unknown
  try {
    bodyParsed = parse(bodyString)
  } catch (err: unknown) {
    logParseError(
      [
        errMsgPrefix,
        'The argument `body` passed to `telefunc({ body })`',
        'could not be parsed',
        `(\`body === '${bodyString}'\`).`,
        !hasProp(err, 'message') ? null : `Parse error: ${err.message}.`,
        errMsgSuffix,
      ]
        .filter(Boolean)
        .join(' '),
      runContext,
    )
    return { isMalformed: true }
  }

  if (
    !hasProp(bodyParsed, 'file', 'string') ||
    !hasProp(bodyParsed, 'name', 'string') ||
    !hasProp(bodyParsed, 'args', 'array')
  ) {
    logParseError(
      [
        errMsgPrefix,
        'The argument `body` passed to `telefunc({ body })`',
        'can be parsed but its content is invalid',
        `(\`body === '${bodyString}'\`).`,
        errMsgSuffix,
      ].join(' '),
      runContext,
    )
    return { isMalformed: true }
  }

  const telefunctionFilePath = bodyParsed.file
  const telefunctionFileExport = bodyParsed.name
  const telefunctionArgs = bodyParsed.args
  const telefunctionKey = getTelefunctionKey({ telefunctionFilePath, telefunctionFileExport })
  const telefunctionName = getTelefunctionName({ telefunctionFilePath, telefunctionFileExport })

  return {
    telefunctionFilePath,
    telefunctionFileExport,
    telefunctionName,
    telefunctionKey,
    telefunctionArgs,
    isMalformed: false,
  }
}

function assertBody(body: unknown, runContext: { telefuncUrl: string }) {
  const errorNote = [
    `Make sure that \`body\` is the HTTP body of the request HTTP POST \`Content-Type: text/plain\` \`${runContext.telefuncUrl}\`.`,
    'Note that with some server frameworks, such as Express.js, you need to use a server middleware to process the HTTP body of `Content-Type: text/plain` requests.',
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

function isWrongMethod(runContext: { httpRequest: { method: string }; isProduction: boolean }) {
  if (['POST', 'post'].includes(runContext.httpRequest.method)) {
    return false
  }
  assert(typeof runContext.httpRequest.method === 'string')
  logParseError(
    [
      errMsgPrefix,
      'The argument `method` passed to `telefunc({ method })`',
      'should be `POST` (or `post`) but',
      `\`method === '${runContext.httpRequest.method}'\`.`,
      errMsgSuffix,
    ].join(' '),
    runContext,
  )
  return true
}

function assertUrl(runContext: { httpRequest: { url: string }; telefuncUrl: string }) {
  const urlPathname = getUrlPathname(runContext.httpRequest.url)
  assertUsage(
    urlPathname === runContext.telefuncUrl,
    `telefunc({ url }): The HTTP request \`url\` pathname \`${urlPathname}\` should be \`${runContext.telefuncUrl}\`. Make sure that \`url\` is the HTTP request URL, or change \`telefuncConfig.telefuncUrl\` to \`${urlPathname}\`.`,
  )
}

const errMsgPrefix = 'Malformed request in development.'
const errMsgSuffix =
  'This is unexpected since, in development, all requests are expected to originate from the Telefunc Client and should therefore be valid. If this error is happening in production, then either the environment variable `NODE_ENV="production"` or `telefunc({ isProduction: true })` is missing.'
function logParseError(errMsg: string, runContext: { isProduction: boolean }) {
  assert(errMsg.startsWith(errMsgPrefix))
  assert(errMsg.endsWith(errMsgSuffix))
  if (!runContext.isProduction) {
    console.error(getPluginError(errMsg))
  } else {
    // In production any kind of malformed request are expected, when a third party doesn't use the Telefunc Client but uses an HTTP client and makes malformed requests to `_telefunc`, e.g. a HTTP GET request to `_telefunc`.
  }
}
