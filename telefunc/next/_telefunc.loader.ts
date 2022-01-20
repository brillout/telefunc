import type { LoaderDefinitionFunction } from 'webpack'
import { transformTelefuncRouteFile } from './transformTelefuncRouteFile'

module.exports = async function (input) {
  const id = this.resource
  const root = this._compiler!.context

  const { code } = await transformTelefuncRouteFile(input, id, root)
  return code
} as LoaderDefinitionFunction
