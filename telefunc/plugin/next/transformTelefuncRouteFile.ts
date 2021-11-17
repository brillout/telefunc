import * as glob from 'fast-glob'
import { dirname, relative } from 'path'

export { transformTelefuncRouteFile }

async function transformTelefuncRouteFile(src: string, id: string, root: string) {
  const currentDir = dirname(id)
  const relativeRoot = relative(currentDir, root)
  const files = await glob(`${relativeRoot}/**/*.telefunc.*`, { cwd: currentDir })
  console.log(files)
  return {
    code: '',
    map: null,
  }
}
