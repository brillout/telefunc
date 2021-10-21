import { init, parse } from "es-module-lexer";
import { relative } from "path";
import { Plugin } from "vite";
import { assert, isObject } from "../server/utils";

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
    async transform(src, id, options) {
      if (isSSR(options)) {
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

function isSSR(options: undefined | boolean | { ssr: boolean }): boolean {
  if (options === undefined) {
    return false;
  }
  if (typeof options === "boolean") {
    return options;
  }
  if (isObject(options)) {
    return !!options.ssr;
  }
  assert(false);
}
