export { registerDependencies }

import type { Plugin } from 'vite'
import { setViteLoaderDependencies } from '../../server/runTelefunc/loadTelefuncFiles.js'
import { createViteLoaderDependencies } from '../viteLoaderDependencies.js'

function registerDependencies(): Plugin {
  return {
    name: 'telefunc:registerDependencies',
    configResolved() {
      // Register the vite dependencies as soon as the plugin is configured
      const viteLoaderDependencies = createViteLoaderDependencies()
      setViteLoaderDependencies(viteLoaderDependencies)
    },
  } as Plugin
}
