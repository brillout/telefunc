export { assertManifest }

import { assertUsage, projectInfo, assert, hasProp, checkType } from '../../utils'

type Manifest = { version: string; config: Record<string, unknown> }

function assertManifest(manifest: Record<string, unknown>): asserts manifest is Manifest {
  assert(hasProp(manifest, 'version', 'string'))
  assertUsage(
    manifest.version === projectInfo.projectVersion,
    `Re-build your app (\`$ vite build\`). (You are using \`telefunc@${projectInfo.projectVersion}\` while your build has been generated with a different version \`telefunc@${manifest.version}\`.)`
  )
  assert(hasProp(manifest, 'config', 'object'))
  checkType<Manifest>(manifest)
}
