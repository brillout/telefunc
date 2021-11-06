import { assert, assertUsage, hasProp, isPlainObject } from './utils'
import type { ViteDevServer } from 'vite'
import { callTelefunc } from './callTelefunc'
import { RequestProps, Config } from './types'
import { normalize as pathNormalize } from 'path'

let telefuncConfig: Config | null = null

export { createTelefuncCaller }
export { getTelefuncConfig }

function getTelefuncConfig(): Config | null {
  return telefuncConfig
}

function createTelefuncCaller({
  viteDevServer,
  root,
  isProduction,
  baseUrl = '/',
  urlPath = '/_telefunc',
  disableCache = false,
}: {
  viteDevServer?: ViteDevServer
  root?: string
  isProduction: boolean
  /** URL at which Telefunc HTTP requests are served (default: `_telefunc`). */
  urlPath?: string
  /** Whether Telefunc generates HTTP ETag headers. */
  disableCache?: boolean
  /** Base URL (default: `/`). */
  baseUrl?: string
}) {
  assertUsage(telefuncConfig===null,
    '`createTelefuncCaller()`: You are calling `createTelefuncCaller()` a second time which is forbidden; it should be called only once.')
  telefuncConfig = { viteDevServer, root, isProduction, baseUrl, disableCache, urlPath }
  assertArgs(telefuncConfig, Array.from(arguments))

  /**
   * Get the HTTP response of a telefunction call.
   * @param requestProps.url HTTP request URL
   * @param requestProps.method HTTP request method
   * @param requestProps.body HTTP request body
   * @param context The context object
   * @returns HTTP response
   */
  return async function (requestProps: RequestProps) {
    assertUsage(
      arguments.length === 1,
      '`callTelefunc(/* ... */, context)` is deprecated. Use `provideContext(context)` instead, see https://telefunc.com/provideContext',
    )
    assert(telefuncConfig)
    return callTelefunc(requestProps, telefuncConfig, Array.from(arguments))
  }
}

function assertArgs(config: unknown, args: unknown[]): void {
  assertUsage(
    args.length === 1,
    '`createTelefuncCaller()`: all arguments should be passed as a single argument object.',
  )
  assertUsage(
    isPlainObject(config),
    '`createTelefuncCaller(argumentObject)`: all arguments should be passed as a single argument object, i.e. `typeof argumentObject === "object"`.',
  )
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
  const _isProduction = config.isProduction
  if (_isProduction) {
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
