import { Plugin } from 'vite'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide'
import { generateShield } from '../server/shield/codegen/transformer'
import { assert, toPosixPath, viteIsSSR_options } from './utils'

export { transform }

function transform(): Plugin {
  let root: string
  return {
    name: 'telefunc:transform',
    enforce: 'pre',
    configResolved: (config) => {
      root = toPosixPath(config.root)
      assert(root)
    },
    async transform(code, id, options) {
      if (!id.includes('.telefunc.')) {
        return
      }

      const isClientSide = !viteIsSSR_options(options)

      if (isClientSide) {
        code = await transformTelefuncFileClientSide(code, id, root)
      } else {
        code = (await transformTelefuncFileServerSide(code, id, root, true))
        if (id.endsWith('.ts')) {
          code = generateShield(code)
        }
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
