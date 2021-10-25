import { createUnplugin } from 'unplugin'
import { resolve, dirname, join } from 'path'
import { Compiler } from 'webpack'
import { assert, moduleExists } from '../../server/utils'
import { isSSR } from './isSSR'

export const unpluginBuild = createUnplugin(() => {
  return {
    name: 'telefunc:build',
    // better way to emit files?
    async webpack(compiler: Compiler) {
      if (!isSSR()) {
        return
      }

      // No additonal files emitting, so no different result than client build
      compiler.hooks.shouldEmit.tap('telefunc', (compilation) => {
        Object.keys(compilation.assets).forEach((k) => {
          if (k.includes('server/importBuild.js')) {
            return
          }
          if (k.includes('server/importTelefuncFiles.js')) {
            return
          }
          delete compilation.assets[k]
        })
        return true
      })

      compiler.options.externals = normalizeWebpackExternals(compiler.options.externals)!
      let entry: Record<string, unknown>
      if (typeof compiler.options.entry === 'function') {
        entry = await compiler.options.entry()
      } else {
        entry = compiler.options.entry
      }

      // faster build through building only the telefunc files
      Object.keys(entry).forEach((k) => delete entry[k])

      const telefuncDist = resolve(dirname(require.resolve('telefunc')), '../../dist/')
      {
        const filePath = join(telefuncDist,'/esm/plugin/webpack/importTelefuncFiles.js')
        assert(moduleExists(filePath))
        entry['server/importTelefuncFiles'] = {
          import: [filePath],
        }
      }
      {
        const filePath = join(telefuncDist,'/esm/plugin/webpack/importBuild.js')
        assert(moduleExists(filePath))
        entry['server/importBuild'] = {
          import: [filePath],
        }
      }
    },
  }
})

function normalizeWebpackExternals(externals?: Compiler['options']['externals']) {
  if (!externals) {
    return {
      telefunc: 'commonjs2 telefunc',
      './importTelefuncFiles.js': 'commonjs2 ./importTelefuncFiles.js',
    }
  }
  // if user defines externals, they need to add telefunc to the object
  return externals
}
