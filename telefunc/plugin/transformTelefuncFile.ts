import { init, parse } from "es-module-lexer";
import { relative } from "path";
import { assert } from "../server/utils";

export { transformTelefuncFile };

async function transformTelefuncFile(src: string, id: string, root: string) {
  assert(root);
  const filepath = "/" + relative(root, id);
  assert(!filepath.startsWith("/."));
  await init;
  const exports = parse(src)[1];
  return {
    code: getCode(exports, filepath),
    map: null,
  };
}

function getCode(exports: readonly string[], filePath: string) {
  let code = `import { server } from 'telefunc/client';

`;
  exports.forEach((exportName) => {
    code += `export const ${exportName} = server['${filePath}:${exportName}'];\n`;
  });
  return code;
}
