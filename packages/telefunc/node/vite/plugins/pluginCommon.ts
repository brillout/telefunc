export { pluginCommon }

import type { Plugin } from 'vite'

function pluginCommon(): Plugin {
  return {
    name: 'telefunc:pluginCommon',
    // Note: config hook doesn't benefit from filters since it's called once per build/dev session
    config: {
      handler() {
        return {
          ssr: { external: ['telefunc'] },
        }
      },
    },
  }
}
