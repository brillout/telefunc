import type { ViteDevServer } from 'vite'
import { normalize as pathNormalize } from 'path'
import { assert, assertUsage, hasProp, isPlainObject } from './utils'
import { RequestProps, Config, Telefunctions } from './types'
import { installAsyncMode } from './getContext'
import { callTelefunc } from './callTelefunc'

let telefuncConfig: Config | null = null

export { createTelefuncCaller }
export { getTelefuncConfig }

function getTelefuncConfig(): Config | null {
  return telefuncConfig
}

async function createTelefuncCaller({
  viteDevServer,
  telefuncFiles,
  root,
  isProduction,
  baseUrl = '/',
  telefuncUrl = '/_telefunc',
  disableCache = false,
}: {
  viteDevServer?: ViteDevServer
  telefuncFiles?: Record<string, Telefunctions>
  root?: string
  isProduction: boolean
  /** URL at which Telefunc HTTP requests are served (default: `_telefunc`). */
  telefuncUrl?: string
  /** Whether Telefunc generates HTTP ETag headers. */
  disableCache?: boolean
  /** Base URL (default: `/`). */
  baseUrl?: string
}) {
  assertUsage(
    telefuncConfig === null,
    '`createTelefuncCaller()`: You are calling `createTelefuncCaller()` a second time which is forbidden; it should be called only once.',
  )
  telefuncConfig = { viteDevServer, root, isProduction, baseUrl, disableCache, telefuncUrl, telefuncFiles }
  assertArgs(telefuncConfig, Array.from(arguments))

  await installAsyncMode()

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
