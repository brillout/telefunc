export { resolveConfigDefaults }
export { validateConfigObject }
export type { ServerConfig }

import type { ViteDevServer } from 'vite'
import type { Telefunctions } from '../shared/types'
import { isAbsolute } from 'path'
import { assertUsage, assertWarning, hasProp, isPlainObject } from './utils'

type ServerConfig = {
  viteDevServer?: ViteDevServer
  telefuncFiles?: Record<string, Telefunctions>
  root?: string
  isProduction?: boolean
  telefuncUrl?: string
  disableEtag?: boolean
}

const configSpec = {
  isProduction: {
    validate(val: unknown) {
      assertUsage(val === true || val === false, 'The config `isProduction` should be `true` or `false`')
    },
    getDefault() {
      // If server environment is not a Node.js server, then we assume a (Cloudflare) worker environment
      if (typeof process == 'undefined' || !hasProp(process, 'env')) return true
      return process.env.NODE_ENV === 'production'
    },
  },
  root: {
    validate(val: unknown) {
      assertUsage(typeof val === 'string' && isAbsolute(val), 'The config `root` should be an absolute path')
    },
    getDefault() {
      if (typeof process == 'undefined' || !hasProp(process, 'cwd')) return null
      return process.cwd()
    },
  },
  viteDevServer: {
    validate(val: unknown) {
      assertUsage(hasProp(val, 'ssrLoadModule'), 'The config `ssrLoadModule` should be the Vite dev server')
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
        'The config `telefuncUrl` should be a string that starts with `/`',
      )
    },
    getDefault() {
      return '/_telefunc'
    },
  },
  telefuncFiles: {
    validate(_val: unknown) {
      assertWarning(false, 'The config `telefuncFiles` is experimental')
    },
    getDefault() {
      return null
    },
  },
  disableEtag: {
    validate(_val: unknown) {
      assertWarning(false, 'The config `disableEtag` is experimental')
    },
    getDefault() {
      return false
    },
  },
}

function resolveConfigDefaults(configProvidedByUser: ServerConfig) {
  return {
    viteDevServer: configProvidedByUser['viteDevServer'] ?? configSpec['viteDevServer'].getDefault(),
    telefuncFiles: configProvidedByUser['telefuncFiles'] ?? configSpec['telefuncFiles'].getDefault(),
    root: configProvidedByUser['root'] ?? configSpec['root'].getDefault(),
    isProduction: configProvidedByUser['isProduction'] ?? configSpec['isProduction'].getDefault(),
    telefuncUrl: configProvidedByUser['telefuncUrl'] ?? configSpec['telefuncUrl'].getDefault(),
    disableEtag: configProvidedByUser['disableEtag'] ?? configSpec['disableEtag'].getDefault(),
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
