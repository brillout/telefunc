export { plugin as telefunc }
export default plugin

import { pluginTransformTelefuncFiles } from './plugins/pluginTransformTelefuncFiles.js'
import { pluginCommon } from './plugins/pluginCommon.js'
import { pluginDev } from './plugins/pluginDev.js'
import { pluginRetrieveDevServer } from './plugins/pluginRetrieveDevServer.js'
import { pluginDistPackageJsonFile } from './plugins/pluginDistPackageJsonFile.js'
import { pluginBuildEntry } from './plugins/pluginBuildEntry.js'
import { pluginPreview } from './plugins/pluginPreview.js'
import { pluginPrintShieldResult } from './plugins/pluginPrintShieldResult.js'
import { pluginVirtualFileEntry } from './plugins/pluginVirtualFileEntry.js'
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
    // TODO/now make each plugin in this list return Plugin[] instead of Plugin
    pluginVirtualFileEntry(),
    pluginTransformTelefuncFiles(),
    pluginCommon(),
    ...pluginDev(),
    pluginRetrieveDevServer(),
    pluginDistPackageJsonFile(),
    ...pluginBuildEntry(),
    pluginPreview(),
    pluginPrintShieldResult(),
  ]
  return plugins
}
