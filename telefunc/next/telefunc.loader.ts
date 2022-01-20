import type { LoaderDefinitionFunction } from 'webpack'
import { toPosixPath } from '../server/utils'
import { isSSR } from './isSSR'
import { transformTelefuncFile } from '../transformer/transformTelefuncFile'
import { transformTelefuncFileSSR } from '../transformer/transformTelefuncFileSSR'

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  if (isSSR(compiler.name)) {
    const { code } = await transformTelefuncFileSSR(input, toPosixPath(id), toPosixPath(root))
    return code
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
} as LoaderDefinitionFunction
