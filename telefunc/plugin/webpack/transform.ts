import { createUnplugin } from 'unplugin'
import { assert } from '../../server/utils'
import { getImportBuildCode } from './getImportBuildCode'
import { isSSR } from './isSSR'
import { isTelefuncFile } from '../isTelefuncFile'
import { transformTelefuncFile } from '../transformTelefuncFile'
import { relative } from 'path'

export { unpluginTransform }

const isWin = process.platform === 'win32'

const unpluginTransform = createUnplugin((_userPlugin, meta) => {
  assert(meta.framework === 'webpack')
  // better way to handle config.root?
  let root = process.cwd()
  return {
    name: 'telefunc:transform',
    transformInclude: (id) => isTelefuncFile(id) || isImportBuildFile(id) || isImportTelefuncFilesFile(id),
    transform: (src, id) => {
      if (isImportTelefuncFilesFile(id)) {
        const rootPathForWin = relative(__dirname,root ).replace(/\\/g,'/')

        return {
          code: src.replace('@telefunc/REPLACE_PATH', isWin ? rootPathForWin : root),
          map: null,
        }
      }
      if (isImportBuildFile(id)) {
        return {
          code: getImportBuildCode(),
          map: null,
        }
      }
      if (isTelefuncFile(id)) {
        if (isSSR()) {
          return
        }
        return transformTelefuncFile(src, id, root)
      }
      assert(false)
    },
  }
})

function isImportTelefuncFilesFile(id: string) {
  // TODO: make test more robust
  //assert(pathIsNormalized(id));
  return id.includes('importTelefuncFiles')
}

function isImportBuildFile(id: string) {
  //assert(pathIsNormalized(id));
  return id.includes('importBuild.js')
}

// Make sure paths are UNIX-like, even on windows
function pathIsNormalized(filePath: string) {
  return !filePath.includes('\\')
}
