export { loadTelefuncFiles }

import type { ViteDevServer } from 'vite'
import type { TelefuncFiles } from '../types'
import { assertUsage } from '../../utils'
import { loadTelefuncFilesWithVite } from '../../vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithRegistration } from './loadTelefuncFilesWithRegistration'
import { loadTelefuncFilesFromConfig } from './loadTelefuncFilesFromConfig'

async function loadTelefuncFiles(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  telefuncFiles: string[] | null
}): Promise<TelefuncFiles | null> {
  // Handles:
  // - When the user provides the telefunc file paths with `telefuncConfig.telefuncFiles`
  if (runContext.telefuncFiles) {
    const telefuncFilesLoaded = loadTelefuncFilesFromConfig(runContext.telefuncFiles, runContext.root)
    return telefuncFilesLoaded
  }

  // Handles:
  // - Next.js
  // - Nuxt
  // - Vite with `importBuild.js`
  {
    const telefuncFilesLoaded = loadTelefuncFilesWithRegistration()
    if (telefuncFilesLoaded) {
      assertUsage(Object.keys(telefuncFilesLoaded).length > 0, getErrMsg('webpack'))
      return telefuncFilesLoaded
    }
  }

  // Handles:
  // - Vite
  {
    const { telefuncFilesLoaded, viteProvider } = await loadTelefuncFilesWithVite(runContext)
    if (telefuncFilesLoaded) {
      assertUsage(Object.keys(telefuncFilesLoaded).length > 0, getErrMsg(`Vite [\`${viteProvider}\`]`))
      return telefuncFilesLoaded
    }
  }

  assertUsage(false, "You don't seem to be using Telefunc with a supported stack. Reach out on GitHub or Discord.")
}

function getErrMsg(crawler: string) {
  return 'No `.telefunc.{js|ts|...}` file found. Did you create one? (Crawler: ' + crawler + '.)'
}
