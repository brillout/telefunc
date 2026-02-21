export { parseHttpRequest }

import { parse } from '@brillout/json-serializer/parse'
import {
  assertUsage,
  hasProp,
  getProjectError,
  getUrlPathname,
  assert,
  getTelefunctionKey,
  isProduction,
} from '../utils.js'
import { isMultipartKey } from '../../../shared/multipart.js'

type ParseResult =
  | {
      telefuncFilePath: string
      telefunctionName: string
      telefunctionKey: string
      telefunctionArgs: unknown[]
      isMalformedRequest: false
    }
  | { isMalformedRequest: true }

function parseHttpRequest(runContext: {
  httpRequest: { body: unknown; url: string; method: string }
  logMalformedRequests: boolean
  serverConfig: {
    telefuncUrl: string
  }
}): ParseResult {
  assertUrl(runContext)

  if (isWrongMethod(runContext)) {
    return { isMalformedRequest: true }
  }

  const { body } = runContext.httpRequest

  if (isFormData(body)) {
    return parseMultipartBody(body, runContext)
  }

  return parseStringBody(body, runContext)
}

// ===== FormData (multipart) body =====

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== 'undefined' && body instanceof FormData
}

function parseMultipartBody(formData: FormData, runContext: { logMalformedRequests: boolean }): ParseResult {
  const metaString = formData.get('__telefunc')
  if (typeof metaString !== 'string') {
    logParseError('The multipart request body is missing the `__telefunc` field.', runContext)
    return { isMalformedRequest: true }
  }

  let bodyParsed: unknown
  try {
    bodyParsed = parse(metaString)
  } catch (err: unknown) {
    logParseError(
      [
        'The `__telefunc` field in the multipart request body',
        "couldn't be parsed.",
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
    logParseError('The `__telefunc` field in the multipart request body has unexpected content.', runContext)
    return { isMalformedRequest: true }
  }

  const telefuncFilePath = bodyParsed.file
  const telefunctionName = bodyParsed.name

  // Replace multipart placeholders with actual File/Blob objects from the FormData
  const telefunctionArgs = bodyParsed.args.map((arg: unknown) => {
    if (!isMultipartKey(arg)) return arg
    return formData.get(arg)
  })

  const telefunctionKey = getTelefunctionKey(telefuncFilePath, telefunctionName)

  return {
    telefuncFilePath,
    telefunctionName,
    telefunctionKey,
    telefunctionArgs,
    isMalformedRequest: false,
  }
}

// ===== String (JSON) body =====

function parseStringBody(
  body: unknown,
  runContext: { logMalformedRequests: boolean; serverConfig: { telefuncUrl: string } },
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

// ===== Shared helpers =====

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

function isWrongMethod(runContext: { httpRequest: { method: string }; logMalformedRequests: boolean }) {
  if (['POST', 'post'].includes(runContext.httpRequest.method)) {
    return false
  }
  assert(typeof runContext.httpRequest.method === 'string')
  logParseError(
    [
      'The argument `method` passed to `telefunc({ method })`',
      'should be `POST` (or `post`) but',
      `\`method === '${runContext.httpRequest.method}'\`.`,
    ].join(' '),
    runContext,
  )
  return true
}

function assertUrl(runContext: { httpRequest: { url: string }; serverConfig: { telefuncUrl: string } }) {
  const urlPathname = getUrlPathname(runContext.httpRequest.url)
  assertUsage(
    urlPathname === runContext.serverConfig.telefuncUrl,
    `telefunc({ url }): The pathname of \`url\` is \`${urlPathname}\` but it's expected to be \`${runContext.serverConfig.telefuncUrl}\`. Either make sure that \`url\` is the HTTP request URL, or set \`config.telefuncUrl\` to \`${urlPathname}\`.`,
  )
}

function logParseError(errMsg: string, runContext: { logMalformedRequests: boolean }) {
  const errMsgPrefix = 'Malformed request in development.'
  const errMsgSuffix =
    'This is unexpected since, in development, all requests are expected to originate from the Telefunc Client and should therefore be properly structured.'
  if (!isProduction()) {
    errMsg = `${errMsgPrefix} ${errMsg} ${errMsgSuffix}`
  }
  if (runContext.logMalformedRequests) {
    console.error(getProjectError(errMsg))
  }
}
