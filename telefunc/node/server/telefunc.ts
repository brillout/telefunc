export { telefunc }

import { assertHttpRequest } from './runTelefunc/assertHttpRequest'
import { runTelefunc } from './runTelefunc'
import { HttpRequest } from './types'
import { assert, assertUsage, getUrlPathname, objectAssign } from '../utils'
import { telefuncConfig } from './telefuncConfig'

/**
 * Get the HTTP response of a telefunction call.
 * @param httpRequest.url HTTP request URL
 * @param httpRequest.method HTTP request method
 * @param httpRequest.body HTTP request body
 * @returns HTTP response
 */
async function telefunc(httpRequest: HttpRequest) {
  assertHttpRequest(httpRequest, arguments.length)

  const runContext = {}
  objectAssign(runContext, { httpRequest })
  objectAssign(runContext, telefuncConfig)

  assertUrl(runContext)

  const httpResponse = await runTelefunc(runContext)
  assert(httpResponse)
  return httpResponse
}

function assertUrl(runContext: { httpRequest: { url: string }; telefuncUrl: string }) {
  const urlPathname = getUrlPathname(runContext.httpRequest.url)
  assertUsage(
    urlPathname === runContext.telefuncUrl,
    `telefunc({ url }): The HTTP request \`url\` pathname \`${urlPathname}\` should be \`${runContext.telefuncUrl}\`. Make sure that \`url\` is the HTTP request URL, or change \`telefuncConfig.telefuncUrl\` to \`${urlPathname}\`.`,
  )
}
