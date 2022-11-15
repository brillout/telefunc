export { previewConfig }

import type { Plugin, ResolvedConfig } from 'vite'
import { assertUsage, getOutDirs, determineOutDir } from '../utils'
import { apply, addTelefuncMiddleware } from '../helpers'
import fs from 'fs'

function previewConfig(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'vite-plugin-ssr:previewConfig',
    apply: apply('preview'),
    configResolved(config_) {
      config = config_
      const outDir = determineOutDir(config) ?? undefined
      if (outDir) config.build.outDir = outDir
    },
    // Ensure that SvelteKit's configurePreviewServer() has precedence, see https://github.com/brillout/telefunc/pull/54
    enforce: 'post',
    configurePreviewServer(server) {
      return () => {
        assertDist()
        ;(process.env as Record<string, string>).NODE_ENV = 'production'
        addTelefuncMiddleware(server.middlewares)
      }
    }
  }
  function assertDist() {
    let { outDirRoot, outDirClient, outDirServer } = getOutDirs(config)
    ;[outDirRoot, outDirClient, outDirServer].forEach((outDirAny) => {
      assertUsage(
        fs.existsSync(outDirAny),
        `Cannot run \`$ vite preview\`: your app isn't built (the build directory ${outDirAny} is missing). Make sure to run \`$ vite build\` before running \`$ vite preview\`.`
      )
    })
  }
}
