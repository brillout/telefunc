export { buildConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import { determineOutDir } from '../utils'

function buildConfig(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'telefunc:buildConfig',
    apply: 'build',
    enforce: 'post',
    configResolved(config_) {
      config = config_
      setOutDir(config)
    }
  }
}
function setOutDir(config: ResolvedConfig) {
  const outDir = determineOutDir(config)
  if (outDir) config.build.outDir = outDir
}
