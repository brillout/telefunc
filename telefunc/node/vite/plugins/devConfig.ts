export { devConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import { apply, addTelefuncMiddleware } from '../helpers'
import path from 'path'

function devConfig(): Plugin[] {
  return [
    {
      name: 'vite-plugin-ssr:devConfig',
      apply: apply('dev'),
      config: () => ({
        ssr: { external: ['telefunc'] }
      }),
      async configResolved(config) {
        await determineFsAllowList(config)
      }
    },
    {
      name: 'vite-plugin-ssr:dev:ssr-middleware',
      apply: apply('dev', { skipMiddlewareMode: true, onlyViteCli: true }),
      configureServer(server) {
        return () => {
          addTelefuncMiddleware(server.middlewares)
        }
      }
    }
  ]
}

async function determineFsAllowList(config: ResolvedConfig) {
  const fsAllow = config.server.fs.allow

  // Current directory: node_modules/telefunc/dist/cjs/node/vite/plugins/devConfig.js
  const telefuncRoot = path.join(__dirname, '../../../../../')
  // Assert that `telefuncRoot` is indeed pointing to `node_modules/vite-plugin-ssr/`
  require.resolve(`${telefuncRoot}/dist/cjs/node/vite/plugins/devConfig.js`)
  fsAllow.push(telefuncRoot)
}
