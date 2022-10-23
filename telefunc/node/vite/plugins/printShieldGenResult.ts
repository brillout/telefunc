export { printShieldGenResult }

import type { Plugin, ResolvedConfig } from 'vite'
import { logResult } from '../../server/shield/codegen/generateShield'
import { viteIsSSR, projectInfo } from '../utils'
import pc from 'picocolors'

function printShieldGenResult(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'telefunc:printShieldGenResult',
    apply: 'build',
    configResolved(config_) {
      config = config_
    },
    async writeBundle() {
      if (viteIsSSR(config)) {
        await new Promise((r) => process.nextTick(r)) // Ensuring we log to the console after Vite
        const logSuccessPrefix = pc.green('✓')
        const logIntro = `${pc.cyan(`telefunc v${projectInfo.projectVersion}`)} ${pc.green('shield() generation')}`
        logResult(config.root, logSuccessPrefix, logIntro)
      }
    }
  }
}
