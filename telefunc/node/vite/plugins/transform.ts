export { transform }

import type { Plugin } from 'vite'
import { transformTelefuncFileClientSide } from '../../transformer/transformTelefuncFileClientSide.js'
import { transformTelefuncFileServerSide } from '../../transformer/transformTelefuncFileServerSide.js'
import { assert, rollupSourceMapRemove, toPosixPath } from '../utils.js'

function transform(): Plugin {
  let root: string
  let isDev: boolean = false
  return {
    name: 'telefunc:transform',
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

      let res: { code: string }
      if (isClientSide) {
        res = await transformTelefuncFileClientSide(code, id, root)
      } else {
        res = await transformTelefuncFileServerSide(code, id, root, true, isDev)
      }
      code = res.code

      if (isClientSide) {
        return rollupSourceMapRemove(code)
      } else {
        return code
      }
    },
  }
}
