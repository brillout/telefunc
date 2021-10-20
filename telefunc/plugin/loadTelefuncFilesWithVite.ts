import { assert, hasProp, isObject, moduleExists } from "../server/utils";
import type { ViteDevServer } from "vite";
import { TelefuncFilesUntyped } from "../server/types";
import { loadEntry } from "./loadEntry";

export { loadTelefuncFilesWithVite };

type Env = "webpack" | "vite" | "none"

async function loadTelefuncFilesWithVite(telefuncContext: {
  _root: string;
  _viteDevServer?: ViteDevServer;
  _isProduction: boolean;
}): Promise<TelefuncFilesUntyped> {
  const env = getEnv(telefuncContext)

  const entryFile = "importTelefuncFiles/vite.js";
  const devEntryFile = `importTelefuncFiles/${env}.js`;
  assert(moduleExists(`./${entryFile}`, __dirname));
  const userDist = `${telefuncContext._root}/dist`;
  const prodPath = `${userDist}/server/${entryFile}`;
  const pluginDist = `../../../dist`;
  const devPath = `${pluginDist}/esm/plugin/${devEntryFile}`;

  const errorMessage = getProdErrorMessage(env)

  const moduleExports = await loadEntry({
    devPath,
    prodPath,
    errorMessage,
    viteDevServer: telefuncContext._viteDevServer,
    isProduction: telefuncContext._isProduction,
  });

  assert(hasProp(moduleExports, "importTelefuncFiles", "function"));
  const globResult = moduleExports.importTelefuncFiles();
  assert(hasProp(globResult, "telefuncFiles", "object"));
  const telefuncFiles = globResult.telefuncFiles;
  assert(isObjectOfObjects(telefuncFiles));
  return telefuncFiles;
}

function isObjectOfObjects(
  obj: unknown
): obj is Record<string, Record<string, unknown>> {
  return isObject(obj) && Object.values(obj).every(isObject);
}

function getEnv({ _viteDevServer }: Record<string, unknown>): Env {
  if (_viteDevServer) {
    return "vite";
  }
  // TODO: determine environments so we can show proper error messages
  return "none";
}

function getProdErrorMessage(env: Env) {
  if (env === "none") {
    return `Make sure to build (\`server/importBuild.js\` and \`server/importTelefuncFiles.js\`) before running your Node.js server with \`createTelefuncCaller({ isProduction: true })\``;
  }

  const errors = {
    webpack: "webpack --config webpack.js --mode production --ssr",
    vite: "vite build && vite build --ssr",
  };

  return `Make sure to run \`${errors[env]}\` before running your Node.js server with \`createTelefuncCaller({ isProduction: true })\``;
}
