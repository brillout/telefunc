import type { ViteDevServer } from 'vite'
import { normalize as pathNormalize } from 'path'
import { assert, assertUsage, hasProp, isObject, isPlainObject } from './utils'

export { assertArgs_createTelefuncCaller }
export { assertArgs_callTelefunc }

function assertArgs_callTelefunc(httpRequest: unknown, args: unknown[]) {
  assertUsage(httpRequest, '`callTelefunc(httpRequest)`: argument `httpRequest` is missing.')
  assertUsage(args.length === 1, '`callTelefunc()`: all arguments should be passed as a single argument object.')
  assertUsage(isObject(httpRequest), '`callTelefunc(httpRequest)`: argument `httpRequest` should be an object.')
  assertUsage(hasProp(httpRequest, 'url'), '`callTelefunc({ url })`: argument `url` is missing.')
  assertUsage(hasProp(httpRequest, 'url', 'string'), '`callTelefunc({ url })`: argument `url` should be a string.')
  assertUsage(hasProp(httpRequest, 'method'), '`callTelefunc({ method })`: argument `method` is missing.')
  assertUsage(
    hasProp(httpRequest, 'method', 'string'),
    '`callTelefunc({ method })`: argument `method` should be a string.',
  )
  assertUsage('body' in httpRequest, '`callTelefunc({ body })`: argument `body` is missing.')
}

function assertArgs_createTelefuncCaller(config: Record<string, unknown>, args: unknown[]): void {
  assertUsage(
    args.length === 1 && isPlainObject(args[0]),
    '`createTelefuncCaller()`: all arguments should be passed as a single argument object.',
  )

  {
    const optionList = [
      'isProduction',
      'root',
      'viteDevServer',
      'telefuncUrl',
      'telefuncFiles',
      'disableEtag',
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
    hasProp(config, 'disableEtag', 'boolean'),
    '`createTelefuncCaller({ disableEtag })`: argument `disableEtag` should be a boolean.',
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
