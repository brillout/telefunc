export { importBuild }

import { serverProductionEntryPlugin } from '@brillout/vite-plugin-server-entry/plugin'
import type { Plugin, ResolvedConfig } from 'vite'
import { assert, assertPosixPath, projectInfo, requireResolveDistFile } from '../utils.js'
import path from 'node:path'
import { getTelefuncManifest } from './importBuild/getTelefuncManifest.js'
import { getOutDirAbsolute } from '../getOutDirs.js'

function importBuild(): Plugin[] {
  let config: ResolvedConfig
  return [
    {
      name: 'telefunc:importBuild:config',
      enforce: 'post',
      configResolved(config_) {
        config = config_
      },
    },
    ...serverProductionEntryPlugin({
      getServerProductionEntry: () => {
        return getServerProductionEntryCode(config)
      },
      libraryName: projectInfo.projectName,
    }),
  ]
}

function getServerProductionEntryCode(config: ResolvedConfig) {
  const importPath = getImportPath(config)

  const telefuncManifest = getTelefuncManifest()

  const { telefuncFilesGlobFilePath } = globalThis._telefunc!
  assert(telefuncFilesGlobFilePath)

  // console.log(`\n  importPath: ${importPath}\n  outDirServer: ${outDirServer}\n  importPathAbsolute: ${importPathAbsolute}\n  config.build.outDir: ${config.build.outDir}`)
  const importerCode = [
    `import { setTelefuncLoaders } from '${importPath}';`,
    `import * as telefuncFiles from '${telefuncFilesGlobFilePath}';`,
    'setTelefuncLoaders({',
    `  loadTelefuncFiles: () => telefuncFiles,`,
    `  loadManifest: () => (${JSON.stringify(telefuncManifest, null, 2)})`,
    '});',
    '',
  ].join('\n')
  return importerCode
}

function getImportPath(config: ResolvedConfig) {
  // We resolve filePathAbsolute even if we don't use it: we use require.resolve() as an assertion that the relative path is correct
  const filePathAbsolute = requireResolveDistFile(
    'dist/node/server/runTelefunc/loadTelefuncFilesUsingVite/loadBuildEntry.js',
  )
  if (
    // Let's implement a new config if a user needs the import to be a relative path instead of 'telefunc/__internal/loadImportBuild' (AFAIK there is no use case for relative paths for Telefunc)
    true as boolean
  ) {
    return 'telefunc/__internal/loadBuildEntry'
  } else {
    assert(config.build.ssr) // outDir needs to be the outDir of the server-side
    const outDir = getOutDirAbsolute(config)
    assertPosixPath(outDir)
    assertPosixPath(filePathAbsolute)
    const filePathRelative = path.posix.relative(outDir, filePathAbsolute)
    return filePathRelative
  }
}
