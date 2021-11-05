import { Plugin } from 'vite'
import { assert, toPosixPath, isObject, assertPosixPath } from '../../server/utils'
import { isTelefuncFile } from '../isTelefuncFile'
import { transformTelefuncFile } from '../transformTelefuncFile'

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
      if (isSSR(options)) {
        return
      }
      if (isTelefuncFile(id)) {
        assert(root)
        return transformTelefuncFile(src, id, root)
      }
    },
  }
}

// https://github.com/vitejs/vite/discussions/5109#discussioncomment-1450726
function isSSR(options: undefined | boolean | { ssr: boolean }): boolean {
  if (options === undefined) {
    return false
  }
  if (typeof options === 'boolean') {
    return options
  }
  if (isObject(options)) {
    return !!options.ssr
  }
  assert(false)
}
