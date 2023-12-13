export { plugin as telefunc }
export default plugin

import { transform } from './plugins/transform'
import { commonConfig } from './plugins/commonConfig'
import { devConfig } from './plugins/devConfig'
import { buildConfig } from './plugins/buildConfig'
import { retrieveDevServer } from './plugins/retrieveDevServer'
import { packageJsonFile } from './plugins/packageJsonFile'
import { importBuild } from './plugins/importBuild'
import { previewConfig } from './plugins/previewConfig'
import { printShieldGenResult } from './plugins/printShieldGenResult'
import { importGlobOn } from './importGlob/toggle'
import { config } from '../server/serverConfig'
import type { Plugin } from 'vite'
import type { ConfigUser } from '../server/serverConfig'

// Return as `any` to avoid Plugin type mismatches when there are multiple Vite versions installed
function plugin(configUser?: ConfigUser): any {
  importGlobOn()

  // - For dev
  // - Ensures that `configUser` is valid before `config` is serialized while building
  Object.assign(config, configUser)

  const plugins: Plugin[] = [
    transform(),
    commonConfig(),
    ...devConfig(),
    ...buildConfig(),
    retrieveDevServer(),
    packageJsonFile(),
    ...importBuild(),
    previewConfig(),
    printShieldGenResult()
  ]
  return plugins
}
