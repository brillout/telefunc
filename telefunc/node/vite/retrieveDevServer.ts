export { retrieveDevServer }

import type { Plugin } from 'vite'
import { globalContext } from '../server/globalContext'

function retrieveDevServer(): Plugin {
  return {
    name: 'telefunc:retrieveDevServer',
    configureServer(viteDevServer) {
      globalContext.viteDevServer = viteDevServer
    }
  } as Plugin
}
