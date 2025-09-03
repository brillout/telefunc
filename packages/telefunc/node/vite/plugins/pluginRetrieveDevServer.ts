export { pluginRetrieveDevServer }

import type { Plugin } from 'vite'
import { setViteDevServer } from '../../server/globalContext.js'

function pluginRetrieveDevServer(): Plugin {
  return {
    name: 'telefunc:pluginRetrieveDevServer',
    // Note: configureServer hook doesn't benefit from filters since it's called once per dev session
    configureServer: {
      handler(viteDevServer) {
        setViteDevServer(viteDevServer)
      },
    },
  } as Plugin
}
