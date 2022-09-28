import { assert, toPosixPath } from '../utils'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide'
import '../vite/clear' // When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.

// Subset of `import type { LoaderDefinitionFunction } from 'webpack'`
type Loader = {
  _compiler?: {
    name: string
    context: string
  }
  resource: string
}

module.exports = async function (this: Loader, input: string): Promise<string> {
  const compiler = this._compiler!
  const id = this.resource
  const root = this._compiler!.context

  assert(id.includes('.telefunc.'))

  const isClientSide = compiler.name !== 'server'
  if (isClientSide) {
    const code = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    return code
  } else {
    const code = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root))
    return code
  }
}
