export { previewConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import { apply, addTelefuncMiddleware } from '../helpers.js'
import { determineOutDir } from '../getOutDirs.js'

function previewConfig(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'telefunc:previewConfig',
    apply: apply('preview'),
    configResolved(config_) {
      config = config_
      const outDir = determineOutDir(config)
      if (outDir) config.build.outDir = outDir
    },
    // Ensure that SvelteKit's configurePreviewServer() has precedence, see https://github.com/brillout/telefunc/pull/54
    enforce: 'post',
    configurePreviewServer(server) {
      return () => {
        ;(process.env as Record<string, string>).NODE_ENV = 'production'
        addTelefuncMiddleware(server.middlewares)
      }
    },
  }
}
