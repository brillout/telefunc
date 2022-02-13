import { Plugin } from 'vite'
import { transform } from './transform'
import { build } from './build'
import { importBuild } from 'vite-plugin-import-build'
import { getImportBuildCode } from './getImportBuildCode'
import { packageJsonFile } from './packageJsonFile'
import { retrieveDevServer } from './retrieveDevServer'

export { plugin as telefunc }
export default plugin

function plugin(): Plugin[] {
  return [
    {
      name: 'telefunc:config',
      config: () => ({
        ssr: { external: ['telefunc'] },
        optimizeDeps: {
          include: ['telefunc/client', '@brillout/json-s/parse', '@brillout/json-s/stringify'],
        },
      }),
    },
    retrieveDevServer(),
    transform(),
    build(),
    importBuild(getImportBuildCode()),
    packageJsonFile(),
  ]
}
