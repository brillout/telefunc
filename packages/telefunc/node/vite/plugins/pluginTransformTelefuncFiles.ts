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
    configResolved: (config) => {
      root = toPosixPath(config.root)
      assert(root)
    },
    configureServer() {
      isDev = true
    },
    async transform(code, id, options) {
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
  }
}
