//import type { ViteDevServer } from 'vite'
//import { assert, assertUsage } from './utils'
//import { HttpRequest, ServerConfig, Telefunctions } from './types'
//import { callTelefuncStart } from './callTelefunc/index'
//import { assertArgs_createTelefuncCaller, assertArgs_callTelefunc } from './assertArgs'
//
//export { createTelefuncCaller }
//
//let alreadyCalled = false
//function createTelefuncCaller(config: ServerConfig) {
//  assertUsage(
//    alreadyCalled === false,
//    '`createTelefuncCaller()`: You are calling `createTelefuncCaller()` a second time which is forbidden; it should be called only once.',
//  )
//  alreadyCalled = true
//
//  const userConfig: ServerConfig = {
//    isProduction,
//    root,
//    viteDevServer,
//    telefuncUrl,
//    telefuncFiles,
//    disableEtag,
//  }
//  assertArgs_createTelefuncCaller(userConfig, Array.from(arguments))
//
//  return callTelefunc
//
//  async function callTelefunc(httpRequest: HttpRequest) {
//    assertArgs_callTelefunc(httpRequest, Array.from(arguments))
//    assertUsage(
//      arguments.length === 1,
//      '`callTelefunc(/* ... */, context)` is deprecated. Use `provideContext(context)` instead, see https://telefunc.com/provideContext',
//    )
//    assert(userConfig)
//    return callTelefuncStart(httpRequest, userConfig)
//  }
//}
