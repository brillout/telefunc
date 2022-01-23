import { Plugin } from 'vite'
import { assert, toPosixPath } from '../server/utils'
import { transformTelefuncFile } from '../transformer/transformTelefuncFile'
import { isSSR_options } from './utils'

export { transform }

function transform(): Plugin {
  let root: undefined | string
  return {
    name: 'telefunc:transform',
    config: (config) => {
      root = config.root
        ? // Not sure why but Vite doens't seem to always normalize config.root
          toPosixPath(config.root)
        : toPosixPath(process.cwd())
      return {
        ssr: { external: ['telefunc'] },
        optimizeDeps: { include: ['telefunc/client'] },
      }
    },
    async transform(src, id, options) {
      if (isSSR_options(options)) {
        return
      }
      if (id.includes('.telefunc.')) {
        assert(root)
        return transformTelefuncFile(src, id, root)
      }
    },
  }
}
