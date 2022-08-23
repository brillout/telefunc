export { plugin as telefunc }
export default plugin

import { transform } from './transform'
import { build } from './build'
import { packageJsonFile } from './packageJsonFile'
import { retrieveDevServer } from './retrieveDevServer'
import type { Plugin } from 'vite'
import { importBuild } from './plugins/importBuild'
import { importGlobOn } from './importGlob'

function plugin(): Plugin[] {
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
    packageJsonFile(),
    ...importBuild()
  ]
}
