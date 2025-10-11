export { makeHttpRequest }

import { parse } from '@brillout/json-serializer/parse'
import { assert, assertUsage, isObject, objectAssign } from '../utils.js'
import { callOnAbortListeners } from './onAbort.js'

const method = 'POST'
const STATUS_CODE_SUCCESS = 200
const STATUS_CODE_ABORT = 403
const STATUS_CODE_BUG = 500
// TODO rename to STATUS_CODE_MALFORMED
const STATUS_CODE_INVALID = 400

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string
  telefunctionName: string
  telefuncFilePath: string
  httpHeaders: Record<string, string> | null
  fetch: typeof globalThis.fetch | null
}): Promise<{ telefunctionReturn: unknown }> {
  let response: Response
  try {
    const fetch = callContext.fetch ?? window.fetch
    response = await fetch(callContext.telefuncUrl, {
      method,
      body: callContext.httpRequestBody,
      credentials: 'same-origin',
      headers: {
        ...callContext.httpHeaders,
        'Content-Type': 'text/plain',
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
  } else if (statusCode === STATUS_CODE_ABORT) {
    const { ret } = await parseResponseBody(response, callContext)
    const abortValue = ret
    const telefunctionCallError = new Error(
      `Aborted telefunction call ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`,
    )
    objectAssign(telefunctionCallError, { isAbort: true as const, abortValue })
    callOnAbortListeners(telefunctionCallError)
    throw telefunctionCallError
  } else if (statusCode === STATUS_CODE_BUG) {
    const responseBody = await response.text()
    const errMsg = 'Internal Server Error'
    assertUsage(responseBody === errMsg, wrongInstallation({ method, callContext }))
    throw new Error(`${errMsg}. See server logs.`)
  } else if (statusCode === STATUS_CODE_INVALID) {
    const responseBody = await response.text()
    assertUsage(responseBody === 'Invalid Telefunc Request', wrongInstallation({ method, callContext }))
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
  assert(response.status !== STATUS_CODE_ABORT || 'abort' in responseBodyParsed)
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
