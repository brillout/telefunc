import { assert, toPosixPath } from '../utils'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide'
import '../vite/clear' // When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.

// Subset of `import type { LoaderDefinitionFunction } from 'webpack'`
type Loader = {
  _compiler: {
    name: string
    context: string
  }
  resource: string
  mode: 'production' | 'development'
}

module.exports = async function (this: Loader, input: string): Promise<string> {
  assert(typeof this._compiler.name === 'string')
  const isClientSide = this._compiler.name !== 'server'
  assert(typeof this._compiler.context === 'string')
  const root = this._compiler!.context
  assert(typeof this.resource === 'string')
  const id = this.resource
  assert(id.includes('.telefunc.'))
  assert(this.mode === 'production' || this.mode === 'development')
  // const isDev = this.mode === 'dev'

  if (isClientSide) {
    const code = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    return code
  } else {
    const code = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root))
    return code
  }
}
