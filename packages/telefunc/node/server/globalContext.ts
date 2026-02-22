export { getViteDevServer }
export { setViteDevServer }

import type { ViteDevServer } from 'vite'
import { getGlobalObject } from '../../utils/getGlobalObject.js'

const globalObject = getGlobalObject<{ viteDevServer: null | ViteDevServer }>('globalContext.ts', {
  viteDevServer: null,
})

function setViteDevServer(viteDevServer: ViteDevServer): void {
  globalObject.viteDevServer = viteDevServer
}

function getViteDevServer(): null | ViteDevServer {
  return globalObject.viteDevServer
}
