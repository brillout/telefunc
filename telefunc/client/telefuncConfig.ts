export const telefuncConfig: TelefuncClientConfig = getTelefuncConfigObject()

import { assertUsage } from './utils'

assertProxySupport()

/** Telefunc Client Configuration */
type TelefuncClientConfig = {
  /** The Telefunc HTTP endpoint URL, e.g. `https://example.org/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl: string
  httpHeaders: Record<string, string>
}

const configSpec = {
  telefuncUrl: {
    validate(val: unknown) {
      assertUsage(typeof val === 'string', '`telefuncConfig.telefuncUrl` should be a string')
      const isIpAddress = (value: string) => /^\d/.test(value)
      assertUsage(
        val.startsWith('/') || val.startsWith('http') || isIpAddress(val),
        `Setting \`telefuncConfig.telefuncUrl\` to \`${val}\` but it should be one of the following: a URL pathname (e.g. \`/_telefunc\`), a URL with origin (e.g. \`https://example.org/_telefunc\`), or an IP address (e.g. \`192.158.1.38\`).`
      )
    },
    getDefault() {
      return '/_telefunc'
    }
  },
  httpHeaders: {
    validate(val: unknown) {
      assertUsage(
        typeof val === 'object' && val !== null && Object.values(val).every((v) => typeof v === 'string'),
        '`telefuncConfig.httpHeaders` should be an object of strings'
      )
    },
    getDefault() {
      return {}
    }
  }
}

function getTelefuncConfigObject(): TelefuncClientConfig {
  const configProvidedByUser: Partial<TelefuncClientConfig> = {}
  const telefuncConfig = new Proxy(
    {
      // prettier-ignore
      get telefuncUrl()   { return configProvidedByUser['telefuncUrl']   ?? configSpec['telefuncUrl'].getDefault()   },
      // prettier-ignore
      get httpHeaders()   { return configProvidedByUser['httpHeaders']   ?? configSpec['httpHeaders'].getDefault()   }
    },
    { set }
  )
  function set(_: never, prop: string, val: unknown) {
    const option = configSpec[prop as keyof typeof configSpec]
    assertUsage(option, `Unknown \`telefuncConfig.${prop}\`.`)
    option.validate(val)
    // @ts-ignore
    configProvidedByUser[prop] = val
    return true
  }
  return telefuncConfig
}

function assertProxySupport() {
  const envSupportsProxy = typeof 'Proxy' !== 'undefined'
  assertUsage(
    envSupportsProxy,
    [
      "Your JavaScript environment doesn't seem to support Proxy.",
      'Note that all browsers and Node.js support Proxy, with the exception of Internet Explorer.',
      'If you need IE support then open a GitHub issue.'
    ].join(' ')
  )
}
