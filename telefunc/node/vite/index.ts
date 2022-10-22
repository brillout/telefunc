export { plugin as telefunc }
export default plugin

import { transform } from './transform'
import { devConfig } from './plugins/devConfig'
import { build } from './build'
import { packageJsonFile } from './plugins/packageJsonFile'
import { retrieveDevServer } from './retrieveDevServer'
import type { Plugin } from 'vite'
import { importBuild } from './plugins/importBuild'
import { importGlobOn } from './importGlob'
import { previewConfig } from './plugins/previewConfig'
import { printShieldGenResult } from './plugins/printShieldGenResult'

// Return as `any` to avoid Plugin type mismatches when there are multiple Vite versions installed
function plugin(): any {
  importGlobOn()
  const plugins: Plugin[] = [
    {
      name: 'telefunc:config',
      config: () => ({
        ssr: { external: ['telefunc'] },
        optimizeDeps: {
          include: ['telefunc/client', '@brillout/json-s/parse', '@brillout/json-s/stringify']
        }
      })
    },
    retrieveDevServer(),
    transform(),
    build(),
    packageJsonFile(),
    ...importBuild(),
    ...devConfig(),
    previewConfig(),
    printShieldGenResult()
  ]
  return plugins
}
