export { telefuncConfig }
export { resolveConfigDefaults }

import { assertUsage, isPlainObject } from './utils'

assertProxySupport()

/** Telefunc Client Configuration */
type ClientConfig = {
  /** The Telefunc HTTP endpoint URL, e.g. `https://example.org/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl?: string
}

const telefuncConfig: ClientConfig = getConfigObject()

const configSpec = {
  telefuncUrl: {
    validate(val: unknown) {
      assertUsage(typeof val === 'string', 'The config `telefuncUrl` should be a string')
      const isIpAddress = (value: string) => /^\d/.test(value)
      assertUsage(
        val.startsWith('/') || val.startsWith('http') || isIpAddress(val),
        `You set the config \`telefuncUrl\` to \`${val}\` but it should be one of the following: a URL pathname (e.g. \`/_telefunc\`), a URL with origin (e.g. \`https://example.org/_telefunc\`), or an IP address (e.g. \`192.158.1.38\`).`,
      )
    },
    getDefault() {
      return '/_telefunc'
    },
  },
}

function getConfigObject() {
  const config: Record<string, unknown> = {}
  return new Proxy(config, { set })
  function set(_: never, prop: string, val: unknown) {
    config[prop] = val
    validateConfigObject(config)
    return true
  }
}

function resolveConfigDefaults(configProvidedByUser: ClientConfig) {
  return {
    telefuncUrl: configProvidedByUser['telefuncUrl'] ?? configSpec['telefuncUrl'].getDefault(),
  }
}

function validateConfigObject(config: unknown) {
  assertUsage(isPlainObject(config), 'The config object should be a plain JavaScript object')
  Object.entries(config).forEach(([prop, val]) => {
    const option = configSpec[prop as keyof typeof configSpec] ?? undefined
    assertUsage(option, `Unknown config \`${prop}\`.`)
    option.validate(val)
  })
}

function assertProxySupport() {
  const envSupportsProxy = typeof 'Proxy' !== 'undefined'
  assertUsage(
    envSupportsProxy,
    [
      "Your JavaScript environment doesn't seem to support Proxy.",
      'Note that all browsers and Node.js support Proxy, with the exception of Internet Explorer.',
      'If you need IE support then open a GitHub issue.',
    ].join(' '),
  )
}
