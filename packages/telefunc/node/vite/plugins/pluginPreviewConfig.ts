export { pluginPreviewConfig }

import type { Plugin } from 'vite'
import { apply } from '../shared/apply.js'
import { addTelefuncMiddleware } from '../shared/addTelefuncMiddleware.js'

function pluginPreviewConfig(): Plugin {
  return {
    name: 'telefunc:pluginPreviewConfig',
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
