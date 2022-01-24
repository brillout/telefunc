import type { LoaderDefinitionFunction } from 'webpack'
import { assert, toPosixPath } from '../utils'
import { transformTelefuncFile } from '../transformer/transformTelefuncFile'
import { transformTelefuncFileSSR } from '../transformer/transformTelefuncFileSSR'

module.exports = <LoaderDefinitionFunction>async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  assert(id.includes('.telefunc.'))

  const isSSR = compiler.name === 'server'
  if (isSSR) {
    const { code } = await transformTelefuncFileSSR(input, toPosixPath(id), toPosixPath(root))
    return code
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
}
