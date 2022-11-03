export { commonConfig }

import type { Plugin } from 'vite'

function commonConfig(): Plugin {
  return {
    name: 'telefunc:commonConfig',
    config: () => ({
      ssr: { external: ['telefunc'] }
    })
  }
}
