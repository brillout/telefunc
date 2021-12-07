import { stringify } from '@brillout/json-s'
import { makeHttpRequest } from './makeHttpRequest'
import { assert, assertUsage } from '../shared/utils'
import type { TelefunctionName, TelefunctionResult, BodyParsed, TelefunctionArgs, Telefunctions } from '../shared/types'

export { TelefuncClient }

// We need ES6 `Proxy`
assertProxySupport()

/** Telefunc Client Configuration */
type UserConfig = {
  /** The address of the server, e.g. `https://api.example.org/`. */
  telefuncUrl: string
  /** Make API HTTP request URLs short: always use the the HTTP request body to transport telefunction arguments (instead of serializing telefunction arguments into the HTTP request URL). */
  shortUrl: boolean
}
type ConfigName = keyof UserConfig

// Http request
export type HttpRequestUrl = string & { _brand?: 'HttpRequestUrl' }
export type HttpRequestBody = string & { _brand?: 'HttpRequestBody' }

// Telefunc server instance
// For when using the Telefunc client server-side
type TelefuncServerInstance = {
  __directCall: (
    telefunctionName: TelefunctionName,
    telefunctionArgs: TelefunctionArgs,
  ) => // Doesn't have to be a promise; a telefunction can return its value synchronously
  Promise<TelefunctionResult> | TelefunctionResult
}

const configDefault: UserConfig = {
  telefuncUrl: '/_telefunc',
  shortUrl: false,
}

class TelefuncClient {
  config: UserConfig = getConfigProxy(configDefault)
  telefunctions: Telefunctions = getTelefunctionsProxy(this.config as UserConfig)
}

function callTelefunction(
  telefunctionName: TelefunctionName,
  telefunctionArgs: TelefunctionArgs,
  config: UserConfig,
): TelefunctionResult {
  telefunctionArgs = telefunctionArgs || []

  const telefuncServerInstance: TelefuncServerInstance = getTelefuncServerInstance()

  // Usage in Node.js [inter-process]
  // Inter-process: the Telefunc client and the Telefunc server are loaded in the same Node.js process.
  if (telefuncServerInstance) {
    assert(isNodejs())
    return callTelefunctionDirectly(telefunctionName, telefunctionArgs, telefuncServerInstance)
  }

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

function getTelefuncServerInstance() {
  const telefuncServer__serverSideUsage =
    typeof global !== 'undefined' && global && (global as any).__INTERNAL_telefuncServer_nodejs
  const telefuncServerInstance = telefuncServer__serverSideUsage || null

  // The purpose of providing `telefuncServerInstance` to `telefuncClient` is for server-side client usage.
  // It doesn't make sense to provide `telefuncServerInstance` on the browser-side.
  assert(telefuncServerInstance === null || isNodejs())

  // The whole purpose of providing `telefuncServerInstance` is to be able to call `telefuncServerInstance.__directCall`
  // Bypassing making an unecessary HTTP request.
  assert(telefuncServerInstance === null || telefuncServerInstance.__directCall)

  return telefuncServerInstance
}

async function callTelefunctionDirectly(
  telefunctionName: TelefunctionName,
  telefunctionArgs: TelefunctionArgs,
  telefuncServerInstance: TelefuncServerInstance,
): Promise<TelefunctionResult> {
  return telefuncServerInstance.__directCall(telefunctionName, telefunctionArgs)
}

function callTelefunctionOverHttp(
  telefunctionName: TelefunctionName,
  telefunctionArgs: TelefunctionArgs,
  config: UserConfig,
): TelefunctionResult {
  assert(telefunctionArgs.length >= 0)

  const bodyParsed: BodyParsed = {
    name: telefunctionName,
    args: telefunctionArgs,
  }
  assert(typeof telefunctionName === 'string')
  assert(Array.isArray(telefunctionArgs))
  let body: HttpRequestBody | undefined
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
  assert(isBrowser() || !url.startsWith('/'))
  return makeHttpRequest(url, body, telefunctionName)
}

function getTelefunctionsProxy(config: UserConfig): Telefunctions {
  const emptyObject: Telefunctions = {}

  const telefunctionsProxy: Telefunctions = new Proxy(emptyObject, {
    get,
    set: forbidManipulation,
  }) as Telefunctions

  return telefunctionsProxy

  function get({}, telefunctionName: TelefunctionName) {
    // Return native methods
    if (telefunctionName in emptyObject) {
      return emptyObject[telefunctionName]
    }

    // We assume `telefunctionName` to always be a string
    if (typeof telefunctionName !== 'string') {
      return undefined
    }

    // TODO handle this more properly
    // Ideally: throw a usage error
    // But: `inspect` seems to be called automatically (by Node.js if I remember correclty)
    // Hence I'm not sure how to handle this. Maybe by checking if the caller is Node.js or the user.
    if (telefunctionName === 'inspect') {
      return undefined
    }

    if (typeof telefunctionName !== 'string') {
      return undefined
    }

    return function (this: unknown, ...telefunctionArgs: TelefunctionArgs) {
      assertUsage(!isBinded(this, telefunctionsProxy), 'Binding the context object with `bind()` is deprecated.')

      return callTelefunction(telefunctionName, telefunctionArgs, config)
    }
  }

  function forbidManipulation() {
    assertUsage(
      false,
      [
        'You cannot add or modify telefunctions with the Telefunc Client `telefunc/client`.',
        'Instead, define your telefunctions with the Telefunc Server `telefunc/server`.',
      ].join(' '),
    )

    // Make TS happy
    return false
  }
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

function getConfigProxy(configDefaults: UserConfig): UserConfig {
  const configObject: UserConfig = { ...configDefaults }
  const configProxy: UserConfig = new Proxy(configObject, {
    set: validateConfig,
  })
  return configProxy

  function validateConfig(_: UserConfig, configName: ConfigName, configValue: unknown) {
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
    telefuncUrl.startsWith('/') ||
        telefuncUrl.startsWith('http') ||
          isIpAddress(telefuncUrl),
    `You set \`config.telefuncUrl==${telefuncUrl}\` but it should be one of the following: a URL pathname (e.g. \`/_telefunc\`), a URL with origin (e.g. \`https://example.org/_telefunc\`), or a IP address (e.g. \`192.158.1.38\`).`,
  )
}

function isIpAddress(value: string) {
  return /^\d/.test(value)
}

function isBinded(that: unknown, defaultBind: unknown): boolean {
  // Old webpack version: `this===undefined`
  // New webpack version: `this===global`
  // Parcel: `this===window`
  // Node.js: `this===global`, or `this===undefined` (https://stackoverflow.com/questions/22770299/meaning-of-this-in-node-js-modules-and-functions)
  // Chrome (without bundler): `this===window`

  assertUsage(
    (function (this: unknown) {
      return notBinded(this)
    })() === true,
    'You seem to be using `telefunc/client` with an unknown environment/bundler; the following environemnts/bundlers are supported: webpack, Parcel, and Node.js. Open a new issue at https://github.com/telefunc/telefunc/issues/new for adding support for your environemnt/bundler.',
  )

  return !notBinded(that, defaultBind)

  function notBinded(that: unknown, defaultBind?: unknown) {
    return (
      that === undefined ||
      (defaultBind && that === defaultBind) ||
      (typeof window !== 'undefined' && that === window) ||
      (typeof global !== 'undefined' && that === global)
    )
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      __INTERNAL_telefuncServer_nodejs: any
    }
  }
}
