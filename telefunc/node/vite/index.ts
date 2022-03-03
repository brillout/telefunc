export { plugin as telefunc }
export default plugin

import { transform } from './transform'
import { build } from './build'
// import { importBuild } from 'vite-plugin-import-build'
// import { getImportBuildCode } from './getImportBuildCode'
import { packageJsonFile } from './packageJsonFile'
import { retrieveDevServer } from './retrieveDevServer'
import type { Plugin } from 'vite'
import { distLinkOn, distLinkOff } from './distLink'
import { importGlobOn } from './importGlob'

function plugin(): Plugin[] {
  distLinkOff()
  importGlobOn()
  return [
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
    //importBuild(getImportBuildCode()),
    packageJsonFile(),
    distLinkOn()
  ]
}
