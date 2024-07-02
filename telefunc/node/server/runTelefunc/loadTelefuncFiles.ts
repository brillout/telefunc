export { loadTelefuncFiles }

import { assert, assertUsage, hasProp, isVikeApp, isWebpack } from '../../utils'
import { loadTelefuncFilesWithVite } from '../../vite/loadTelefuncFilesWithVite'
import type { TelefuncFiles } from '../types'
import { loadTelefuncFilesFromConfig } from './loadTelefuncFilesFromConfig'
import { loadTelefuncFilesWithRegistration } from './loadTelefuncFilesWithRegistration'

async function loadTelefuncFiles(runContext: {
  appRootDir: string | null
  telefuncFilesManuallyProvidedByUser: string[] | null
  telefuncFilePath: string
}): Promise<{ telefuncFilesLoaded: TelefuncFiles; telefuncFilesAll: string[] }> {
  // Handles:
  // - When the user provides the telefunc file paths with `config.telefuncFiles`
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
  // - Vite with `importBuild.js`
  {
    const telefuncFilesLoaded = loadTelefuncFilesWithRegistration()
    if (telefuncFilesLoaded) {
      const telefuncFilesAll = Object.keys(telefuncFilesLoaded)
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr('automatic registration'))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  // Handles:
  // - Vite
  if (!isWebpack() || isVikeApp()) {
    const { telefuncFilesLoaded, viteProvider, telefuncFilesAll } = await loadTelefuncFilesWithVite(runContext)
    assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr(`Vite [\`${viteProvider}\`]`))
    return { telefuncFilesLoaded, telefuncFilesAll }
  }

  assertUsage(false, "You don't seem to be using Telefunc with a supported stack. Reach out on GitHub.")
}

function getNothingFoundErr(retrievalMethod: string) {
  return (
    'No `.telefunc.{js|ts|...}` file found. Did you create one? (Telefunc files retrieval method: ' +
    retrievalMethod +
    '.)'
  )
}
