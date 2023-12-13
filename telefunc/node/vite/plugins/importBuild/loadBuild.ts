export { loadTelefuncFilesWithImportBuild }
export { setLoaders }

import { config } from '../../../server/serverConfig'
import { getGlobalObject } from '../../utils'
import { assertManifest } from './assertManifest'

const globalObject = getGlobalObject<{
  loadTelefuncFiles?: LoadTelefuncFiles
}>('loadBuild.ts', {})

type LoadTelefuncFiles = () => Promise<unknown>
type LoadManifest = () => Record<string, unknown>

function setLoaders({
  loadTelefuncFiles,
  loadManifest
}: {
  loadTelefuncFiles: LoadTelefuncFiles
  loadManifest: LoadManifest
}) {
  globalObject.loadTelefuncFiles = loadTelefuncFiles
  setServerConfig(loadManifest)
}

function setServerConfig(loadManifest: LoadManifest) {
  const manifest = loadManifest()
  assertManifest(manifest)
  Object.assign(config, manifest.config)
}

async function loadTelefuncFilesWithImportBuild(): Promise<unknown> {
  if (!globalObject.loadTelefuncFiles) {
    return null
  }
  const moduleExports = await globalObject.loadTelefuncFiles()
  return moduleExports
}
