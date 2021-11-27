import type { LoaderDefinitionFunction } from 'webpack'
import { assert, toPosixPath } from '../../server/utils'
import { isTelefuncFile } from '../isTelefuncFile'
import { isSSR } from './isSSR'
import { transformTelefuncFileSSR } from '../transformTelefuncFileSSR'
import { transformTelefuncFile } from '../transformTelefuncFile'

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  assert(isTelefuncFile(id))

  if (isSSR(compiler.name)) {
    const { code } = await transformTelefuncFileSSR(input, id, root)
    return code
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
} as LoaderDefinitionFunction
