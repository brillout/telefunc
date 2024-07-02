export { configUser as config }
export { getServerConfig }
export type { ConfigUser }

import { isAbsolute } from 'node:path'
import { assertUsage, hasProp, toPosixPath, isTelefuncFilePath } from '../utils'

/** Telefunc Server Configuration */
type ConfigUser = {
  /**
   * The Telefunc HTTP endpoint URL, e.g. `/api/_telefunc`.
   *
   * @default /_telefunc
   *
   * https://telefunc.com/telefuncUrl
   */
  telefuncUrl?: string
  /** See https://telefunc.com/event-based#naming-convention */
  disableNamingConvention?: boolean
  /** Your `.telefunc.js` files */
  telefuncFiles?: string[]
  /** Your project root directory, e.g. `/home/alice/code/my-app/` */
  root?: string
  /** Whether to disable ETag cache headers */
  disableEtag?: boolean
  shield?: {
    /** Whether to generate shield during development */
    dev?: boolean
  }
}
type ConfigResolved = {
  telefuncUrl: string
  root: string | null
  disableEtag: boolean
  telefuncFiles: string[] | null
  disableNamingConvention: boolean
  shield: { dev: boolean }
}

const configUser: ConfigUser = new Proxy({}, { set: validateUserConfig })

function getServerConfig(): ConfigResolved {
  return {
    disableEtag: configUser.disableEtag ?? false,
    disableNamingConvention: configUser.disableNamingConvention ?? false,
    shield: { dev: configUser.shield?.dev ?? false },
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
    })(),
  }
}

function validateUserConfig(configUserUnwrapped: ConfigUser, prop: string, val: unknown) {
  if (prop === 'root') {
    assertUsage(typeof val === 'string', 'config.root should be a string')
    assertUsage(isAbsolute(val), 'config.root should be an absolute path')
    configUserUnwrapped[prop] = val
  } else if (prop === 'telefuncUrl') {
    assertUsage(typeof val === 'string', 'config.telefuncUrl should be a string')
    assertUsage(
      val.startsWith('/'),
      `config.telefuncUrl (server-side) is '${val}' but it should start with '/' (it should be a URL pathname such as '/_telefunc'), see https://telefunc.com/telefuncUrl`,
    )
    configUserUnwrapped[prop] = val
  } else if (prop === 'telefuncFiles') {
    const wrongType = 'config.telefuncFiles should be a list of paths'
    assertUsage(Array.isArray(val), wrongType)
    val.forEach((val: unknown) => {
      assertUsage(typeof val === 'string', wrongType)
      assertUsage(isAbsolute(val), `[config.telefuncFiles] ${val} should be an absolute path`)
      assertUsage(isTelefuncFilePath(toPosixPath(val)), `[config.telefuncFiles] ${val} doesn't contain \`.telefunc.\``)
    })
    configUserUnwrapped[prop] = val
  } else if (prop === 'disableEtag') {
    assertUsage(typeof val === 'boolean', 'config.disableEtag should be a boolean')
    configUserUnwrapped[prop] = val
  } else if (prop === 'disableNamingConvention') {
    assertUsage(typeof val === 'boolean', 'config.disableNamingConvention should be a boolean')
    configUserUnwrapped[prop] = val
  } else if (prop === 'shield') {
    assertUsage(typeof val === 'object' && val !== null, 'config.shield should be a object')
    if ('dev' in val) {
      assertUsage(typeof (val as { dev: unknown }).dev === 'boolean', 'config.shield.dev should be a boolean')
    }
    configUserUnwrapped[prop] = val
  } else {
    assertUsage(false, `Unknown config.${prop}`)
  }

  return true
}
