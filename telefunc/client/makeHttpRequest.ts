import { assert, assertUsage } from './utils'
import { parse } from '@brillout/json-s'
import { TelefunctionName, TelefunctionResult } from '../shared/types'
import { HttpRequestBody, HttpRequestUrl } from './TelefuncClient'
import { isObject } from './utils'

export { makeHttpRequest }
export { TelefuncError }

async function makeHttpRequest(
  url: HttpRequestUrl,
  body: HttpRequestBody | undefined,
  telefunctionName: TelefunctionName,
): Promise<TelefunctionResult> {
  const method = 'POST'

  let response: Response
  console.log('req', url)
  try {
    response = await fetch(url, {
      method,
      body,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (_) {
    throw new TelefuncError('No Server Connection', {
      isConnectionError: true,
      isCodeError: false,
    })
  }
  console.log('response', url)

  const statusCode = response.status
  const isOk = response.ok
  const installErr = `Telefunc doesn't seem to be (properly) installed on your server. Make sure to reply all HTTP requests made to \`${url}\` with \`callTelefunc()\` (for both \`GET\` and \`POST\` HTTP methods)`
  assertUsage(
    statusCode === 500 || statusCode === 200,
    `${installErr}. (The HTTP ${method} request made to \`${url}\` returned a status code of \`${statusCode}\` which Telefunc never uses.)`,
  )
  assert([true, false].includes(isOk))
  assert(isOk === (statusCode === 200))

  if (statusCode === 200) {
    const responseBody = await response.text()
    const value = parse(responseBody)
    assertUsage(
      isObject(value) && 'telefuncResult' in value,
      `${installErr}. (The HTTP ${method} request made to \`${url}\` returned an HTTP response body that Telefunc never generates.)`,
    )
    const telefuncResult: unknown = value.telefuncResult
    return telefuncResult
  } else {
    const codeErrorText = `The telefunc \`${telefunctionName}\` threw an error. Check the server logs for more information.`
    throw new TelefuncError(codeErrorText, {
      isConnectionError: false,
      isCodeError: true,
    })
  }
}

class TelefuncError extends Error {
  isCodeError: boolean
  isConnectionError: boolean
  constructor(
    message: string,
    { isCodeError, isConnectionError }: { isCodeError: boolean; isConnectionError: boolean },
  ) {
    super(message)

    // Bugfix: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, TelefuncError.prototype)

    this.isConnectionError = isConnectionError
    this.isCodeError = isCodeError

    assert(this.message === message)
    assert(this.isConnectionError !== this.isCodeError)
  }
}

declare global {
  interface Window {
    handli?: any
  }
}
