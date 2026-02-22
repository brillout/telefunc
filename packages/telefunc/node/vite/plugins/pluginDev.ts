export { pluginDev }

import type { Plugin, ResolvedConfig } from 'vite'
import { apply } from '../shared/apply.js'
import { addTelefuncMiddleware } from '../shared/addTelefuncMiddleware.js'
import { getPackageNodeModulesDirectory } from '../../../utils/requireResolve.js'

function pluginDev(): Plugin[] {
  return [
    {
      name: 'telefunc:pluginDev',
      apply: apply('dev'),
      config: {
        handler() {
          return {
            optimizeDeps: {
              include: [
                // Vite pre-bundler doesn't discover 'telefunc/client' because it doesn't transform `.telefunc.js` imports => Vite will discover the 'telefunc/client' dependency only after Telefunc transforms `.telefunc.js` imports into the thin HTTP client using 'telefunc/client'
                'telefunc/client',
              ],
            },
          }
        },
      },
      configResolved: {
        async handler(config) {
          fixOptimizeDeps(config.optimizeDeps)
          await determineFsAllowList(config)
        },
      },
    },
    {
      name: 'telefunc:pluginDev:serverMiddleware',
      apply: apply('dev', { skipMiddlewareMode: true, onlyViteCli: true }),
      // Ensure that SvelteKit's configureServer() has precedence, see https://github.com/brillout/telefunc/pull/54
      enforce: 'post',
      configureServer: {
        handler(server) {
          return () => {
            addTelefuncMiddleware(server.middlewares)
          }
        },
      },
    },
  ]
}

// - Vike adds @brillout/json-serializer to optimizeDeps.exclude
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

  // Add node_modules/telefunc/
  const packageNodeModulesDirectory = getPackageNodeModulesDirectory()
  fsAllow.push(packageNodeModulesDirectory)
}
