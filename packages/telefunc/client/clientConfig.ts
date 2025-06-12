export { configUser as config }
export { resolveClientConfig }

import { assertUsage } from './utils.js'

/** Telefunc Client Configuration */
type ConfigUser = {
  /**
   * The Telefunc HTTP endpoint URL, for example `https://example.org/_telefunc`.
   *
   * @default /_telefunc
   *
   * https://telefunc.com/telefuncUrl
   */
  telefuncUrl?: string
  /** Additional headers sent along Telefunc HTTP requests */
  httpHeaders?: Record<string, string>
  /** Custom fetch implementations */
  fetch?: typeof globalThis.fetch
}
type ConfigResolved = {
  telefuncUrl: string
  httpHeaders: Record<string, string> | null
  fetch: typeof globalThis.fetch | null
}

const configUser: ConfigUser = new Proxy({}, { set: validateUserConfig })

function resolveClientConfig(): ConfigResolved {
  return {
    httpHeaders: configUser.httpHeaders ?? null,
    telefuncUrl: configUser.telefuncUrl || '/_telefunc',
    fetch: configUser.fetch ?? null,
  }
}

function validateUserConfig(configUserUnwrapped: ConfigUser, prop: string, val: unknown) {
  if (prop === 'telefuncUrl') {
    assertUsage(typeof val === 'string', 'config.telefuncUrl should be a string')
    const isIpAddress = (value: string) => /^\d/.test(value)
    assertUsage(
      val.startsWith('/') || val.startsWith('http') || isIpAddress(val),
      `config.telefuncUrl (client-side) is '${val}' but it should be one of the following: a URL pathname (such as '/_telefunc'), a URL with origin (such as 'https://example.org/_telefunc'), or an IP address (such as '192.158.1.38') — see https://telefunc.com/telefuncUrl`,
    )
    configUserUnwrapped[prop] = val
  } else if (prop === 'httpHeaders') {
    assertUsage(
      typeof val === 'object' && val !== null && Object.values(val).every((v) => typeof v === 'string'),
      '`config.httpHeaders` should be an object of strings',
    )
    configUserUnwrapped[prop] = val as Record<string, string>
  } else if (prop === 'fetch') {
    assertUsage(typeof val === 'function', '`config.fetch` should be a function')
    configUserUnwrapped[prop] = val as typeof globalThis.fetch
  } else {
    assertUsage(false, `Unknown config.${prop}`)
  }

  return true
}
