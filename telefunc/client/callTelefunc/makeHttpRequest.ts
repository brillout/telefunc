export { makeHttpRequest }
export type { TelefuncCallError }

import { parse } from '@brillout/json-s'
import { assert, assertUsage, isObject, objectAssign } from '../utils'
import { executeCallErrorListeners } from './onTelefunctionCallError'

type TelefuncCallError = Error & {
  isConnectionError: boolean
  isServerError: boolean
  isAbort: boolean
  value: unknown
}

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string
  telefunctionName: string
}): Promise<{ telefunctionReturn: unknown } | { telefuncCallError: TelefuncCallError }> {
  const method = 'POST'

  let response: Response
  try {
    response = await fetch(callContext.telefuncUrl, {
      method,
      body: callContext.httpRequestBody,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (_) {
    const telefuncCallError = new Error('No Server Connection')
    objectAssign(telefuncCallError, { ...errDefaults, isConnectionError: true as const })
    executeCallErrorListeners(telefuncCallError)
    return { telefuncCallError }
  }

  const statusCode = response.status

  assertUsage(
    statusCode !== 404,
    installErr({
      reason: 'a 404 HTTP response',
      method,
      isNotInstalled: true,
      callContext,
    }),
  )

  if (statusCode === 500) {
    const responseBody = await response.text()
    assertUsage(
      responseBody === 'Internal Server Error (Telefunc Request)',
      installErr({
        reason: 'an HTTP response body that Telefunc never generates',
        method,
        callContext,
      }),
    )
    const telefuncCallError = new Error('Server Error')
    objectAssign(telefuncCallError, { ...errDefaults, isServerError: true as const })
    executeCallErrorListeners(telefuncCallError)
    return { telefuncCallError }
  }

  if (statusCode === 200 || statusCode === 403) {
    const responseBody = await response.text()
    const responseValue: Record<string, unknown> = parse(responseBody)
    assertUsage(
      isObject(responseValue) && 'ret' in responseValue,
      installErr({
        reason: 'an HTTP response body that Telefunc never generates',
        method,
        callContext,
      }),
    )
    if (statusCode === 200) {
      assert(!('abort' in responseValue))
      const telefunctionReturn = responseValue.ret
      return { telefunctionReturn }
    } else {
      assert('abort' in responseValue)
      const value = responseValue.ret
      const telefuncCallError = new Error(
        `Telefunction \`${callContext.telefunctionName}\` aborted, see https://telefunc.comm/Abort`,
      )
      objectAssign(telefuncCallError, { ...errDefaults, isAbort: true as const, value })
      executeCallErrorListeners(telefuncCallError)
      return { telefuncCallError }
    }
  }

  assert(![200, 404, 403, 500].includes(statusCode))
  assertUsage(
    false,
    installErr({
      reason: `a status code \`${statusCode}\` which Telefunc does not return`,
      method,
      callContext,
    }),
  )
}

const errDefaults = {
  isConnectionError: false,
  isServerError: false,
  isAbort: false,
  // @ts-ignore
  value: undefined,
}

function installErr({
  reason,
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
  if (!isNotInstalled) {
    msg.push('(properly) ')
  }
  msg.push('installed on your server')
  if (reason) {
    msg.push(...[`: the HTTP ${method} request made to \`${callContext.telefuncUrl}\` returned `, reason])
  }
  msg.push(`. See https://telefunc.com/install`)
  return msg.join('')
}
