export { makeHttpRequest }

import { parse } from '@brillout/json-serializer/parse'
import { assert, assertUsage } from '../../utils/assert.js'
import { isObject } from '../../utils/isObject.js'
import { objectAssign } from '../../utils/objectAssign.js'
import { callOnAbortListeners } from './onAbort.js'
import {
  STATUS_CODE_THROW_ABORT,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_BODY_INTERNAL_SERVER_ERROR,
  STATUS_CODE_MALFORMED_REQUEST,
  STATUS_BODY_MALFORMED_REQUEST,
  STATUS_CODE_SHIELD_VALIDATION_ERROR,
  STATUS_BODY_SHIELD_VALIDATION_ERROR,
  STATUS_CODE_SUCCESS,
} from '../../shared/constants.js'
import { ValidationError } from '../../shared/ValidationError.js'

const method = 'POST'

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string | FormData
  telefunctionName: string
  telefuncFilePath: string
  httpHeaders: Record<string, string> | null
  fetch: typeof globalThis.fetch | null
}): Promise<{ telefunctionReturn: unknown }> {
  const isMultipart = typeof callContext.httpRequestBody !== 'string'
  const contentType = isMultipart
    ? // Don't set Content-Type for FormData — browser sets multipart/form-data with boundary automatically
      null
    : { 'Content-Type': 'text/plain' }
  let response: Response
  try {
    const fetch = callContext.fetch ?? window.fetch
    response = await fetch(callContext.telefuncUrl, {
      method,
      body: callContext.httpRequestBody,
      credentials: 'same-origin',
      headers: {
        ...contentType,
        ...callContext.httpHeaders,
      },
    })
  } catch (_) {
    const telefunctionCallError = new Error('No Server Connection')
    objectAssign(telefunctionCallError, { isConnectionError: true as const })
    throw telefunctionCallError
  }

  const statusCode = response.status

  if (statusCode === STATUS_CODE_SUCCESS) {
    const { ret } = await parseResponseBody(response, callContext)
    const telefunctionReturn = ret
    return { telefunctionReturn }
  } else if (statusCode === STATUS_CODE_THROW_ABORT) {
    const { ret } = await parseResponseBody(response, callContext)
    const abortValue = ret
    const telefunctionCallError = new Error(
      `Aborted telefunction call ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`,
    )
    objectAssign(telefunctionCallError, { isAbort: true as const, abortValue })
    callOnAbortListeners(telefunctionCallError)
    throw telefunctionCallError
  } else if (statusCode === STATUS_CODE_INTERNAL_SERVER_ERROR) {
    throw await createServerError({
      message: STATUS_BODY_INTERNAL_SERVER_ERROR,
      response,
      callContext,
    })
  } else if (statusCode === STATUS_CODE_SHIELD_VALIDATION_ERROR) {
    throw await parseValidationError(response, callContext)
  } else if (statusCode === STATUS_CODE_MALFORMED_REQUEST) {
    const responseBody = await response.text()
    assertUsage(responseBody === STATUS_BODY_MALFORMED_REQUEST, wrongInstallation({ method, callContext }))
    /* With Next.js 12: when renaming a `.telefunc.js` file the client makes a request with the new `.telefunc.js` name while the server is still serving the old `.telefunc.js` name. Seems like a race condition: trying again seems to fix the error.
    // This should never happen as the Telefunc Client shouldn't make invalid requests
    assert(false)
    */
    assertUsage(false, 'Try again. You may need to reload the page. (The client and server are/was out-of-sync.)')
  } else {
    assertUsage(
      statusCode !== 404,
      wrongInstallation({
        reason: 'a 404 HTTP response',
        method,
        isNotInstalled: true,
        callContext,
      }),
    )
    assertUsage(
      false,
      wrongInstallation({
        reason: `a status code \`${statusCode}\` which Telefunc never returns`,
        method,
        callContext,
      }),
    )
  }
}

async function parseResponseBody(response: Response, callContext: { telefuncUrl: string }): Promise<{ ret: unknown }> {
  const responseBody = await response.text()
  const responseBodyParsed = parse(responseBody)
  assertUsage(isObject(responseBodyParsed) && 'ret' in responseBodyParsed, wrongInstallation({ method, callContext }))
  assert(response.status !== STATUS_CODE_THROW_ABORT || 'abort' in responseBodyParsed)
  const { ret } = responseBodyParsed
  return { ret }
}

function wrongInstallation({
  reason = 'an HTTP response body that Telefunc never generates',
  callContext,
  method,
  isNotInstalled,
}: {
  reason?: string
  isNotInstalled?: true
  method: 'GET' | 'POST'
  callContext: { telefuncUrl: string }
}) {
  let msg = [`Telefunc doesn't seem to be `]
  if (!isNotInstalled) msg.push('(properly) ')
  msg.push('installed on your server')
  msg.push(...[`: the HTTP ${method} \`${callContext.telefuncUrl}\` request returned `, reason])
  msg.push(`, see https://telefunc.com/install`)
  return msg.join('')
}

async function createServerError({
  message,
  response,
  callContext,
  includeLogAddendum = false,
}: {
  message: typeof STATUS_BODY_INTERNAL_SERVER_ERROR | typeof STATUS_BODY_SHIELD_VALIDATION_ERROR
  response: Response
  callContext: { telefuncUrl: string }
  includeLogAddendum?: boolean
}) {
  const responseBody = await response.text()
  assertUsage(responseBody === message, wrongInstallation({ method, callContext }))
  const logAddendum = includeLogAddendum ? ' (if enabled: https://telefunc.com/log)' : ''

  return new Error(`${message} — see server logs${logAddendum}` as const)
}

async function parseValidationError(
  response: Response,
  callContext: {
    telefuncUrl: string
  },
): Promise<ValidationError | Error> {
  assert(response.status === STATUS_CODE_SHIELD_VALIDATION_ERROR)
  const responseBody = await response.text()

  if (responseBody === STATUS_BODY_SHIELD_VALIDATION_ERROR) {
    return await createServerError({
      message: STATUS_BODY_SHIELD_VALIDATION_ERROR,
      response,
      callContext,
      includeLogAddendum: true,
    })
  }

  let validationError: unknown
  try {
    validationError = parse(responseBody)
  } catch {
    assertUsage(
      false,
      wrongInstallation({
        reason: 'a shield validation response body that Telefunc cannot parse',
        method,
        callContext,
      }),
    )
  }

  assertUsage(ValidationError.isValidationErrorData(validationError), wrongInstallation({ method, callContext }))

  return new ValidationError(validationError)
}
