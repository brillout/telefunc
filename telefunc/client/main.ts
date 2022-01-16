import { stringify } from '@brillout/json-s'
import { makeHttpRequest } from './makeHttpRequest'
import { assert, assertUsage } from '../shared/utils'

const configDefault: ClientConfig = {
  telefuncUrl: '/_telefunc',
}
export const config = getConfigProxy(configDefault)
export { __internal_fetchTelefunc }

// We need ES6 `Proxy`
assertProxySupport()

/** Telefunc Client Configuration */
type ClientConfig = {
  /** The address of the server, e.g. `https://example.org/_telefunc`. */
  telefuncUrl: string
}

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
    config.telefuncUrl || isBrowser(),
    '`config.telefuncUrl` missing. You are using the Telefunc client in Node.js, and the Telefunc client is loaded in a different Node.js process than the Node.js process that loaded the Telefunc server; the `config.telefuncUrl` configuration is required.',
  )

  return callTelefunctionOverHttp(telefunctionName, telefunctionArgs, config)
}

function callTelefunctionOverHttp(
  telefunctionName: string,
  telefunctionArgs: unknown[],
  config: ClientConfig,
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

  const url = config.telefuncUrl
  assert(isBrowser() || !url.startsWith('/')) // TODO proper error message
  return makeHttpRequest(url, body, telefunctionName)
}

function isNodejs() {
  const itIs = __nodeTest()
  assert(itIs === !__browserTest())
  return itIs
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

function assertProxySupport() {
  assertUsage(
    envSupportsProxy(),
    [
      "Your JavaScript environment doesn't seem to support Proxy.",
      'Note that all browsers and Node.js support Proxy, with the exception of Internet Explorer.',
      'If you need IE support then open a GitHub issue.',
    ].join(' '),
  )
}
function envSupportsProxy() {
  return typeof 'Proxy' !== 'undefined'
}

function getConfigProxy(configDefaults: ClientConfig): ClientConfig {
  const configObject: ClientConfig = { ...configDefaults }
  const configProxy: ClientConfig = new Proxy(configObject, {
    set: validateConfig,
  })
  return configProxy

  function validateConfig(_: ClientConfig, configName: keyof ClientConfig, configValue: unknown) {
    assertUsage(configName in configDefaults, `[telefunc/client] Unknown config \`${configName}\`.`)

    {
      const configDefault = configDefaults[configName]
      const configType = typeof configDefault
      assertUsage(
        typeof configValue === configType,
        `[telefunc/client] Config \`telefuncUrl\` should be a ${configType}.`,
      )
    }

    if (configName === 'telefuncUrl') {
      const telefuncUrl = configValue
      assert(typeof telefuncUrl === 'string')
      validateTelefuncUrl(telefuncUrl)
    }

    configObject[configName] = configValue as never
    return true
  }
}
function validateTelefuncUrl(telefuncUrl: string) {
  assertUsage(
    telefuncUrl.startsWith('/') || telefuncUrl.startsWith('http') || isIpAddress(telefuncUrl),
    `You set \`config.telefuncUrl==${telefuncUrl}\` but it should be one of the following: a URL pathname (e.g. \`/_telefunc\`), a URL with origin (e.g. \`https://example.org/_telefunc\`), or a IP address (e.g. \`192.158.1.38\`).`,
  )
}

function isIpAddress(value: string) {
  return /^\d/.test(value)
}

declare global {
  namespace NodeJS {
    interface Global {
      __INTERNAL_telefuncServer_nodejs: any
    }
  }
}
