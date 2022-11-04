export { configUser as telefuncConfig }
export { resolveServerConfig }
export type { ConfigUser }

import { isAbsolute } from 'path'
import { assertUsage, hasProp, toPosixPath, isTelefuncFilePath } from '../utils'

/** Telefunc Server Configuration */
type ConfigUser = {
  /** The Telefunc HTTP endpoint URL, e.g. `/api/_telefunc`. Default: `/_telefunc`. */
  telefuncUrl?: string
  /** See https://telefunc.com/event-based#naming-convention */
  disableNamingConvention?: boolean
  /** Your `.telefunc.js` files */
  telefuncFiles?: string[]
  /** Your project root directory, e.g. `/home/alice/code/my-app/` */
  root?: string
  /** Wether to disable ETag cache headers */
  disableEtag?: boolean
}
type ConfigResolved = {
  telefuncUrl: string
  root: string | null
  disableEtag: boolean
  telefuncFiles: string[] | null
  disableNamingConvention: boolean
}

const configUser: ConfigUser = new Proxy({}, { set: validateUserConfig })

function resolveServerConfig(): ConfigResolved {
  return {
    disableEtag: configUser.disableEtag ?? false,
    disableNamingConvention: configUser.disableNamingConvention ?? false,
    telefuncUrl: configUser.telefuncUrl || '/_telefunc',
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
  if (prop === 'root') {
    assertUsage(typeof val === 'string', 'telefuncConfig.root should be a string')
    assertUsage(isAbsolute(val), 'telefuncConfig.root should be an absolute path')
    configUserUnwrapped[prop] = val
  } else if (prop === 'telefuncUrl') {
    assertUsage(typeof val === 'string', 'telefuncConfig.telefuncUrl should be a string')
    assertUsage(val.startsWith('/'), "telefuncConfig.telefuncUrl should start with '/'")
    configUserUnwrapped[prop] = val
  } else if (prop === 'telefuncFiles') {
    const wrongType = '`telefuncConfig.telefuncFiles` should be a list of paths'
    assertUsage(Array.isArray(val), wrongType)
    val.forEach((val: unknown) => {
      assertUsage(typeof val === 'string', wrongType)
      assertUsage(isAbsolute(val), `[telefuncConfig.telefuncFiles] ${val} should be an absolute path`)
      assertUsage(isTelefuncFilePath(val), `[telefuncConfig.telefuncFiles] ${val} doesn't contain \`.telefunc.\``)
    })
    configUserUnwrapped[prop] = val
  } else if (prop === 'disableEtag') {
    assertUsage(typeof val === 'boolean', 'telefuncConfig.disableEtag should be a boolean')
    configUserUnwrapped[prop] = val
  } else if (prop === 'disableNamingConvention') {
    assertUsage(typeof val === 'boolean', '`telefuncConfig.disableNamingConvention` should be a boolean')
    configUserUnwrapped[prop] = val
  } else {
    assertUsage(false, `Unknown telefuncConfig.${prop}`)
  }

  return true
}
