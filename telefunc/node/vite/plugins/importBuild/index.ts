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
  // Current file: node_modules/telefunc/dist/cjs/node/vite/plugins/importBuild/index.js
  const importPathAbsolute = toPosixPath(
    require.resolve(`../../../../../../dist/cjs/node/vite/plugins/importBuild/loadBuild.js`)
  )

  assert(config.build.ssr) // outDir needs to be the outDir of the server-side
  const outDir = getOutDirAbsolute(config)
  assertPosixPath(outDir)
  assertPosixPath(importPathAbsolute)
  const importPath = path.posix.relative(outDir, importPathAbsolute)
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
