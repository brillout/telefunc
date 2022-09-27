import { Plugin } from 'vite'
import { transformTelefuncFile } from '../transformer/transformTelefuncFile'
import { transformTelefuncFileSSR } from '../transformer/transformTelefuncFileSSR'
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
      if (!viteIsSSR_options(options)) {
        return transformTelefuncFile(code, id, root)
      } else {
        code = (await transformTelefuncFileSSR(code, id, root, true)).code
        if (id.endsWith('.ts')) {
          return generateShield(code)
        }
      }
    }
  }
}
