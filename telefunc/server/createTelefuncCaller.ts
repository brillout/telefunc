import type { ViteDevServer } from 'vite'
import { assert, assertUsage } from './utils'
import { HttpRequest, UserConfig, Telefunctions } from './types'
import { callTelefunc } from './callTelefunc'
import { assertArgs_createTelefuncCaller, assertArgs_callTelefunc } from './assertArgs'

export { createTelefuncCaller }

let alreadyCalled = false
function createTelefuncCaller({
  isProduction,
  root,
  viteDevServer,
  telefuncUrl = '/_telefunc',
  telefuncFiles,
  disableEtag = false,
}: {
  isProduction: boolean
  root?: string
  viteDevServer?: ViteDevServer
  /** URL at which Telefunc HTTP requests are served (default: `_telefunc`). */
  telefuncUrl?: string
  telefuncFiles?: Record<string, Telefunctions>
  /** Whether Telefunc generates HTTP ETag headers. */
  disableEtag?: boolean
}) {
  assertUsage(
    alreadyCalled === false,
    '`createTelefuncCaller()`: You are calling `createTelefuncCaller()` a second time which is forbidden; it should be called only once.',
  )
  alreadyCalled = true

  const userConfig: UserConfig = {
    isProduction,
    root,
    viteDevServer,
    telefuncUrl,
    telefuncFiles,
    disableEtag,
  }
  assertArgs_createTelefuncCaller(userConfig, Array.from(arguments))

  /**
   * Get the HTTP response of a telefunction call.
   * @param httpRequest.url HTTP request URL
   * @param httpRequest.method HTTP request method
   * @param httpRequest.body HTTP request body
   * @param context The context object
   * @returns HTTP response
   */
  return async function (httpRequest: HttpRequest) {
    assertArgs_callTelefunc(httpRequest, Array.from(arguments))
    assertUsage(
      arguments.length === 1,
      '`callTelefunc(/* ... */, context)` is deprecated. Use `provideContext(context)` instead, see https://telefunc.com/provideContext',
    )
    assert(userConfig)
    return callTelefunc(httpRequest, userConfig)
  }
}
