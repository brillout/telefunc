export { manifest }
export { manifestFileName }

import type { Plugin } from 'vite'
import { telefuncConfig, type ConfigUser } from '../../../server/serverConfig'
import { assert, viteIsSSR, projectInfo } from '../../utils'
import { assertManifest } from './assertManifest'

const manifestFileName = 'telefunc.json' as const

function manifest(config: ConfigUser = {}): Plugin {
  // - For dev
  // - Ensures that `config` is valid before this.emitFile() writes `dist/server/telefunc.json` to disk
  Object.assign(telefuncConfig, config)

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
        config
      }
      assertManifest(manifest)
      this.emitFile({
        fileName: manifestFileName,
        type: 'asset',
        source: JSON.stringify(manifest, null, 2)
      })
    },
    configResolved(config) {
      ssr = viteIsSSR(config)
    }
  }
}
