export { makeHttpRequest }
export type { TelefunctionError }

import { parse } from '@brillout/json-s'
import { assert, assertUsage, isObject, objectAssign } from '../utils'
import { executeCallErrorListeners } from './onTelefunctionRemoteCallError'

type TelefunctionError = Error &
  (
    | {
        isConnectionError: true
        isServerError: false
        isAbort: false
      }
    | {
        isConnectionError: false
        isServerError: true
        isAbort: false
      }
    | {
        isConnectionError: false
        isServerError: false
        isAbort: true
        abortValue: unknown
      }
  )

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string
  telefunctionFilePath: string
  telefunctionExportName: string
}): Promise<{ telefunctionReturn: unknown } | { telefunctionCallError: TelefunctionError }> {
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
    const telefunctionCallError = new Error('No Server Connection')
    objectAssign(telefunctionCallError, { ...errDefaults, isConnectionError: true as const })
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
    const telefunctionCallError = new Error('Server Error')
    objectAssign(telefunctionCallError, { ...errDefaults, isServerError: true as const })
    executeCallErrorListeners(telefunctionCallError)
    return { telefunctionCallError }
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
      const abortValue = responseValue.ret
      const telefunctionCallError = new Error(
        `Telefunction \`${callContext.telefunctionExportName}\` (${callContext.telefunctionFilePath}) aborted, see https://telefunc.comm/Abort`,
      )
      objectAssign(telefunctionCallError, { ...errDefaults, isAbort: true as const, abortValue })
      executeCallErrorListeners(telefunctionCallError)
      return { telefunctionCallError }
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
  isConnectionError: false as const,
  isServerError: false as const,
  isAbort: false as const,
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
