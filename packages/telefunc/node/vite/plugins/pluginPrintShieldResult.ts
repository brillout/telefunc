export { pluginPrintShieldResult }

import type { Plugin, ResolvedConfig } from 'vite'
import { logResult } from '../../shared/transformer/generateShield/generateShield.js'
import { projectInfo } from '../../../utils/projectInfo.js'
import pc from '@brillout/picocolors'
import { isViteServerSide_onlySsrEnv } from '../shared/isViteServerSide.js'

function pluginPrintShieldResult(): Plugin[] {
  let config: ResolvedConfig
  return [
    {
      name: 'telefunc:pluginPrintShieldResult',
      apply: 'build',
      configResolved: {
        handler(config_) {
          config = config_
        },
      },
      writeBundle: {
        async handler() {
          if (isViteServerSide_onlySsrEnv(config, this.environment)) {
            await new Promise((r) => process.nextTick(r)) // Ensuring we log to the console after Vite
            const logSuccessPrefix = pc.green('✓')
            const logIntro = `${pc.cyan(`telefunc v${projectInfo.projectVersion}`)} ${pc.green('shield() generation')}`
            logResult(config.root, logSuccessPrefix, logIntro)
          }
        },
      },
    },
  ]
}
