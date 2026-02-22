export { assertManifest }
export type { Manifest }

import { assertUsage, assert } from '../../../../utils/assert.js'
import { checkType } from '../../../../utils/checkType.js'
import { hasProp } from '../../../../utils/hasProp.js'
import { projectInfo } from '../../../../utils/projectInfo.js'

type Manifest = { version: string; config: Record<string, unknown> }

function assertManifest(manifest: Record<string, unknown>): asserts manifest is Manifest {
  assert(hasProp(manifest, 'version', 'string'))
  assertUsage(
    manifest.version === projectInfo.projectVersion,
    `Re-build your app. (You are using \`telefunc@${projectInfo.projectVersion}\` while your build has been generated with a different version \`telefunc@${manifest.version}\`.)`,
  )
  assert(hasProp(manifest, 'config', 'object'))
  checkType<Manifest>(manifest)
}
