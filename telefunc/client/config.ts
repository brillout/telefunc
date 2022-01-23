export const config: ClientConfig = getConfigObject()

import { assertUsage } from './utils'

assertProxySupport()

/** Telefunc Client Configuration */
type ClientConfig = {
  /** The Telefunc HTTP endpoint URL, e.g. `https://example.org/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl: string
}

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

function getConfigObject(): ClientConfig {
  const configProvidedByUser: Partial<ClientConfig> = {}
  const config = new Proxy(
    {
      // prettier-ignore
      get telefuncUrl()   { return configProvidedByUser['telefuncUrl']   ?? configSpec['telefuncUrl'].getDefault()   },
    },
    { set },
  )
  function set(_: never, prop: string, val: unknown) {
    const option = configSpec[prop as keyof typeof configSpec]
    assertUsage(option, `Unknown config \`${prop}\`.`)
    option.validate(val)
    // @ts-ignore
    configProvidedByUser[prop] = val
    return true
  }
  return config
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
