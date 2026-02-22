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
import { createMultipartReviver } from '../../../shared/multipart/multipart-server.js'
import { FORM_DATA_MAIN_FIELD } from '../../../shared/multipart/constants.js'
import { MultipartReader } from '../streaming/multipartReader.js'
import { LazyBlob, LazyFile } from '../streaming/lazyFile.js'

type ParseResult =
  | {
      telefuncFilePath: string
      telefunctionName: string
      telefunctionKey: string
      telefunctionArgs: unknown[]
      isMalformedRequest: false
    }
  | { isMalformedRequest: true }

async function parseHttpRequest(runContext: {
  request: Request
  logMalformedRequests: boolean
  serverConfig: {
    telefuncUrl: string
  }
}): Promise<ParseResult> {
  const { request } = runContext

  assertUrl(request, runContext)

  if (isWrongMethod(request, runContext)) {
    return { isMalformedRequest: true }
  }

  const contentType = request.headers.get('content-type') || ''
  const isMultipart = contentType.includes('multipart/form-data')
  if (isMultipart) {
    assert(request.body)
    const boundary = getBoundary(contentType)
    assert(boundary, 'The multipart request is missing a boundary in the Content-Type header.')
    return parseMultipartBody(request.body, boundary, runContext)
  }

  const text = await request.text()
  return parseTelefuncPayload(text, runContext)
}

function getBoundary(contentType: string): string | null {
  const match = contentType.match(/boundary=(?:"([^"]+)"|([^\s;]+))/)
  return match ? match[1] || match[2] || null : null
}

// ===== Multipart (streaming) body =====

async function parseMultipartBody(
  bodyStream: ReadableStream<Uint8Array>,
  boundary: string,
  runContext: { logMalformedRequests: boolean },
): Promise<ParseResult> {
  const reader = new MultipartReader(bodyStream, boundary)

  const metaText = await reader.readNextPartAsText(FORM_DATA_MAIN_FIELD)
  if (metaText === null) {
    logParseError(`The multipart request body is missing the ${FORM_DATA_MAIN_FIELD} field.`, runContext)
    return { isMalformedRequest: true }
  }

  const reviver = createMultipartReviver({
    createFile: (fileMetadata) => new LazyFile(reader, fileMetadata.key, fileMetadata),
    createBlob: (fileMetadata) => new LazyBlob(reader, fileMetadata.key, fileMetadata),
  })
  return parseTelefuncPayload(metaText, runContext, reviver)
}

// ===== Shared parsing =====

type Reviver = Parameters<typeof parse>[1] extends infer O ? (O extends { reviver?: infer R } ? R : never) : never

/** Parse FORM_DATA_MAIN_FIELD payload, validate shape, and build a ParseResult. */
function parseTelefuncPayload(
  text: string,
  runContext: { logMalformedRequests: boolean },
  reviver?: Reviver,
): ParseResult {
  let parsed: unknown
  try {
    parsed = parse(text, { reviver })
  } catch (err: unknown) {
    logParseError(
      [
        "The telefunc request body couldn't be parsed.",
        !hasProp(err, 'message') ? null : `Parse error: ${err.message}.`,
      ]
        .filter(Boolean)
        .join(' '),
      runContext,
    )
    return { isMalformedRequest: true }
  }

  if (!hasProp(parsed, 'file', 'string') || !hasProp(parsed, 'name', 'string') || !hasProp(parsed, 'args', 'array')) {
    logParseError('The telefunc request body has unexpected content.', runContext)
    return { isMalformedRequest: true }
  }

  const telefunctionKey = getTelefunctionKey(parsed.file, parsed.name)
  return {
    telefuncFilePath: parsed.file,
    telefunctionName: parsed.name,
    telefunctionKey,
    telefunctionArgs: parsed.args,
    isMalformedRequest: false,
  }
}

// ===== Shared helpers =====

function isWrongMethod(request: Request, runContext: { logMalformedRequests: boolean }) {
  if (['POST', 'post'].includes(request.method)) {
    return false
  }
  logParseError(
    ['The HTTP request method', 'should be `POST` (or `post`) but', `\`method === '${request.method}'\`.`].join(' '),
    runContext,
  )
  return true
}

function assertUrl(request: Request, runContext: { serverConfig: { telefuncUrl: string } }) {
  const urlPathname = getUrlPathname(request.url)
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
