export { createViteLoaderDependencies }

import { importServerProductionEntry } from '@brillout/vite-plugin-server-entry/runtime'
import { loadTelefuncFilesWithImportBuild } from './plugins/importBuild/loadBuild.js'
import { getViteDevServer } from '../server/globalContext.js'
import type { ViteLoaderDependencies } from '../server/runTelefunc/loadTelefuncFiles.js'

function createViteLoaderDependencies(): ViteLoaderDependencies {
  return {
    getViteDevServer() {
      return getViteDevServer()
    },

    async loadTelefuncFilesWithImportBuild() {
      return await loadTelefuncFilesWithImportBuild()
    },

    async importServerProductionEntry(options: { tolerateDoesNotExist: boolean }) {
      return await importServerProductionEntry(options)
    },

    getGlobalTelefuncFilesGlobFilePath() {
      return globalThis._telefunc?.telefuncFilesGlobFilePath
    },
  }
}
