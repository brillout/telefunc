import * as glob from 'fast-glob'
import { dirname, relative } from 'path'

export { transformTelefuncRouteFile }

async function transformTelefuncRouteFile(routeCode: string, id: string, root: string) {
  const currentDir = dirname(id)
  const relativeRoot = relative(currentDir, root)
  const files = await glob(`${relativeRoot}/**/*.telefunc.*`, { cwd: currentDir })
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
