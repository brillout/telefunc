import type { LoaderDefinitionFunction } from 'webpack'
import { assert, toPosixPath } from '../server/utils'
import { isSSR } from './isSSR'
import { transformTelefuncFileSSR } from '../transformer/transformTelefuncFileSSR'
import { transformTelefuncFile } from '../transformer/transformTelefuncFile'

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  assert(id.includes('.telefunc.'))

  if (isSSR(compiler)) {
    const { code } = await transformTelefuncFileSSR(input, toPosixPath(id), toPosixPath(root))
    return code
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root), false)
  return code
} as LoaderDefinitionFunction
