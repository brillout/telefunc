export { printShieldGenResult }

import type { Plugin, ResolvedConfig } from 'vite'
import { printResult } from '../../server/shield/codegen/generateShield'
import { viteIsSSR } from '../utils'

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
        printResult(config.root)
      }
    }
  }
}
