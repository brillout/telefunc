export { parseHttpRequest }

import { assertUsage, getUrlPathname, assert } from '../../utils.js'
import { parseStringBody } from './parseStringBody.js'
import { parseMultipartBody } from './parseMultipartBody.js'
import { logParseError, type ParseResult } from './utils.js'

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

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== 'undefined' && body instanceof FormData
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
