export { pluginNonRunnableDev }

import type { Plugin } from 'vite'
import { isRunnableDevEnvironment, isDevCheck } from '../../utils.js'
import { getMagicString } from '../../../shared/getMagicString.js'

// - We cannot use [`define`](https://vite.dev/config/shared-options.html#define) because we don't have access to `this.environment` and thus cannot call `isRunnableDevEnvironment(this.environment)` inside the configEnvironment() hook.
// - We cannot use [`filter.id`](https://rolldown.rs/plugins/hook-filters) because Vite's optimizeDeps bundles packages (e.g. `vike`) into node_modules/.vite/deps_ssr/chunk-WBC5FHD7.js

const __TELEFUNC__DYNAMIC_IMPORT = 'globalThis.__TELEFUNC__DYNAMIC_IMPORT'
const __TELEFUNC__IS_NON_RUNNABLE_DEV = '__TELEFUNC__IS_NON_RUNNABLE_DEV'

declare global {
  var __TELEFUNC__DYNAMIC_IMPORT: (module: `virtual:${string}`) => Promise<Record<string, unknown>>
  var __TELEFUNC__IS_NON_RUNNABLE_DEV: undefined | boolean
}
function pluginNonRunnableDev(): Plugin[] {
  return [
    {
      name: 'brillout:pluginReplaceConstantsNonRunnableDev:1',
      apply: (_, configEnv) => isDevCheck(configEnv),
      transform: {
        filter: {
          code: {
            include: __TELEFUNC__IS_NON_RUNNABLE_DEV,
          },
        },
        handler(code, id) {
          if (isRunnableDevEnvironment(this.environment)) return
          const { magicString, getMagicStringResult } = getMagicString(code, id)
          magicString.replaceAll(__TELEFUNC__IS_NON_RUNNABLE_DEV, JSON.stringify(true))
          return getMagicStringResult()
        },
      },
    },
    {
      name: 'brillout:pluginReplaceConstantsNonRunnableDev:2',
      apply: (_, configEnv) => isDevCheck(configEnv),
      transform: {
        filter: {
          code: {
            include: __TELEFUNC__DYNAMIC_IMPORT,
          },
        },
        handler(code, id) {
          if (isRunnableDevEnvironment(this.environment)) return
          const { magicString, getMagicStringResult } = getMagicString(code, id)
          magicString.replaceAll(__TELEFUNC__DYNAMIC_IMPORT, 'import')
          return getMagicStringResult()
        },
      },
    },
  ]
}
