export { plugin as telefunc }
export default plugin

import type { Plugin } from 'vite'
import { transform } from './plugins/transform'
import { commonConfig } from './plugins/commonConfig'
import { devConfig } from './plugins/devConfig'
import { buildConfig } from './plugins/buildConfig'
import { retrieveDevServer } from './plugins/retrieveDevServer'
import { packageJsonFile } from './plugins/packageJsonFile'
import { importBuild } from './plugins/importBuild'
import { previewConfig } from './plugins/previewConfig'
import { printShieldGenResult } from './plugins/printShieldGenResult'
import { manifest } from './plugins/manifest'
import { importGlobOn } from './importGlob/toggle'

import { ConfigUser } from '../server/serverConfig'

// Return as `any` to avoid Plugin type mismatches when there are multiple Vite versions installed
function plugin(config?: ConfigUser): any {
  importGlobOn()

  const plugins: Plugin[] = [
    transform(),
    commonConfig(),
    ...devConfig(),
    ...buildConfig(),
    retrieveDevServer(),
    packageJsonFile(),
    ...importBuild(),
    previewConfig(),
    manifest(config),
    printShieldGenResult()
  ]
  return plugins
}
