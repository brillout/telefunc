import { Plugin } from "vite";
import { assert, isObject } from "../../server/utils";
import {transformTelefuncFile} from "../transformTelefuncFile";

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
        return transformTelefuncFile(src, id, root)
      }
    },
  };
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
