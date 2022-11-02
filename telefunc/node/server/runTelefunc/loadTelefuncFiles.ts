export { loadTelefuncFiles }

import type { ViteDevServer } from 'vite'
import type { TelefuncFiles } from '../types'
import { assertUsage, assert, hasProp } from '../../utils'
import { loadTelefuncFilesWithVite } from '../../vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithRegistration } from './loadTelefuncFilesWithRegistration'
import { loadTelefuncFilesFromConfig } from './loadTelefuncFilesFromConfig'

async function loadTelefuncFiles(runContext: {
  appRootDir: string | null
  viteDevServer: ViteDevServer | null
  telefuncFilesManuallyProvidedByUser: string[] | null
  telefuncFilePath: string
}): Promise<{ telefuncFilesLoaded: TelefuncFiles; telefuncFilesAll: string[] }> {
  // Handles:
  // - When the user provides the telefunc file paths with `telefuncConfig.telefuncFiles`
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
  // - Nuxt
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
  {
    const ret = await loadTelefuncFilesWithVite(runContext)
    if (ret) {
      const { telefuncFilesLoaded, viteProvider, telefuncFilesAll } = ret
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr(`Vite [\`${viteProvider}\`]`))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  assertUsage(false, "You don't seem to be using Telefunc with a supported stack. Reach out on GitHub or Discord.")
}

function getNothingFoundErr(retrievalMethod: string) {
  return (
    'No `.telefunc.{js|ts|...}` file found. Did you create one? (Telefunc files retrieval method: ' +
    retrievalMethod +
    '.)'
  )
}
