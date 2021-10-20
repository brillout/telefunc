import { Plugin } from "vite";
import type { InputOption } from "rollup";
import { assert, isObject } from "../server/utils";
import { createUnplugin } from "unplugin";
import * as path from "path";
import { Compiler, webpack } from "webpack";

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
    async webpack(compiler: Compiler) {
      if (!isSSR()) {
        return;
      }

      // No additonal files emitting, so no different result than client build
      compiler.hooks.shouldEmit.tap("telefunc", (compilation) => {
        Object.keys(compilation.assets).forEach((k) => {
          if (k.includes("server/importBuild.js")) {
            return;
          }
          if (k.includes("server/importTelefuncFiles.js")) {
            return;
          }
          delete compilation.assets[k];
        });
        return true;
      });

      compiler.options.externals = normalizeWebpackExternals(
        compiler.options.externals
      )!;
      let entry: Record<string, unknown>;
      if (typeof compiler.options.entry === "function") {
        entry = await compiler.options.entry();
      } else {
        entry = compiler.options.entry;
      }

      // faster build through building only the telefunc files
      Object.keys(entry).forEach((k) => delete entry[k]);

      const telefuncDist = path.resolve(
        path.dirname(require.resolve("telefunc")),
        ".."
      );
      entry["server/importTelefuncFiles"] = {
        import: [`${telefuncDist}/esm/plugin/importTelefuncFiles/webpack.js`],
      };

      entry["server/importBuild"] = {
        import: [`${telefuncDist}/esm/plugin/importBuild.js`],
      };
    },
  };
});

function normalizeWebpackExternals(
  externals?: Compiler["options"]["externals"]
) {
  if (!externals) {
    return {
      telefunc: "commonjs2 telefunc",
      "./importTelefuncFiles.js": "commonjs2 ./importTelefuncFiles.js",
    };
  }
  // if user defines externals, they need to add telefunc to the object
  return externals;
}

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
