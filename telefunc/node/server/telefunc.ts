export { telefunc }

import { assertHttpRequest } from './runTelefunc/assertHttpRequest'
import { runTelefunc } from './runTelefunc'
import { HttpRequest } from './types'
import { assertUsage, getUrlPathname, objectAssign } from '../utils'
import { config } from './config'

/**
 * Get the HTTP response of a telefunction call.
 * @param httpRequest.url HTTP request URL
 * @param httpRequest.method HTTP request method
 * @param httpRequest.body HTTP request body
 * @returns HTTP response
 */
function telefunc(httpRequest: HttpRequest) {
  assertHttpRequest(httpRequest, arguments.length)

  const runContext = {}
  objectAssign(runContext, { httpRequest })
  objectAssign(runContext, config)

  assertUrl(runContext)

  return runTelefunc(runContext)
}

function assertUrl(runContext: { httpRequest: { url: string }; telefuncUrl: string }) {
  const urlPathname = getUrlPathname(runContext.httpRequest.url)
  assertUsage(
    urlPathname === runContext.telefuncUrl,
    `telefunc({ url }): The HTTP request \`url\` pathname \`${urlPathname}\` should be \`${runContext.telefuncUrl}\`. Make sure that \`url\` is the HTTP request URL, or change \`config.telefuncUrl\` to \`${urlPathname}\`.`,
  )
}
