import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide'
import { toPosixPath } from '../utils'
import '../vite/helpers/clear' // When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.
import { getInfo } from './getInfo'
import type { Loader } from './types'

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
