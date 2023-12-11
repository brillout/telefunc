export { importBuild }

import { importBuild as importBuild_ } from '@brillout/vite-plugin-import-build/plugin'
import type { Plugin, ResolvedConfig } from 'vite'
import { assert, assertPosixPath, getOutDirAbsolute, projectInfo, toPosixPath } from '../../utils'
import path from 'path'
import { telefuncFilesGlobFileNameBase } from '../../importGlob/telefuncFilesGlobFileNameBase'
import { manifestFileName } from '../manifest'

function importBuild(): Plugin[] {
  let config: ResolvedConfig
  return [
    {
      name: 'telefunc:importBuild:config',
      enforce: 'post',
      configResolved(config_) {
        config = config_
      }
    },
    importBuild_({
      getImporterCode: ({ findBuildEntry }) => {
        const telefuncFilesEntry = findBuildEntry(telefuncFilesGlobFileNameBase)
        return getImporterCode(config, telefuncFilesEntry)
      },
      libraryName: projectInfo.projectName
    })
  ]
}

function getImporterCode(config: ResolvedConfig, telefuncFilesEntry: string) {
  const importPath = getImportPath(config)

  // console.log(`\n  importPath: ${importPath}\n  outDirServer: ${outDirServer}\n  importPathAbsolute: ${importPathAbsolute}\n  config.build.outDir: ${config.build.outDir}`)
  const importerCode = [
    '{',
    `  const { setLoaders } = require('${importPath}');`,
    '  setLoaders({',
    `    loadTelefuncFiles: () => import('./${telefuncFilesEntry}'),`,
    `    loadManifest: () => require('./${manifestFileName}')`,
    '  });',
    '}',
    ''
  ].join('\n')
  return importerCode
}

function getImportPath(config: ResolvedConfig) {
  // We resolve filePathAbsolute even if we don't use it: we use require.resolve() as an assertion that the relative path is correct
  const filePathAbsolute = toPosixPath(
    // [RELATIVE_PATH_FROM_DIST] Current file: node_modules/telefunc/dist/cjs/node/vite/plugins/importBuild/index.js
    require.resolve(`../../../../../../dist/cjs/node/vite/plugins/importBuild/loadBuild.js`)
  )
  if (
    // Let's implement a new config if a user needs the import to be a relative path instead of 'telefunc/__internal/loadImportBuild' (AFAIK there is no use case for relative paths for Telefunc)
    true as boolean
  ) {
    return 'telefunc/__internal/loadBuild'
  } else {
    assert(config.build.ssr) // outDir needs to be the outDir of the server-side
    const outDir = getOutDirAbsolute(config)
    assertPosixPath(outDir)
    assertPosixPath(filePathAbsolute)
    const filePathRelative = path.posix.relative(outDir, filePathAbsolute)
    return filePathRelative
  }
}
