export const serverConfig = getTelefuncConfigObject()

import type { ViteDevServer } from 'vite'
import { isAbsolute } from 'path'
import { assert, assertInfo, assertUsage, hasProp } from '../utils'
import { globalContext } from './globalContext'

/** Telefunc Server Configuration */
type TelefuncServerConfig = {
  /** The Telefunc HTTP endpoint URL, e.g. `/api/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl: string
  root: string | null
  viteDevServer: ViteDevServer | null
  disableEtag: boolean
  telefuncFiles: string[] | null
  debug: boolean
  disableNamingConvention: boolean
}

const configSpec = {
  root: {
    validate(val: unknown) {
      assertUsage(typeof val === 'string' && isAbsolute(val), '`telefuncConfig.root` should be an absolute path')
    },
    getDefault() {
      if (typeof process == 'undefined' || !hasProp(process, 'cwd')) return null
      return process.cwd()
    }
  },
  viteDevServer: {
    validate(val: unknown) {
      assertInfo(
        false,
        '`telefuncConfig.viteDevServer` is not needed anymore. Remove your `telefuncConfig.viteDevServer` configuration to get rid of this message. (Telefunc now automatically retrieves the Vite dev server.)'
      )
      assertUsage(hasProp(val, 'ssrLoadModule'), '`telefuncConfig.ssrLoadModule` should be the Vite dev server')
      assertUsage(
        (val as any as ViteDevServer).config.plugins.find((plugin) => plugin.name.startsWith('telefunc')),
        'Telefunc Vite plugin not installed. Make sure to add Telefunc to your `vite.config.js`.'
      )
      assert(val === globalContext.viteDevServer, '`viteDevServer` mismatch.')
    },
    getDefault() {
      return null
    }
  },
  telefuncUrl: {
    validate(val: unknown) {
      assertUsage(
        typeof val === 'string' && val.startsWith('/'),
        '`telefuncConfig.telefuncUrl` should be a string that starts with `/`'
      )
    },
    getDefault() {
      return '/_telefunc'
    }
  },
  telefuncFiles: {
    validate(val: unknown) {
      assertUsage(
        Array.isArray(val) && val.every((v) => typeof v === 'string' && isAbsolute(v)),
        '`telefuncConfig.telefuncFiles` should be a list of absolute paths'
      )
    },
    getDefault() {
      return null
    }
  },
  disableEtag: {
    validate(_val: unknown) {},
    getDefault() {
      return false
    }
  },
  debug: {
    validate(val: unknown) {
      assertUsage(typeof val === 'boolean', '`telefuncConfig.debug` should be a boolean')
    },
    getDefault() {
      if (typeof process == 'undefined' || !hasProp(process, 'env')) return false
      return !!process.env.DEBUG
    }
  },
  disableNamingConvention: {
    validate(val: unknown) {
      assertUsage(typeof val === 'boolean', '`telefuncConfig.disableNamingConvention` should be a boolean')
    },
    getDefault() {
      return false
    }
  }
}

function getTelefuncConfigObject(): TelefuncServerConfig {
  const configProvidedByUser: Partial<TelefuncServerConfig> = {}
  const serverConfig: TelefuncServerConfig = new Proxy(
    {
      // prettier-ignore
      get viteDevServer()           { return configProvidedByUser.viteDevServer           ?? configSpec.viteDevServer.getDefault()           },
      // prettier-ignore
      get telefuncFiles()           { return configProvidedByUser.telefuncFiles           ?? configSpec.telefuncFiles.getDefault()           },
      // prettier-ignore
      get root()                    { return configProvidedByUser.root                    ?? configSpec.root.getDefault()                    },
      // prettier-ignore
      get telefuncUrl()             { return configProvidedByUser.telefuncUrl             ?? configSpec.telefuncUrl.getDefault()             },
      // prettier-ignore
      get disableEtag()             { return configProvidedByUser.disableEtag             ?? configSpec.disableEtag.getDefault()             },
      // prettier-ignore
      get debug()                   { return configProvidedByUser.debug                   ?? configSpec.debug.getDefault()                   },
      // prettier-ignore
      get disableNamingConvention() { return configProvidedByUser.disableNamingConvention ?? configSpec.disableNamingConvention.getDefault() }
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
  return serverConfig
}
