export { pluginReplaceConstantsNonRunnableDev }

import { isRunnableDevEnvironment, isDevCheck } from '../../utils.js'
import { getMagicString } from '../../../shared/getMagicString.js'
import type { Plugin } from 'vite'

// - We cannot use [`define`](https://vite.dev/config/shared-options.html#define) because we don't have access to `this.environment` and therefore we cannot call `isRunnableDevEnvironment(this.environment)` inside a configEnvironment() hook.
// - We cannot use [`filter.id`](https://rolldown.rs/plugins/hook-filters) because Vite's optimizeDeps bundles packages (e.g. `vike` or `telefunc`) into node_modules/.vite/deps_ssr/chunk-WBC5FHD7.js

const DYNAMIC_IMPORT = '__TELEFUNC__DYNAMIC_IMPORT'
const IS_NON_RUNNABLE_DEV = 'globalThis.__TELEFUNC__IS_NON_RUNNABLE_DEV'

declare global {
  var __TELEFUNC__DYNAMIC_IMPORT: (module: `virtual:${string}`) => Promise<Record<string, unknown>>
  var __TELEFUNC__IS_NON_RUNNABLE_DEV: undefined | true
}
function pluginReplaceConstantsNonRunnableDev(): Plugin[] {
  return [
    {
      name: 'telefunc:pluginReplaceConstantsNonRunnableDev:1',
      apply: (_, configEnv) => isDevCheck(configEnv),
      transform: {
        filter: {
          code: {
            include: IS_NON_RUNNABLE_DEV,
          },
        },
        handler(code, id) {
          if (isRunnableDevEnvironment(this.environment)) return
          const { magicString, getMagicStringResult } = getMagicString(code, id)
          magicString.replaceAll(IS_NON_RUNNABLE_DEV, JSON.stringify(true))
          return getMagicStringResult()
        },
      },
    },
    {
      name: 'telefunc:pluginReplaceConstantsNonRunnableDev:2',
      apply: (_, configEnv) => isDevCheck(configEnv),
      transform: {
        filter: {
          code: {
            include: DYNAMIC_IMPORT,
          },
        },
        handler(code, id) {
          if (isRunnableDevEnvironment(this.environment)) return
          const { magicString, getMagicStringResult } = getMagicString(code, id)
          magicString.replaceAll(DYNAMIC_IMPORT, 'import')
          return getMagicStringResult()
        },
      },
    },
  ]
}
