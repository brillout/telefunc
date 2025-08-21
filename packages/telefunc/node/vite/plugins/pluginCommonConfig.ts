export { pluginCommonConfig }

import type { Plugin } from 'vite'

function pluginCommonConfig(): Plugin {
  return {
    name: 'telefunc:pluginCommonConfig',
    config: () => ({
      ssr: { external: ['telefunc'] },
    }),
  }
}
