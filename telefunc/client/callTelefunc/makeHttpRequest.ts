export { makeHttpRequest }

import { parse } from '@brillout/json-s/parse'
import { assert, assertUsage, isObject, objectAssign } from '../utils'
import { executeCallErrorListeners } from './onTelefunctionRemoteCallError'
import type { TelefunctionError } from '../TelefunctionError'

const method = 'POST'
const STATUS_CODE_ABORT = 403

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string
  telefunctionName: string
  httpHeaders: Record<string, string>
}): Promise<{ telefunctionReturn: unknown } | { telefunctionCallError: TelefunctionError }> {
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
    return { telefunctionCallError }
  }

  const statusCode = response.status

  assertUsage(
    statusCode !== 404,
    installErr({
      reason: 'a 404 HTTP response',
      method,
      isNotInstalled: true,
      callContext
    })
  )

  if (statusCode === 500) {
    const responseBody = await response.text()
    assertUsage(
      responseBody === 'Internal Server Error (Telefunc Request)',
      installErr({
        reason: 'an HTTP response body that Telefunc never generates',
        method,
        callContext
      })
    )
    const telefunctionCallError = new Error('Server Error')
    return { telefunctionCallError }
  }

  if (statusCode === 200) {
    const { ret } = await parseResponseBody(response, callContext)
    const telefunctionReturn = ret
    return { telefunctionReturn }
  }
  if (statusCode === STATUS_CODE_ABORT) {
    const { ret } = await parseResponseBody(response, callContext)
    const abortValue = ret
    const telefunctionCallError = new Error(`Abort. (Telefunction ${callContext.telefunctionName}.)`)
    objectAssign(telefunctionCallError, { isAbort: true as const, abortValue })
    executeCallErrorListeners(telefunctionCallError)
    return { telefunctionCallError }
  }

  assert(![200, 404, STATUS_CODE_ABORT, 500].includes(statusCode))
  assertUsage(
    false,
    installErr({
      reason: `a status code \`${statusCode}\` which Telefunc does not return`,
      method,
      callContext
    })
  )
}

async function parseResponseBody(response: Response, callContext: { telefuncUrl: string }): Promise<{ ret: unknown }> {
  const statusCode = response.status
  assert(statusCode === 200 || statusCode === STATUS_CODE_ABORT)
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
  if (statusCode === 200) {
    assert(!('abort' in responseBodyParsed))
  } else if (statusCode === 403) {
    assert('abort' in responseBodyParsed)
  } else {
    assert(false)
  }
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
  msg.push(`. See https://telefunc.com/install`)
  return msg.join('')
}
