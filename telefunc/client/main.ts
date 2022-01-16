import { stringify } from '@brillout/json-s'
import { makeHttpRequest } from './makeHttpRequest'
import { assert, assertUsage } from '../shared/utils'
import { resolveConfigDefaults, telefuncConfig } from './telefuncConfig'

export { __internal_fetchTelefunc }

function __internal_fetchTelefunc(
  telefuncFilePath: string,
  exportName: string,
  telefunctionArgs: unknown[],
): Promise<unknown> {
  const telefunctionName = `${telefuncFilePath}:${exportName}`

  // Usage in the browser
  // Usage in Node.js [cross-process]
  // Cross-process: the Telefunc client and the Telefunc server are loaded in different Node.js processes.

  // Server URL is required for cross-process usage
  assertUsage(
    telefuncConfig.telefuncUrl || isBrowser(),
    '`config.telefuncUrl` missing. You are using the Telefunc client in Node.js, and the Telefunc client is loaded in a different Node.js process than the Node.js process that loaded the Telefunc server; the `config.telefuncUrl` configuration is required.',
  )

  return callTelefunctionOverHttp(telefunctionName, telefunctionArgs, resolveConfigDefaults(telefuncConfig))
}

function callTelefunctionOverHttp(
  telefunctionName: string,
  telefunctionArgs: unknown[],
  telefuncConfig: { telefuncUrl: string },
): Promise<unknown> {
  assert(telefunctionArgs.length >= 0)

  const bodyParsed = {
    name: telefunctionName,
    args: telefunctionArgs,
  }
  assert(typeof telefunctionName === 'string')
  assert(Array.isArray(telefunctionArgs))
  let body: string
  try {
    body = stringify(bodyParsed)
  } catch (err_) {
    assertUsage(
      false,
      [
        `Couldn't serialize arguments for telefunction \`${telefunctionName}\`.`,
        `Make sure all arguments passed to \`${telefunctionName}()\``,
        'are only of the following types:',
        '`Object`, `string`, `number`, `Date`, `null`, `undefined`, `Inifinity`, `NaN`, `RegExp`.',
      ].join(' '),
    )
  }
  assert(body)

  const url = telefuncConfig.telefuncUrl
  assert(isBrowser() || !url.startsWith('/')) // TODO proper error message
  return makeHttpRequest(url, body, telefunctionName)
}

function __nodeTest() {
  const nodeVersion = typeof process !== 'undefined' && process && process.versions && process.versions.node
  return !!nodeVersion
}
function isBrowser() {
  const itIs = __browserTest()
  assert(itIs === !__nodeTest())
  return itIs
}
function __browserTest() {
  return typeof window !== 'undefined'
}
