import * as glob from 'fast-glob'
import { dirname, relative } from 'path'

export { transformTelefuncRouteFile }

async function transformTelefuncRouteFile(src: string, id: string, root: string) {
  const currentDir = dirname(id)
  const relativeRoot = relative(currentDir, root)
  const files = await glob(`${relativeRoot}/**/*.telefunc.*`, { cwd: currentDir })
  const importsCode = getImportsCode(files)
  const routeCode = getRouteCode(root)

  console.log(importsCode + routeCode)

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

function getRouteCode(root: string) {
  return `
import { createTelefuncCaller } from 'telefunc';
const callTelefuncPromise = createTelefuncCaller({
    isProduction: process.env.NODE_ENV === 'production',
    root: '${root}',
    urlPath: '/api/_telefunc',
});
export default async function _telefunc(req, res) {
    let callTelefunc = await callTelefuncPromise;
    const { url, method, body } = req;
    const httpResponse = await callTelefunc({ url, method, body });
    if (httpResponse) {
        res.writeHead(httpResponse.statusCode).end(httpResponse.body);
        return;
    }
    res.writeHead(500).end('Internal server error');
}
  `
}
