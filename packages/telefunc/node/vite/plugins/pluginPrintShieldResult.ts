export { pluginPrintShieldResult }

import type { Plugin, ResolvedConfig } from 'vite'
import { logResult } from '../../transformer/generateShield/generateShield.js'
import { projectInfo } from '../utils.js'
import pc from '@brillout/picocolors'
import { isViteServerSide_onlySsrEnv } from '../shared/isViteServerSide.js'

function pluginPrintShieldResult(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'telefunc:pluginPrintShieldResult',
    apply: 'build',
    // Note: configResolved hook doesn't benefit from filters since it's called once per build session
    configResolved: {
      handler(config_) {
        config = config_
      },
    },
    writeBundle: {
      // Note: We can't easily filter by server-side vs client-side at the filter level
      // since it depends on runtime environment context, so we keep the runtime check
      async handler() {
        if (isViteServerSide_onlySsrEnv(config, this.environment)) {
          await new Promise((r) => process.nextTick(r)) // Ensuring we log to the console after Vite
          const logSuccessPrefix = pc.green('✓')
          const logIntro = `${pc.cyan(`telefunc v${projectInfo.projectVersion}`)} ${pc.green('shield() generation')}`
          logResult(config.root, logSuccessPrefix, logIntro)
        }
      },
    },
  }
}
