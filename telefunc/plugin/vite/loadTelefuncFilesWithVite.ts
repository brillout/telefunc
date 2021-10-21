import { assert, hasProp, isObject, moduleExists } from "../../server/utils";
import type { ViteDevServer } from "vite";
import { loadViteEntry } from './loadViteEntry'
import {TelefuncFilesUntyped} from "../../server/types";

export { loadTelefuncFilesWithVite };

async function loadTelefuncFilesWithVite(telefuncContext: {
  _root: string;
  _viteDevServer?: ViteDevServer;
  _isProduction: boolean;
}): Promise<TelefuncFilesUntyped> {
  const viteEntryFile = 'importTelefuncFiles.js'
  assert(moduleExists(`./${viteEntryFile}`, __dirname))
  const userDist = `${telefuncContext._root}/dist`
  const prodPath = `${userDist}/server/${viteEntryFile}`
  const pluginDist = `../../../dist`
  const devPath = `${pluginDist}/esm/vite/${viteEntryFile}`

  const errorMessage =
    'Make sure to run `vite build && vite build --ssr` before running your Node.js server with `createTelefuncCaller({ isProduction: true })`'

  const moduleExports = await loadViteEntry({
    devPath,
    prodPath,
    errorMessage,
    viteDevServer: telefuncContext._viteDevServer,
    isProduction: telefuncContext._isProduction
  })

  assert(hasProp(moduleExports, 'importTelefuncFiles', 'function'))
  const globResult = moduleExports.importTelefuncFiles()
  assert(hasProp(globResult, 'telefuncFiles', 'object'))
  const telefuncFiles = globResult.telefuncFiles;
  assert(isObjectOfObjects(telefuncFiles))
  return telefuncFiles;
}

function isObjectOfObjects(obj: unknown): obj is Record<string, Record<string, unknown>> {
   return isObject(obj) && Object.values(obj).every(isObject)
}
