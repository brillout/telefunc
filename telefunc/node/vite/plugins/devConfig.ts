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
        optimizeDeps: {
          include: [
            'telefunc/client',
            // Vite bug workaround. I don't know why, but Vite somehow thinks it needs to pre-optimize the `telefunc` module:
            // ```
            // 11:12:30 AM [vite] ✨ new dependencies optimized: telefunc
            // 11:12:30 AM [vite] ✨ optimized dependencies changed. reloading
            // ```
            // (Vite correctly bundles `package.json#exports["."].browser` though.)
            'telefunc'
            /* Doesn't seem to be needed. Adding these makes Vite complain:
             * ```
             * Failed to resolve dependency: @brillout/json-serializer/parse, present in 'optimizeDeps.include'
             * Failed to resolve dependency: @brillout/json-serializer/stringify, present in 'optimizeDeps.include'
             * ```
            '@brillout/json-serializer/parse',
            '@brillout/json-serializer/stringify',
            */
          ]
        }
      }),
      async configResolved(config) {
        await determineFsAllowList(config)
      }
    },
    {
      name: 'vite-plugin-ssr:devConfig:serverMiddleware',
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
