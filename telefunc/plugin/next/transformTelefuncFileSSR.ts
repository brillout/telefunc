import { parse } from 'es-module-lexer'

export { transformTelefuncFileSSR }

async function transformTelefuncFileSSR(src: string, id: string, root: string) {
  const exports = parse(src)[1]
  console.log(getCode(exports, src, id.replace(root, '')))

  return {
    code: '',
    map: null,
  }
}

function getCode(exports: readonly string[], src: string, filePath: string) {
  let code = `import { __internal_addTelefunction } from "telefunc";\n` + src

  for (const exportName of exports) {
    code += `\n__internal_addTelefunction("${exportName}", ${exportName}, "${filePath}");`
  }
  return code
}
