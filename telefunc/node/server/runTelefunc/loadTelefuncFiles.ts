export { loadTelefuncFiles }

import type { TelefuncFiles } from '../types'
import { assertUsage, assert, hasProp, isWebpack, isVikeApp } from '../../utils'
import { loadTelefuncFilesWithVite } from '../../vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithRegistration } from './loadTelefuncFilesWithRegistration'
import { loadTelefuncFilesFromConfig } from './loadTelefuncFilesFromConfig'
import pc from '@brillout/picocolors'

async function loadTelefuncFiles(runContext: {
  appRootDir: string | null
  telefuncFilesManuallyProvidedByUser: string[] | null
  telefuncFilePath: string
}): Promise<{ telefuncFilesLoaded: TelefuncFiles; telefuncFilesAll: string[] }> {
  // Handles:
  // - The user manually provides the list of `.telefunc.js` files with `config.telefuncFiles`
  {
    if (runContext.telefuncFilesManuallyProvidedByUser) {
      assert(hasProp(runContext, 'telefuncFilesManuallyProvidedByUser', 'string[]')) // Help TS narrow `runContext`
      const { telefuncFilesLoaded, telefuncFilesAll } = await loadTelefuncFilesFromConfig(runContext)
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr('manually provided by user'))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  // Handles:
  // - Next.js
  // - Nuxt 2
  // - In production, `.telefunc.js` files crawled by Vite together with @brillout/vite-plugin-server-entry
  {
    const telefuncFilesLoaded = loadTelefuncFilesWithRegistration()
    if (telefuncFilesLoaded) {
      const telefuncFilesAll = Object.keys(telefuncFilesLoaded)
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr('automatic registration'))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  // Handles:
  // - In development, `.telefunc.js` files crawled by Vite
  if (!isWebpack() || isVikeApp()) {
    const { telefuncFilesLoaded, viteProvider, telefuncFilesAll } = await loadTelefuncFilesWithVite(runContext)
    assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr(viteProvider))
    return { telefuncFilesLoaded, telefuncFilesAll }
  }

  assertUsage(false, "You don't seem to be using Telefunc with a supported stack. Reach out on GitHub.")
}

function getNothingFoundErr(retrievalMethod: string) {
  return `No ${pc.code('.telefunc.{js|ts|...}')} file found. Did you create one? (Retrieval method: ${retrievalMethod}.)`
}
