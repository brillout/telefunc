import { dirname, join, relative, resolve } from 'path'
import { readFile } from 'fs/promises'
import type { Compiler, LoaderDefinitionFunction } from 'webpack'
import { assert, moduleExists } from '../../server/utils'
import { isSSR } from './isSSR'

const isWin = process.platform === 'win32'

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

module.exports = async function (input) {
  const compiler = this._compiler!


  if (isSSR(compiler.name)) {
    return serverLoader.call(this, input)
  } else {
    return clientLoader.call(this, input)
  }
} as LoaderDefinitionFunction

const serverLoader: LoaderDefinitionFunction = async function serverLoader(input: string) {
  let entry = await resolveWebpackEntry(this._compiler!)

  let root = process.cwd()
  // console.log(this._compiler.options.externals )
  const telefuncDist = resolve(dirname(require.resolve('telefunc')), '../../../dist/')

  {
    const rootPathForWin = relative(__dirname, root).replace(/\\/g, '/')
    const filePath = join(telefuncDist, '/esm/plugin/webpack/importTelefuncFiles.js')
    const fileContent = await readFile(filePath, 'utf-8')
    this.emitFile(
      'importTelefuncFiles.js',
      fileContent.replace('@telefunc/REPLACE_PATH', isWin ? rootPathForWin : root),
    )
    assert(moduleExists(filePath))
  }

  {
    const filePath = join(telefuncDist, '/esm/plugin/webpack/importBuild.js')
    assert(moduleExists(filePath))
  }

  updateWebpackEntry(this._compiler!, entry)
  // console.log(entry)
  return input
}

const clientLoader: LoaderDefinitionFunction = function clientLoader(input: string): string {
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
const updateWebpackEntry = async (
  compiler: Compiler,
  newEntry: PromiseType<ReturnType<typeof resolveWebpackEntry>>,
) => {
  newEntry = {}
  if (typeof compiler.options.entry === 'function') {
    compiler.options.entry = async () => newEntry
  } else {
    compiler.options.entry = newEntry
  }
}
