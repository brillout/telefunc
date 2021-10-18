import { Plugin } from "vite";
import type { InputOption } from "rollup";
import { assert, isObject } from "../server/utils";
import { createUnplugin } from "unplugin";
import * as path from "path";

export { build };

function build(): Plugin {
  return {
    name: "telefunc:build",
    apply: "build",
    config: (config) => {
      const configMod = {
        ssr: { external: ["vite-plugin-ssr"] },
      };
      if (!isSSR(config)) {
        return {
          ...configMod,
          build: {
            outDir: "dist/client",
          },
        };
      } else {
        const viteEntry = getViteEntry();
        const input = {
          ...viteEntry,
          ...normalizeRollupInput(config.build?.rollupOptions?.input),
        };
        return {
          ...configMod,
          build: {
            rollupOptions: { input },
            outDir: "dist/server",
          },
        };
      }
    },
  };
}

export const unpluginBuild = createUnplugin(() => {
  return {
    name: "telefunc:build",
    // better way to emit files?
    async webpack(compiler) {
      if (!isSSR()) {
        return
      }
      let entry: Record<string, unknown>;
      if (typeof compiler.options.entry === "function") {
        entry = await compiler.options.entry();
      } else {
        entry = compiler.options.entry;
      }

      // faster build through building only the telefunc files 
      // TODO: remove assets so no different assets on the second build
      Object.keys(entry).forEach((k) => delete entry[k])

      const telefuncDist = path.resolve(
        path.dirname(require.resolve("telefunc")),
        ".."
      );
      entry["server/importTelefuncFiles"] = {
        import: [`${telefuncDist}/esm/plugin/importTelefuncFiles/webpack.js`],
      };
    },
  };
});

function normalizeRollupInput(input?: InputOption): Record<string, string> {
  if (!input) {
    return {};
  }
  /*
  if (typeof input === "string") {
    return { [input]: input };
  }
  if (Array.isArray(input)) {
    return Object.fromEntries(input.map((i) => [i, i]));
  }
  */
  assert(isObject(input));
  return input;
}

function getViteEntry() {
  const fileName = "importTelefuncFiles";
  const pluginDist = `../../../dist`;
  const esmPath = require.resolve(`${pluginDist}/esm/plugin/${fileName}.js`);
  const viteEntry = {
    [fileName]: esmPath,
  };
  return viteEntry;
}

function isSSR(config?: { build?: { ssr?: boolean | string } }): boolean {
  return !!config?.build?.ssr || process.argv.includes("--ssr");
}
