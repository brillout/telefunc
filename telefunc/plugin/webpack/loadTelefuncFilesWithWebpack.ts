import {
  assert,
  assertUsage,
  hasProp,
  moduleExists,
  isObject,
} from "../../server/utils";

export { loadTelefuncFilesWithWebpack };

function loadTelefuncFilesWithWebpack(telefuncContext: { _root: string }) {
  const entryFile = "importTelefuncFiles.js";

  const userDist = `${telefuncContext._root}/dist`;
  const buildPath = `${userDist}/server/${entryFile}`;

  assertUsage(
    moduleExists(buildPath),
    `Make sure to run \`webpack --config webpack.js --mode production --ssr\` before running your Node.js server. (Build file ${buildPath} is missing.)`
  );
  const moduleExports = require_(buildPath);

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

function require_(modulePath: string): unknown {
  // `req` instead of `require` so that Webpack doesn't do dynamic dependency analysis
  const req = require;
  return req(modulePath);
}
