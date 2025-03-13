import { toPosixPath } from '../utils.js'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide.js'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide.js'
import '../vite/helpers/clear.js' // When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.
import type { Loader } from './types.js'
import { getInfo } from './getInfo.js'

export default async function (this: Loader, input: string): Promise<string> {
  const { id, root, isClientSide, isDev } = getInfo(this)
  if (isClientSide) {
    const code = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    return code
  } else {
    const code = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root), false, isDev)
    return code
  }
}
