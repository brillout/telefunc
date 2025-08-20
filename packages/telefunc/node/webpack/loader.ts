import { toPosixPath } from '../server/utils.js'
import { transformTelefuncFileClientSide } from '../transformer/transformTelefuncFileClientSide.js'
import { transformTelefuncFileServerSide } from '../transformer/transformTelefuncFileServerSide.js'
import type { Loader } from './types.js'
import { getInfo } from './getInfo.js'
// When running Telefunc's test suite, a previous Vite test may have generated files that need to be removed.
import { importGlobOff } from '../vite/importGlob/toggle.js'
importGlobOff()

export default async function (this: Loader, input: string): Promise<void> {
  this.async()
  const { id, root, isClientSide, isDev } = getInfo(this)
  if (isClientSide) {
    const { code, map } = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    this.callback(null, code, map)
  } else {
    const { code, map } = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root), isDev)
    this.callback(null, code, map)
  }
}
