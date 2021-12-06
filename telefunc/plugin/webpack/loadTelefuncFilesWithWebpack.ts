import { assert, assertUsage, hasProp, moduleExists, isObject, nodeRequire } from '../../server/utils'

export { loadTelefuncFilesWithWebpack }

function loadTelefuncFilesWithWebpack(callContext: { _root: string }) {
  const entryFile = 'importTelefuncFiles.js'

  const userDist = `${callContext._root}/dist`
  const buildPath = `${userDist}/server/${entryFile}`

  assertUsage(
    moduleExists(buildPath),
    `Make sure to run \`webpack --config webpack.js --mode production --ssr\` before running your Node.js server. (Build file ${buildPath} is missing.)`,
  )
  const moduleExports = nodeRequire(buildPath)

  assert(hasProp(moduleExports, 'importTelefuncFiles', 'function'))
  const globResult = moduleExports.importTelefuncFiles()
  assert(hasProp(globResult, 'telefuncFiles', 'object'))
  const telefuncFiles = globResult.telefuncFiles
  assert(isObjectOfObjects(telefuncFiles))
  return telefuncFiles
}

function isObjectOfObjects(obj: unknown): obj is Record<string, Record<string, unknown>> {
  return isObject(obj) && Object.values(obj).every(isObject)
}
