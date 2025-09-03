export { pluginPreview }

import type { Plugin } from 'vite'
import { apply } from '../shared/apply.js'
import { addTelefuncMiddleware } from '../shared/addTelefuncMiddleware.js'

function pluginPreview(): Plugin {
  return {
    name: 'telefunc:pluginPreview',
    apply: apply('preview'),
    // Ensure that SvelteKit's configurePreviewServer() has precedence, see https://github.com/brillout/telefunc/pull/54
    enforce: 'post',
    // Note: configurePreviewServer hook doesn't benefit from filters since it's called once per preview session
    configurePreviewServer: {
      handler(server) {
        return () => {
          ;(process.env as Record<string, string>).NODE_ENV = 'production'
          addTelefuncMiddleware(server.middlewares)
        }
      },
    },
  }
}
