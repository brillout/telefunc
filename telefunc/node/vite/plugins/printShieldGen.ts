export { printShieldGen }

import type { Plugin, ResolvedConfig } from 'vite'
import { printGenStatus } from '../../server/shield/codegen/generateShield'
import { viteIsSSR } from '../utils'

function printShieldGen(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'telefunc:printShieldGen',
    apply: 'build',
    configResolved(config_) {
      config = config_
    },
    async writeBundle() {
      if (viteIsSSR(config)) {
        await new Promise((r) => process.nextTick(r)) // Ensuring we log to the console after Vite
        printGenStatus(config.root)
      }
    }
  }
}
