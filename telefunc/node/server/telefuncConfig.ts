export const telefuncConfig = getTelefuncConfigObject()

import type { ViteDevServer } from 'vite'
import type { Telefunction } from './types'
import { isAbsolute } from 'path'
import { assertUsage, assertWarning, hasProp } from '../utils'

/** Telefunc Server Configuration */
type TelefuncServerConfig = {
  /** The Telefunc HTTP endpoint URL, e.g. `/api/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl: string
  root: string | null
  isProduction: boolean
  viteDevServer: ViteDevServer | null
  disableEtag: boolean
  telefuncFiles: Record<string, Record<string, Telefunction>> | null
}

const configSpec = {
  isProduction: {
    validate(val: unknown) {
      assertUsage(val === true || val === false, '`telefuncConfig.isProduction` should be `true` or `false`')
    },
    getDefault() {
      // If server environment is not a Node.js server, then we assume a (Cloudflare) worker environment
      if (typeof process == 'undefined' || !hasProp(process, 'env')) return true
      return process.env.NODE_ENV === 'production'
    },
  },
  root: {
    validate(val: unknown) {
      assertUsage(typeof val === 'string' && isAbsolute(val), '`telefuncConfig.root` should be an absolute path')
    },
    getDefault() {
      if (typeof process == 'undefined' || !hasProp(process, 'cwd')) return null
      return process.cwd()
    },
  },
  viteDevServer: {
    validate(val: unknown) {
      assertUsage(hasProp(val, 'ssrLoadModule'), '`telefuncConfig.ssrLoadModule` should be the Vite dev server')
      assertUsage(
        (val as any as ViteDevServer).config.plugins.find((plugin) => plugin.name.startsWith('telefunc')),
        'Telefunc Vite plugin not installed. Make sure to add Telefunc to your `vite.config.js`.',
      )
    },
    getDefault() {
      return null
    },
  },
  telefuncUrl: {
    validate(val: unknown) {
      assertUsage(
        typeof val === 'string' && val.startsWith('/'),
        '`telefuncConfig.telefuncUrl` should be a string that starts with `/`',
      )
    },
    getDefault() {
      return '/_telefunc'
    },
  },
  telefuncFiles: {
    validate(_val: unknown) {
      assertWarning(false, '`telefuncConfig.telefuncFiles` is experimental')
    },
    getDefault() {
      return null
    },
  },
  disableEtag: {
    validate(_val: unknown) {
      assertWarning(false, '`telefuncConfig.disableEtag` is experimental')
    },
    getDefault() {
      return false
    },
  },
}

function getTelefuncConfigObject(): TelefuncServerConfig {
  const configProvidedByUser: Partial<TelefuncServerConfig> = {}
  const telefuncConfig = new Proxy(
    {
      // prettier-ignore
      get viteDevServer() { return configProvidedByUser['viteDevServer'] ?? configSpec['viteDevServer'].getDefault() },
      // prettier-ignore
      get telefuncFiles() { return configProvidedByUser['telefuncFiles'] ?? configSpec['telefuncFiles'].getDefault() },
      // prettier-ignore
      get root()          { return configProvidedByUser['root']          ?? configSpec['root'].getDefault()          },
      // prettier-ignore
      get isProduction()  { return configProvidedByUser['isProduction']  ?? configSpec['isProduction'].getDefault()  },
      // prettier-ignore
      get telefuncUrl()   { return configProvidedByUser['telefuncUrl']   ?? configSpec['telefuncUrl'].getDefault()   },
      // prettier-ignore
      get disableEtag()   { return configProvidedByUser['disableEtag']   ?? configSpec['disableEtag'].getDefault()   },
    },
    { set },
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
