export { manifest }
export { manifestFileName }

import type { Plugin } from 'vite'
import { config, type ConfigUser } from '../../../server/serverConfig'
import { assert, viteIsSSR, projectInfo } from '../../utils'
import { assertManifest } from './assertManifest'

const manifestFileName = 'telefunc.json' as const

function manifest(configUser: ConfigUser = {}): Plugin {
  // - For dev
  // - Ensures that `configUser` is valid before this.emitFile() writes `dist/server/telefunc.json` to disk
  Object.assign(config, configUser)

  // For prod
  let ssr: boolean | undefined
  return {
    name: 'telefunc:manifest',
    apply: 'build' as const,
    generateBundle() {
      assert(typeof ssr === 'boolean')
      if (!ssr) return
      const manifest = {
        version: projectInfo.projectVersion,
        config: configUser
      }
      assertManifest(manifest)
      this.emitFile({
        fileName: manifestFileName,
        type: 'asset',
        source: JSON.stringify(manifest, null, 2)
      })
    },
    configResolved(viteConfig) {
      ssr = viteIsSSR(viteConfig)
    }
  }
}
