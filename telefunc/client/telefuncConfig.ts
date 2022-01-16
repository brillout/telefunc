import { assert, assertUsage } from '../shared/utils'

export { telefuncConfig }

/** Telefunc Client Configuration */
type ClientConfig = {
  /** The address of the server, e.g. `https://example.org/_telefunc`. */
  telefuncUrl: string
}

const configDefault: ClientConfig = {
  telefuncUrl: '/_telefunc',
}

const telefuncConfig = getConfigProxy(configDefault)

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
