export { parseHttpRequest }

import { parse } from '@brillout/json-s/parse'
import {
  assertUsage,
  hasProp,
  getProjectError,
  getUrlPathname,
  assert,
  getTelefunctionKey,
  isProduction
} from '../../utils'

function parseHttpRequest(runContext: {
  httpRequest: { body: unknown; url: string; method: string }
  logInvalidRequests: boolean
  serverConfig: {
    telefuncUrl: string
  }
}):
  | {
      telefuncFilePath: string
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
    if (runContext.logInvalidRequests) {
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
        'The argument `body` passed to `telefunc({ body })`',
        'could not be parsed',
        `(\`body === '${bodyString}'\`).`,
        !hasProp(err, 'message') ? null : `Parse error: ${err.message}.`
      ]
        .filter(Boolean)
        .join(' '),
      runContext
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
        'The argument `body` passed to `telefunc({ body })`',
        'can be parsed but its content is invalid',
        `(\`body === '${bodyString}'\`).`
      ].join(' '),
      runContext
    )
    return { isMalformed: true }
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
    isMalformed: false
  }
}

function assertBody(body: unknown, runContext: { serverConfig: { telefuncUrl: string } }) {
  const errorNote = [
    `Make sure that \`body\` is the HTTP body string of the request HTTP POST \`Content-Type: text/plain\` \`${runContext.serverConfig.telefuncUrl}\`.`,
    'Note that with some server frameworks, such as Express.js, a server middleware is needed to process the HTTP body of `Content-Type: text/plain` requests.'
  ].join(' ')
  assertUsage(
    body !== undefined && body !== null,
    ['`telefunc({ body })`: argument `body` should be a string but', `\`body === ${body}\`.`, errorNote].join(' ')
  )
  assertUsage(
    typeof body === 'string',
    [
      '`telefunc({ body })`: argument `body` should be a string but',
      `\`typeof body === '${typeof body}'\`.`,
      errorNote
    ].join(' ')
  )
  assertUsage(
    // Express.js sets `req.body === '{}'` upon wrong Content-Type
    body !== '{}',
    ["`telefunc({ body })`: argument `body` is an empty JSON object (`body === '{}'`).", errorNote].join(' ')
  )
}

function isWrongMethod(runContext: { httpRequest: { method: string }; logInvalidRequests: boolean }) {
  if (['POST', 'post'].includes(runContext.httpRequest.method)) {
    return false
  }
  assert(typeof runContext.httpRequest.method === 'string')
  logParseError(
    [
      'The argument `method` passed to `telefunc({ method })`',
      'should be `POST` (or `post`) but',
      `\`method === '${runContext.httpRequest.method}'\`.`
    ].join(' '),
    runContext
  )
  return true
}

function assertUrl(runContext: { httpRequest: { url: string }; serverConfig: { telefuncUrl: string } }) {
  const urlPathname = getUrlPathname(runContext.httpRequest.url)
  assertUsage(
    urlPathname === runContext.serverConfig.telefuncUrl,
    `telefunc({ url }): The pathname of \`url\` is \`${urlPathname}\` but it's expected to be \`${runContext.serverConfig.telefuncUrl}\`. Either make sure that \`url\` is the HTTP request URL, or set \`telefuncConfig.telefuncUrl\` to \`${urlPathname}\`.`
  )
}

function logParseError(errMsg: string, runContext: { logInvalidRequests: boolean }) {
  const errMsgPrefix = 'Malformed request in development.'
  const errMsgSuffix =
    'This is unexpected since, in development, all requests are expected to originate from the Telefunc Client and should therefore be valid.'
  if (!isProduction()) {
    errMsg = `${errMsgPrefix} ${errMsg} ${errMsgSuffix}`
  }
  if (runContext.logInvalidRequests) {
    console.error(getProjectError(errMsg))
  }
}
