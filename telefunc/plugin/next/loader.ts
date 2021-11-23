import type { LoaderDefinitionFunction } from 'webpack'
import { toPosixPath } from '../../server/utils'
import { isSSR } from './isSSR'
import { transformTelefuncFile } from '../transformTelefuncFile'
import { transformTelefuncRouteFile } from './transformTelefuncRouteFile'
import { isTelefuncFile } from '../isTelefuncFile'
import { transformTelefuncFileSSR } from './transformTelefuncFileSSR'

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  if (isTelefuncRouteFile(id) && input.includes('@telefunc')) {
    const { code } = await transformTelefuncRouteFile(input, id, root)
    return code
  }

  if (isTelefuncFile(id) && isSSR(compiler.name)) {
    const { code } = await transformTelefuncFileSSR(input, id, root)
    return code
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
} as LoaderDefinitionFunction

function isTelefuncRouteFile(id: string) {
  return id.includes('_telefunc')
}