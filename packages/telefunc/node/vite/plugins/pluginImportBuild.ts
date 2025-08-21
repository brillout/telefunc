export { pluginImportBuild }

import { serverProductionEntryPlugin } from '@brillout/vite-plugin-server-entry/plugin'
import type { Plugin } from 'vite'
import { assert, projectInfo } from '../utils.js'
import { getTelefuncManifest } from './importBuild/getTelefuncManifest.js'
import { VIRTUAL_FILE_ENTRY_ID } from './pluginVirtualFileEntry/VIRTUAL_FILE_ENTRY_ID.js'

function pluginImportBuild(): Plugin[] {
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

  const importerCode = [
    `import { setTelefuncLoaders } from 'telefunc/__internal/loadBuildEntry';`,
    `import * as telefuncFiles from '${VIRTUAL_FILE_ENTRY_ID}';`,
    'setTelefuncLoaders({',
    `  loadTelefuncFiles: () => telefuncFiles,`,
    `  loadManifest: () => (${JSON.stringify(telefuncManifest, null, 2)})`,
    '});',
    '',
  ].join('\n')
  return importerCode
}
