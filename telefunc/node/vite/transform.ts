import type { Plugin } from 'vite'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide'
import { assert, toPosixPath, viteIsSSR_options } from './utils'

export { transform }

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

      const isClientSide = !viteIsSSR_options(options)

      if (isClientSide) {
        code = await transformTelefuncFileClientSide(code, id, root)
      } else {
        code = await transformTelefuncFileServerSide(code, id, root, true, isDev)
      }

      if (isClientSide) {
        return {
          code,
          // Remove unnecessary source map
          map: null
        }
      } else {
        return code
      }
    }
  }
}
