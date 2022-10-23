import { toPosixPath } from '../utils'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide'
import '../vite/clear' // When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.
import type { Loader } from './types'
import { getInfo } from './getInfo'

module.exports = async function (this: Loader, input: string): Promise<string> {
  const { id, root, isClientSide, isDev } = getInfo(this)
  if (isClientSide) {
    const code = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    return code
  } else {
    const code = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root), false, isDev)
    return code
  }
}
