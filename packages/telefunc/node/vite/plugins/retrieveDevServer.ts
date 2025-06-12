export { retrieveDevServer }

import type { Plugin } from 'vite'
import { setViteDevServer } from '../../server/globalContext.js'

function retrieveDevServer(): Plugin {
  return {
    name: 'telefunc:retrieveDevServer',
    configureServer(viteDevServer) {
      setViteDevServer(viteDevServer)
    },
  } as Plugin
}
