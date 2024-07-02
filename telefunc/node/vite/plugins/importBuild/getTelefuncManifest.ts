export { getTelefuncManifest }

import { config } from '../../../server/serverConfig'
import { projectInfo } from '../../utils'
import { type Manifest, assertManifest } from './assertManifest'

function getTelefuncManifest(): Manifest {
  const manifest = {
    version: projectInfo.projectVersion,
    config,
  }
  assertManifest(manifest)
  return manifest
}
