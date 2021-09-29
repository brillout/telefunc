import { init, parse } from "es-module-lexer";
import { relative } from "path";
import {
  createUnplugin,
} from "unplugin";
import { Plugin } from "vite";
import { assert } from "../server/utils";

export { transform, unpluginTransform };

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

// @ts-ignore
const unpluginTransform = createUnplugin(() => {
  // better way to handle config.root in webpack/rollup?
  let root = process.cwd();
  return {
    name: "telefunc:transform",
    vite: {
      config: (config) => {
        root = config.root || root;
        return {
          ssr: { external: ["telefunc"] },
          optimizeDeps: { include: ["telefunc/client"] },
        };
      },
    },
    async transform(src: string, id: string, ssr: undefined | boolean) {
      if (ssr) {
        return null;
      }
      if (id.includes(".telefunc.")) {
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
    },
  }
});

function getCode(exports: readonly string[], filePath: string) {
  let code = `import { server } from 'telefunc/client';

`;
  exports.forEach((exportName) => {
    code += `export const ${exportName} = server['${filePath}:${exportName}'];\n`;
  });
  return code;
}
