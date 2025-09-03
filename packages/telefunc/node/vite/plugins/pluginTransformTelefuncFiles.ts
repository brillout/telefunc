export { pluginTransformTelefuncFiles }

import type { Plugin } from 'vite'
import { transformTelefuncFileClientSide } from '../../transformer/transformTelefuncFileClientSide.js'
import { transformTelefuncFileServerSide } from '../../transformer/transformTelefuncFileServerSide.js'
import { assert, toPosixPath } from '../utils.js'

function pluginTransformTelefuncFiles(): Plugin {
  let root: string
  let isDev: boolean = false
  return {
    name: 'telefunc:pluginTransformTelefuncFiles',
    enforce: 'pre',
    // Note: configResolved and configureServer hooks don't benefit from filters
    // since they're called once per build/dev session and don't process files
    configResolved: {
      handler(config) {
        root = toPosixPath(config.root)
        assert(root)
      },
    },
    configureServer: {
      handler() {
        isDev = true
      },
    },
    transform: {
      filter: {
        id: /\.telefunc\./,
      },
      async handler(code, id, options) {
        if (!id.includes('.telefunc.')) {
          return
        }
        const isClientSide = !options?.ssr
        if (isClientSide) {
          return await transformTelefuncFileClientSide(code, id, root)
        } else {
          return await transformTelefuncFileServerSide(code, id, root, isDev)
        }
      },
    },
  }
}
