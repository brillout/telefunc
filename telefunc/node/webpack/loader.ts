import { toPosixPath } from '../utils.js'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide.js'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide.js'
import '../vite/helpers/clear.js' // When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.
import type { Loader } from './types.js'
import { getInfo } from './getInfo.js'

export default async function (this: Loader, input: string): Promise<void> {
  this.async()
  const { id, root, isClientSide, isDev } = getInfo(this)
  if (isClientSide) {
    const { code, map } = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    this.callback(null, code, map)
  } else {
    const { code, map } = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root), false, isDev)
    this.callback(null, code, map)
  }
}
