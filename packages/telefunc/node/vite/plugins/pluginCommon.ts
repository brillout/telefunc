export { pluginCommon }

import type { Plugin } from 'vite'

function pluginCommon(): Plugin {
  return {
    name: 'telefunc:pluginCommon',
    /*
    config: {
      handler() {
        return {}
      },
    },
    */
  }
}
