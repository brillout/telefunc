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

// Ensures following works: `const telefunc = require('telefunc/vite')` / `import telefunc from 'telefunc/vite'`
//  - It needs to live at the end of this file, in order to ensure we do it after all assignments to `exports`.
try {
  module.exports = Object.assign(exports.default, exports)
} catch {}
