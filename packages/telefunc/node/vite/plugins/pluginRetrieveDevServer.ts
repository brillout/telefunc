export { pluginRetrieveDevServer }

import type { Plugin } from 'vite'
import { setViteDevServer } from '../../server/globalContext.js'

function pluginRetrieveDevServer(): Plugin[] {
  return [{
    name: 'telefunc:pluginRetrieveDevServer',
    configureServer: {
      handler(viteDevServer) {
        setViteDevServer(viteDevServer)
      },
    },
  } as Plugin]
}
