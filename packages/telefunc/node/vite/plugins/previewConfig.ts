export { previewConfig }

import type { Plugin } from 'vite'
import { apply, addTelefuncMiddleware } from '../helpers.js'

function previewConfig(): Plugin {
  return {
    name: 'telefunc:previewConfig',
    apply: apply('preview'),
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
