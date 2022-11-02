export { makeHttpRequest }

import { parse } from '@brillout/json-s/parse'
import { assert, assertUsage, isObject, objectAssign } from '../utils'
import { executeCallErrorListeners } from './onTelefunctionRemoteCallError'

const method = 'POST'
const STATUS_CODE_SUCCESS = 200
const STATUS_CODE_ABORT = 403
const STATUS_CODE_BUG = 500
const STATUS_CODE_INVALID = 400

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string
  telefunctionName: string
  telefuncFilePath: string
  httpHeaders: Record<string, string> | null
}): Promise<{ telefunctionReturn: unknown }> {
  let response: Response
  try {
    response = await fetch(callContext.telefuncUrl, {
      method,
      body: callContext.httpRequestBody,
      credentials: 'same-origin',
      headers: {
        ...callContext.httpHeaders,
        'Content-Type': 'text/plain'
      }
    })
  } catch (_) {
    const telefunctionCallError = new Error('No Server Connection')
    objectAssign(telefunctionCallError, { isConnectionError: true as const })
    executeCallErrorListeners(telefunctionCallError)
    throw telefunctionCallError
  }

  const statusCode = response.status

  if (statusCode === STATUS_CODE_SUCCESS) {
    const { ret } = await parseResponseBody(response, callContext)
    const telefunctionReturn = ret
    return { telefunctionReturn }
  } else if (statusCode === STATUS_CODE_ABORT) {
    const { ret } = await parseResponseBody(response, callContext)
    const abortValue = ret
    const telefunctionCallError = new Error(
      `Aborted telefunction call ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`
    )
    objectAssign(telefunctionCallError, { isAbort: true as const, abortValue })
    executeCallErrorListeners(telefunctionCallError)
    throw telefunctionCallError
  } else if (statusCode === STATUS_CODE_BUG) {
    const responseBody = await response.text()
    const errMsg = 'Internal Server Error'
    assertUsage(
      responseBody === errMsg,
      installErr({
        reason: 'an HTTP response body that Telefunc never generates',
        method,
        callContext
      })
    )
    throw new Error(errMsg)
  } else if (statusCode === STATUS_CODE_INVALID) {
    const responseBody = await response.text()
    assertUsage(
      responseBody === 'Invalid Telefunc Request',
      installErr({
        reason: 'an HTTP response body that Telefunc never generates',
        method,
        callContext
      })
    )
    // This should never happen as the Telefunc Client shouldn't make invalid requests
    assert(false)
  } else {
    assertUsage(
      statusCode !== 404,
      installErr({
        reason: 'a 404 HTTP response',
        method,
        isNotInstalled: true,
        callContext
      })
    )
    assertUsage(
      false,
      installErr({
        reason: `a status code \`${statusCode}\` which Telefunc never uses`,
        method,
        callContext
      })
    )
  }
}

async function parseResponseBody(response: Response, callContext: { telefuncUrl: string }): Promise<{ ret: unknown }> {
  const responseBody = await response.text()
  const responseBodyParsed = parse(responseBody)
  assertUsage(
    isObject(responseBodyParsed) && 'ret' in responseBodyParsed,
    installErr({
      reason: 'an HTTP response body that Telefunc never generates',
      method,
      callContext
    })
  )
  assert(response.status !== STATUS_CODE_ABORT || 'abort' in responseBodyParsed)
  const { ret } = responseBodyParsed
  return { ret }
}

function installErr({
  reason,
  callContext,
  method,
  isNotInstalled
}: {
  reason?: string
  isNotInstalled?: true
  method: 'GET' | 'POST'
  callContext: { telefuncUrl: string }
}) {
  let msg = [`Telefunc doesn't seem to be `]
  if (!isNotInstalled) {
    msg.push('(properly) ')
  }
  msg.push('installed on your server')
  if (reason) {
    msg.push(...[`: the HTTP ${method} \`${callContext.telefuncUrl}\` request returned `, reason])
  }
  msg.push(`, see https://telefunc.com/install`)
  return msg.join('')
}
