export { configUser as telefuncConfig }
export { resolveServerConfig }

import type { ViteDevServer } from 'vite'
import { isAbsolute } from 'path'
import { assert, assertWarning, assertUsage, hasProp, toPosixPath, isTelefuncFilePath } from '../utils'
import { globalContext } from './globalContext'

/** Telefunc Server Configuration */
type ConfigUser = {
  /** The Telefunc HTTP endpoint URL, e.g. `/api/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl?: string
  /** Your project root directory, e.g. `/home/alice/code/my-app/` */
  root?: string
  /** Wether to disable ETag cache headers */
  disableEtag?: boolean
  /** Your `.telefunc.js` files */
  telefuncFiles?: string[]
  /** Enable debug logs */
  debug?: boolean
  /** See https://telefunc.com/event-based#naming-convention */
  disableNamingConvention?: boolean
  /** @deprecated */
  viteDevServer?: ViteDevServer
}

type ConfigResolved = {
  telefuncUrl: string
  root: string | null
  disableEtag: boolean
  telefuncFiles: string[] | null
  debug: boolean
  disableNamingConvention: boolean
}

const configUser: ConfigUser = new Proxy({}, { set: validateUserConfig })

function resolveServerConfig(): ConfigResolved {
  return {
    disableEtag: configUser.disableEtag ?? false,
    disableNamingConvention: configUser.disableNamingConvention ?? false,
    telefuncUrl: configUser.telefuncUrl || '/_telefunc',
    debug:
      configUser.debug ??
      (() => {
        if (typeof process == 'undefined' || !hasProp(process, 'env')) return false
        return !!process.env.DEBUG
      })(),
    telefuncFiles: (() => {
      if (configUser.telefuncFiles) {
        return configUser.telefuncFiles.map(toPosixPath)
      }
      return null
    })(),
    root: (() => {
      if (configUser.root) {
        return toPosixPath(configUser.root)
      }
      if (typeof process == 'undefined' || !hasProp(process, 'cwd')) return null
      return toPosixPath(process.cwd())
    })()
  }
}

function validateUserConfig(configUserUnwrapped: ConfigUser, prop: string, val: unknown) {
  // @ts-ignore
  configUserUnwrapped[prop] = val

  if (prop === 'root') {
    assertUsage(typeof val === 'string' && isAbsolute(val), 'telefuncConfig.root should be an absolute path')
  } else if (prop === 'viteDevServer') {
    assertWarning(
      false,
      '`telefuncConfig.viteDevServer` is not needed anymore. Remove your `telefuncConfig.viteDevServer` configuration to get rid of this message. (Telefunc now automatically retrieves the Vite dev server.)',
      {
        onlyOnce: true,
        showStackTrace: true
      }
    )
  } else if (prop === 'telefuncUrl') {
    assertUsage(
      typeof val === 'string' && val.startsWith('/'),
      "telefuncConfig.telefuncUrl should be a string that starts with '/'"
    )
  } else if (prop === 'telefuncFiles') {
    const wrongType = '`telefuncConfig.telefuncFiles` should be a list of paths'
    assertUsage(Array.isArray(val), wrongType)
    val.forEach((val: unknown) => {
      assertUsage(typeof val === 'string', wrongType)
      assertUsage(isAbsolute(val), `[telefuncConfig.telefuncFiles] ${val} should be an absolute path`)
      assertUsage(isTelefuncFilePath(val), `[telefuncConfig.telefuncFiles] ${val} doesn't contain the \`.telefunc.\``)
    })
  } else if (prop === 'disableEtag') {
    assertUsage(typeof val === 'boolean', 'telefuncConfig.disableEtag should be a boolean')
  } else if (prop === 'debug') {
    assertUsage(typeof val === 'boolean', 'telefuncConfig.debug should be a boolean')
  } else if (prop === 'disableNamingConvention') {
    assertUsage(typeof val === 'boolean', '`telefuncConfig.disableNamingConvention` should be a boolean')
  } else {
    assertUsage(false, `Unknown telefuncConfig.${prop}`)
  }

  return true
}
