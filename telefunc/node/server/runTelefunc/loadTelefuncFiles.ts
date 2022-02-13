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
      return telefuncFiles
    }
  }

  // Handles:
  //  - Vite in development
  //  - Vite in production without `importBuild.js`
  {
    const telefuncFiles = loadTelefuncFilesWithVite(runContext)
    if (telefuncFiles) {
      return telefuncFiles
    }
  }

  assertUsage(
    false,
    "You don't seem to be using Telefunc with a stack that is supported. Reach out on GitHub or Discord to add support for your stack.",
  )
}
