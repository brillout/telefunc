export { importBuild }

import { serverProductionEntryPlugin } from '@brillout/vite-plugin-server-entry/plugin'
import type { Plugin } from 'vite'
import { assert, projectInfo } from '../utils.js'
import { getTelefuncManifest } from './importBuild/getTelefuncManifest.js'

function importBuild(): Plugin[] {
  return [
    ...serverProductionEntryPlugin({
      getServerProductionEntry: () => {
        return getServerProductionEntryCode()
      },
      libraryName: projectInfo.projectName,
    }),
  ]
}

function getServerProductionEntryCode() {
  const telefuncManifest = getTelefuncManifest()

  const { telefuncFilesGlobFilePath } = globalThis._telefunc!
  assert(telefuncFilesGlobFilePath)

  const importerCode = [
    `import { setTelefuncLoaders } from 'telefunc/__internal/loadBuildEntry';`,
    `import * as telefuncFiles from '${telefuncFilesGlobFilePath}';`,
    'setTelefuncLoaders({',
    `  loadTelefuncFiles: () => telefuncFiles,`,
    `  loadManifest: () => (${JSON.stringify(telefuncManifest, null, 2)})`,
    '});',
    '',
  ].join('\n')
  return importerCode
}
