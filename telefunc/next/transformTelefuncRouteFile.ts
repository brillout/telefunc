import * as glob from 'fast-glob'
import { dirname, relative } from 'path'
import { toPosixPath } from '../server/utils'

export { transformTelefuncRouteFile }

async function transformTelefuncRouteFile(routeCode: string, id: string, root: string) {
  const currentDir = dirname(id)
  const currentDirNormalized = toPosixPath(currentDir)
  const relativeRoot = relative(currentDir, root)
  const relativeRootNormalized = toPosixPath(relativeRoot)
  const files = await glob(`${relativeRootNormalized}/**/*.telefunc.*`, { cwd: currentDirNormalized })
  const importsCode = getImportsCode(files)

  return {
    code: importsCode + routeCode,
    map: null,
  }
}

function getImportsCode(imports: readonly string[]) {
  let code = ''

  imports.forEach((path) => {
    code += `import '${path}'\n`
  })

  return code
}
