export { plugin as telefunc }
export default plugin

import { pluginTransform } from './plugins/pluginTransform.js'
import { pluginCommonConfig } from './plugins/pluginCommonConfig.js'
import { pluginDevConfig } from './plugins/pluginDevConfig.js'
import { pluginRetrieveDevServer } from './plugins/pluginRetrieveDevServer.js'
import { pluginPackageJsonFile } from './plugins/pluginPackageJsonFile.js'
import { pluginImportBuild } from './plugins/pluginImportBuild.js'
import { pluginPreviewConfig } from './plugins/pluginPreviewConfig.js'
import { pluginPrintShieldGenResult } from './plugins/pluginPrintShieldGenResult.js'
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
    pluginVirtualFileEntry(),
    pluginTransform(),
    pluginCommonConfig(),
    ...pluginDevConfig(),
    pluginRetrieveDevServer(),
    pluginPackageJsonFile(),
    ...pluginImportBuild(),
    pluginPreviewConfig(),
    pluginPrintShieldGenResult(),
  ]
  return plugins
}
