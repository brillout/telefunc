import { dirname, join, resolve } from 'path'
import type { Compiler, LoaderDefinitionFunction } from 'webpack'
import { assert, moduleExists } from '../../server/utils'
import { isSSR } from './isSSR'

module.exports = async function (input) {
  const compiler = this._compiler!

  let entry: Record<string, unknown>
  if (typeof compiler.options.entry === 'function') {
    entry = await compiler.options.entry()
  } else {
    entry = compiler.options.entry
  }
  console.log(compiler.name)
  if (isSSR(compiler.name)) {
    return serverLoader.call(this, input, compiler)
  } else {
    return clientLoader.call(this, input, compiler)
  }
} as LoaderDefinitionFunction

const serverLoader: LoaderDefinitionFunction = async function serverLoader(input: string): string {

  let entry = await resolveWebpackEntry(this._compiler!)

  console.log(entry)
  // const telefuncDist = resolve(dirname(require.resolve('telefunc')), '../../../dist/')
  // {
  //   const filePath = join(telefuncDist, '/esm/plugin/webpack/importTelefuncFiles.js')
  //   assert(moduleExists(filePath))
  //   entry['server/importTelefuncFiles'] = {
  //     import: [filePath],
  //   }
  // }
  // {
  //   const filePath = join(telefuncDist, '/esm/plugin/webpack/importBuild.js')
  //   assert(moduleExists(filePath))
  //   entry['server/importBuild'] = {
  //     import: [filePath],
  //   }
  // }
  return input
}

function clientLoader(input: string, compiler: Compiler): string {

  return input

}

const resolveWebpackEntry = async (compiler: Compiler) => {
  const entry = compiler.options.entry
  if (typeof entry === 'function') {
    return entry()
  } else {
    return entry
  }
}
