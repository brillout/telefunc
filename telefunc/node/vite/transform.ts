import { Plugin } from 'vite'
import { assert, toPosixPath } from '../utils'
import { transformTelefuncFile } from '../transformer/transformTelefuncFile'
import { isSSR_options } from './utils'
import { generateShield } from '../server/shield/codegen/transformer'

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
      if (!isSSR_options(options)) {
        return transformTelefuncFile(code, id, root)
      } else {
        if (id.endsWith('.ts')) {
          return generateShield(code)
        }
      }
    }
  }
}
