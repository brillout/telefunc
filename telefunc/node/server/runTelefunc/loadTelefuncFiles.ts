export { loadTelefuncFiles }

import type { ViteDevServer } from 'vite'
import type { TelefuncFiles } from '../types'
import { assertUsage } from '../../utils'
import { loadTelefuncFilesWithVite } from '../../vite/loadTelefuncFilesWithVite'
import { loadTelefuncFilesWithInternalMechanism } from './loadTelefuncFilesWithInternalMechanism'

async function loadTelefuncFiles(runContext: {
  root: string | null
  viteDevServer: ViteDevServer | null
  isProduction: boolean
}): Promise<TelefuncFiles | null> {
  // Handles:
  // - Next.js
  // - Nuxt
  // - Vite with `importBuild.js`
  {
    const telefuncFiles = loadTelefuncFilesWithInternalMechanism()
    if (telefuncFiles) {
      assertUsage(Object.keys(telefuncFiles).length > 0, getErrMsg('webpack'))
      return telefuncFiles
    }
  }

  // Handles:
  //  - Vite in development
  //  - Vite in production without `importBuild.js`
  {
    const telefuncFiles = await loadTelefuncFilesWithVite(runContext)
    if (telefuncFiles) {
      assertUsage(Object.keys(telefuncFiles).length > 0, getErrMsg('vite'))
      return telefuncFiles
    }
  }

  assertUsage(false, "You don't seem to be using Telefunc with a supported stack. Reach out on GitHub or Discord.")
}

function getErrMsg(stackName: 'webpack' | 'vite') {
  return 'No `.telefunc.{js|ts|...}` file found. Did you create one? (Stack: `' + stackName + '`.)'
}
