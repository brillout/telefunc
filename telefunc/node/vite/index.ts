export { plugin as telefunc }
export default plugin

import type { Plugin } from 'vite'
import { config } from '../server/serverConfig'
import type { ConfigUser } from '../server/serverConfig'
import { importGlobOn } from './importGlob/toggle'
import { buildConfig } from './plugins/buildConfig'
import { commonConfig } from './plugins/commonConfig'
import { devConfig } from './plugins/devConfig'
import { importBuild } from './plugins/importBuild'
import { packageJsonFile } from './plugins/packageJsonFile'
import { previewConfig } from './plugins/previewConfig'
import { printShieldGenResult } from './plugins/printShieldGenResult'
import { retrieveDevServer } from './plugins/retrieveDevServer'
import { transform } from './plugins/transform'

// Return as `any` to avoid Plugin type mismatches when there are multiple Vite versions installed
function plugin(
  /** @deprecated */
  configUser?: never,
): any {
  importGlobOn()

  // We use this for minimal /examples/* that don't have any server code.
  // Telefunc users aren't expected to use this. (We expect users to always have server code.)
  Object.assign(config, configUser as undefined | ConfigUser)

  const plugins: Plugin[] = [
    transform(),
    commonConfig(),
    ...devConfig(),
    buildConfig(),
    retrieveDevServer(),
    packageJsonFile(),
    ...importBuild(),
    previewConfig(),
    printShieldGenResult(),
  ]
  return plugins
}
