export { makeHttpRequest }

import { parse } from '@brillout/json-s'
import { assert, assertUsage, isObject, isBrowser } from '../utils'

assertIsBrowser()

type RequestError = Error & { isConnectionError?: true; isTelefunctionError?: true }

async function makeHttpRequest(callContext: {
  telefuncUrl: string
  httpRequestBody: string
  telefunctionName: string
}): Promise<{ telefunctionReturn: unknown; requestError: RequestError | null }> {
  const method = 'POST'

  let requestError: RequestError | null = null

  let response: Response | null = null
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
    requestError = new Error('No Server Connection')
    requestError.isConnectionError = true
  }

  let telefunctionReturn: unknown
  if (response !== null) {
    const statusCode = response.status
    const isOk = response.ok
    const installErr = `Telefunc doesn't seem to be (properly) installed on your server. Make sure to reply all HTTP requests made to \`${callContext.telefuncUrl}\` with the \`telefunc()\` server middleware. For both \`GET\` and \`POST\` HTTP methods.`
    assertUsage(
      statusCode === 500 || statusCode === 200,
      `${installErr}. (The HTTP ${method} request made to \`${callContext.telefuncUrl}\` returned a status code of \`${statusCode}\` which Telefunc never uses.)`,
    )
    assert([true, false].includes(isOk))
    assert(isOk === (statusCode === 200))

    if (statusCode === 200) {
      const responseBody = await response.text()
      const value = parse(responseBody)
      assertUsage(
        isObject(value) && 'ret' in value,
        `${installErr}. (The HTTP ${method} request made to \`${callContext.telefuncUrl}\` returned an HTTP response body that Telefunc never generates.)`,
      )
      telefunctionReturn = value.ret
    } else {
      requestError = new Error(
        `The telefunc \`${callContext.telefunctionName}\` threw an error. Check the server logs for more information.`,
      )
      requestError.isTelefunctionError = true
    }
  }

  return {
    telefunctionReturn,
    requestError,
  }
}

function assertIsBrowser() {
  assertUsage(isBrowser(), 'The Telefunc client only works in the browser.')
}
