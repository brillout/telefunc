import type { LoaderDefinitionFunction } from 'webpack'
import { toPosixPath } from '../../server/utils'
import { isSSR } from '../next/isSSR'
import { transformTelefuncFile } from '../transformTelefuncFile'
import { isTelefuncFile } from '../isTelefuncFile'

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context
  console.log(compiler.name)

  // if (isTelefuncRouteFile(id) && input.includes('@telefunc')) {
  //   const { code } = await transformTelefuncRouteFile(input, id, root)
  //   return code
  // }

  // if (isTelefuncFile(id) && isSSR(compiler.name)) {
  //   const { code } = await transformTelefuncFileSSR(input, id, root)
  //   return code
  // }
  if (isSSR(compiler.name)) {
    return input
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
} as LoaderDefinitionFunction
