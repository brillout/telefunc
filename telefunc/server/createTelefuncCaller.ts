import type { ViteDevServer } from 'vite'
import { normalize as pathNormalize } from 'path'
import { assert, assertUsage, hasProp, isPlainObject } from './utils'
import { HttpRequest, UserConfig, Telefunctions } from './types'
import { installAsyncMode } from './getContext'
import { callTelefunc } from './callTelefunc'

export { createTelefuncCaller }

let alreadyCalled = false
async function createTelefuncCaller({
  isProduction,
  root,
  viteDevServer,
  baseUrl = '/',
  telefuncUrl = '/_telefunc',
  telefuncFiles,
  disableCache = false,
}: {
  isProduction: boolean
  root?: string
  viteDevServer?: ViteDevServer
  /** Base URL (default: `/`). */
  baseUrl?: string
  /** URL at which Telefunc HTTP requests are served (default: `_telefunc`). */
  telefuncUrl?: string
  telefuncFiles?: Record<string, Telefunctions>
  /** Whether Telefunc generates HTTP ETag headers. */
  disableCache?: boolean
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
    baseUrl,
    telefuncUrl,
    telefuncFiles,
    disableCache,
  }
  assertArgs(userConfig, Array.from(arguments))

  await installAsyncMode()

  /**
   * Get the HTTP response of a telefunction call.
   * @param httpRequest.url HTTP request URL
   * @param httpRequest.method HTTP request method
   * @param httpRequest.body HTTP request body
   * @param context The context object
   * @returns HTTP response
   */
  return async function (httpRequest: HttpRequest) {
    assertUsage(
      arguments.length === 1,
      '`callTelefunc(/* ... */, context)` is deprecated. Use `provideContext(context)` instead, see https://telefunc.com/provideContext',
    )
    assert(userConfig)
    return callTelefunc(httpRequest, userConfig, Array.from(arguments))
  }
}

function assertArgs(config: Record<string, unknown>, args: unknown[]): void {
  assertUsage(
    args.length === 1 && isPlainObject(args[0]),
    '`createTelefuncCaller()`: all arguments should be passed as a single argument object.',
  )

  {
    const optionList = [
      'isProduction',
      'root',
      'viteDevServer',
      'baseUrl',
      'telefuncUrl',
      'telefuncFiles',
      'disableCache',
    ]
    Object.keys(config).forEach((optionName) => {
      assert(optionList.includes(optionName), { optionName })
    })
    Object.keys(args[0]).forEach((arg) => {
      assertUsage(optionList.includes(arg), `\`createTelefuncCaller()\`: Unknown argument \`${arg}\`.`)
    })
    optionList.forEach((optionName) => {
      assert(optionName in config, { optionName })
    })
  }

  assertUsage(
    hasProp(config, 'isProduction', 'boolean'),
    '`createTelefuncCaller({ isProduction })`: argument `isProduction` should be a boolean.',
  )
  assertUsage(
    hasProp(config, 'disableCache', 'boolean'),
    '`createTelefuncCaller({ disableCache })`: argument `disableCache` should be a boolean.',
  )
  assertUsage(
    hasProp(config, 'baseUrl', 'string'),
    '`createTelefuncCaller({ baseUrl })`: argument `baseUrl` should be a string.',
  )

  if (config.isProduction) {
    if ('root' in config && config.root !== undefined) {
      assertUsage(
        hasProp(config, 'root', 'string'),
        '`createTelefuncCaller({ root })`: argument `root` should be a string.',
      )
    }
  } else {
    assertUsage(
      hasProp(config, 'root', 'string'),
      '`createTelefuncCaller({ root })`: argument `root` should be a string.',
    )

    if (hasProp(config, 'telefuncFiles')) {
      return
    }
    assertUsage(
      hasProp(config, 'viteDevServer'),
      '`createTelefuncCaller({ viteDevServer, isProduction })`: if `isProduction` is not `true`, then `viteDevServer` cannot be `undefined`.',
    )

    {
      const wrongViteDevServerValueError =
        '`createTelefuncCaller({ viteDevServer, isProduction })`: if `isProduction` is not `true`, then `viteDevServer` should be `viteDevServer = await vite.createServer(/*...*/)`.'
      const { viteDevServer } = config
      assertUsage(
        hasProp(viteDevServer, 'config') &&
          hasProp(viteDevServer.config, 'root') &&
          typeof viteDevServer.config.root === 'string',
        wrongViteDevServerValueError,
      )
      assertUsage(
        pathNormalize(viteDevServer.config.root) === pathNormalize(config.root),
        '`createTelefuncCaller({ viteDevServer, root })`: wrong `root` value, make sure that `path.normalize(root) === path.normalize(viteDevServer.root)`.',
      )

      assertUsage(
        hasProp(viteDevServer, 'config', 'object') && hasProp(viteDevServer.config, 'plugins', 'array'),
        wrongViteDevServerValueError,
      )
      assertUsage(
        (viteDevServer as any as ViteDevServer).config.plugins.find((plugin) => plugin.name.startsWith('telefunc')),
        'Telefunc Vite plugin is not installed. Make sure to add it to your `vite.config.js`.',
      )
    }
  }
}
