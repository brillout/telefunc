import type { LoaderDefinitionFunction } from 'webpack'
import { toPosixPath } from '../../server/utils'
import { isSSR } from './isSSR'
import { transformTelefuncFile } from '../transformTelefuncFile'
import { transformTelefuncRouteFile } from './transformTelefuncRouteFile'

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

module.exports = async function (input) {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  if (isTelefuncRouteFile(id)) {
    const { code } = await transformTelefuncRouteFile(input, id, root)
    return code
  }

  if (isSSR(compiler.name)) {
    return input
  }

  const { code } = await transformTelefuncFile(input, toPosixPath(id), toPosixPath(root))
  return code
} as LoaderDefinitionFunction

function isTelefuncRouteFile(id: string) {
  return id.includes('_telefunc')
}
