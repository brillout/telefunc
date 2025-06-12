export { getTelefuncManifest }

import { config } from '../../../server/serverConfig.js'
import { projectInfo } from '../../utils.js'
import { assertManifest, type Manifest } from './assertManifest.js'

function getTelefuncManifest(): Manifest {
  const manifest = {
    version: projectInfo.projectVersion,
    config,
  }
  assertManifest(manifest)
  return manifest
}
