export { makeHttpRequest }
export type { TelefuncCallError }

import { parse } from '@brillout/json-s'
import { assert, assertUsage, isObject, objectAssign } from '../utils'
import { callTelefuncCallErrorListeners } from './onTelefuncCallError'

type TelefuncCallError = Error & {
  isConnectionError: boolean
  isTelefunctionError: boolean
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
    callTelefuncCallErrorListeners(telefuncCallError)
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
      responseBody === 'Internal Telefunction Error',
      installErr({
        reason: 'an HTTP response body that Telefunc never generates',
        method,
        callContext,
      }),
    )
    const telefuncCallError = new Error(
      `The telefunction \`${callContext.telefunctionName}\` threw an error, see server logs.`,
    )
    objectAssign(telefuncCallError, { ...errDefaults, isTelefunctionError: true as const })
    callTelefuncCallErrorListeners(telefuncCallError)
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
        `The telefunction \`${callContext.telefunctionName}\` threw a \`Abort()\`, see https://telefunc.comm/Abort`,
      )
      objectAssign(telefuncCallError, { ...errDefaults, isAbort: true as const, value })
      callTelefuncCallErrorListeners(telefuncCallError)
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
  isTelefunctionError: false,
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
