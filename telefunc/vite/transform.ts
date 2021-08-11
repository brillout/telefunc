import { init, parse } from "es-module-lexer";
import { relative } from "path";
import { Plugin } from "vite";
import { assert } from "../server/utils";

export { transform };

function transform(): Plugin {
  let root: undefined | string;
  return {
    name: "telefunc:transform",
    config: (config) => {
      root = config.root || process.cwd();
      return {
        ssr: { external: ["telefunc"] },
        optimizeDeps: { include: ["telefunc/client"] },
      };
    },
    async transform(src: string, id: string, ssr: boolean) {
      if (ssr) {
        return;
      }
      if (id.includes(".telefunc.")) {
        assert(root);
        const filePath = "/" + relative(root, id);
        assert(!filePath.startsWith("/."));
        await init;
        const exports = parse(src)[1];
        return {
          code: getCode(exports, filePath),
          map: null,
        };
      }
    },
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
