import type { LoaderDefinitionFunction } from 'webpack'
import { toPosixPath } from '../../server/utils'
import { isSSR } from './isSSR'
import { transformTelefuncFile } from '../transformTelefuncFile'

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context
  if (isSSR(compiler.name)) {
    return input
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
} as LoaderDefinitionFunction
