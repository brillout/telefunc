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
          ]
        }
      }),
      async configResolved(config) {
        fixOptimizeDeps(config.optimizeDeps)
        await determineFsAllowList(config)
      }
    },
    {
      name: 'vite-plugin-ssr:devConfig:serverMiddleware',
      apply: apply('dev', { skipMiddlewareMode: true, onlyViteCli: true }),
      // Ensure that SvelteKit's configureServer() has precedence, see https://github.com/brillout/telefunc/pull/54
      enforce: 'post',
      configureServer(server) {
        return () => {
          addTelefuncMiddleware(server.middlewares)
        }
      }
    }
  ]
}

// - Vite-plugin-ssr adds @brillout/json-serializer to optimizeDeps.exclude
// - We need to remove @brillout/json-serializer from optimizeDeps.exclude to avoid:
//   ```
//   10:41:35 AM [vite] Internal server error: Failed to resolve import "@brillout/json-serializer/parse" from "node_modules/.vite/deps/chunk-HMXEIHOJ.js?v=9404be11". Does the file exist?
//   ```
// - We can't add @brillout/json-serializer to optimizeDeps.include because Vite complains:
//   ```
//   Failed to resolve dependency: @brillout/json-serializer/parse, present in 'optimizeDeps.include'
//   Failed to resolve dependency: @brillout/json-serializer/stringify, present in 'optimizeDeps.include'
//   ```
function fixOptimizeDeps(optimizeDeps: { exclude?: string[] }) {
  optimizeDeps.exclude = optimizeDeps.exclude?.filter((entry) => !entry.startsWith('@brillout/json-serializer'))
}

async function determineFsAllowList(config: ResolvedConfig) {
  const fsAllow = config.server.fs.allow

  // Current directory: node_modules/telefunc/dist/cjs/node/vite/plugins/devConfig.js
  const telefuncRoot = path.join(__dirname, '../../../../../')
  // Assert that `telefuncRoot` is indeed pointing to `node_modules/vite-plugin-ssr/`
  require.resolve(`${telefuncRoot}/dist/cjs/node/vite/plugins/devConfig.js`)
  fsAllow.push(telefuncRoot)
}
