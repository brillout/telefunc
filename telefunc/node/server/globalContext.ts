export { globalContext }

import type { ViteDevServer } from 'vite'

const globalContext: GlobalContext = {}

type GlobalContext = {
  viteDevServer?: ViteDevServer
}
