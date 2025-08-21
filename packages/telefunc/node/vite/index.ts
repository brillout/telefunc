export { plugin as telefunc }
export default plugin

import { transform } from './plugins/transform.js'
import { commonConfig } from './plugins/commonConfig.js'
import { devConfig } from './plugins/devConfig.js'
import { retrieveDevServer } from './plugins/retrieveDevServer.js'
import { packageJsonFile } from './plugins/packageJsonFile.js'
import { importBuild } from './plugins/importBuild.js'
import { previewConfig } from './plugins/previewConfig.js'
import { printShieldGenResult } from './plugins/printShieldGenResult.js'
import { virtualModule } from './plugins/virtualModule.js'
import { config } from '../server/serverConfig.js'
import type { Plugin } from 'vite'
import type { ConfigUser } from '../server/serverConfig.js'

// Return as `any` to avoid Plugin type mismatches when there are multiple Vite versions installed
function plugin(
  /** @deprecated */
  configUser?: never,
): any {
  // We use this for minimal /examples/* that don't have any server code.
  // Telefunc users aren't expected to use this. (We expect users to always have server code.)
  Object.assign(config, configUser as undefined | ConfigUser)

  const plugins: Plugin[] = [
    virtualModule(),
    transform(),
    commonConfig(),
    ...devConfig(),
    retrieveDevServer(),
    packageJsonFile(),
    ...importBuild(),
    previewConfig(),
    printShieldGenResult(),
  ]
  return plugins
}
