export { configUser as telefuncConfig }
export { resolveClientConfig }

import { assertUsage } from './utils'

/** Telefunc Server Configuration */
type ConfigUser = {
  /** The Telefunc HTTP endpoint URL, e.g. `https://example.org/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl?: string
  /** Additional headers sent along Telefunc HTTP requests */
  httpHeaders?: Record<string, string>
}
type ConfigResolved = {
  telefuncUrl: string
  httpHeaders: Record<string, string> | null
}

const configUser: ConfigUser = new Proxy({}, { set: validateUserConfig })

function resolveClientConfig(): ConfigResolved {
  return {
    httpHeaders: configUser.httpHeaders ?? null,
    telefuncUrl: configUser.telefuncUrl || '/_telefunc'
  }
}

function validateUserConfig(configUserUnwrapped: ConfigUser, prop: string, val: unknown) {
  if (prop === 'telefuncUrl') {
    assertUsage(typeof val === 'string', 'telefuncConfig.telefuncUrl should be a string')
    const isIpAddress = (value: string) => /^\d/.test(value)
    assertUsage(
      val.startsWith('/') || val.startsWith('http') || isIpAddress(val),
      `Setting \`telefuncConfig.telefuncUrl\` to \`${val}\` but it should be one of the following: a URL pathname (e.g. \`/_telefunc\`), a URL with origin (e.g. \`https://example.org/_telefunc\`), or an IP address (e.g. \`192.158.1.38\`).`
    )
    configUserUnwrapped[prop] = val
  } else if (prop === 'httpHeaders') {
    assertUsage(
      typeof val === 'object' && val !== null && Object.values(val).every((v) => typeof v === 'string'),
      '`telefuncConfig.httpHeaders` should be an object of strings'
    )
    configUserUnwrapped[prop] = val as Record<string, string>
  } else {
    assertUsage(false, `Unknown telefuncConfig.${prop}`)
  }

  return true
}
