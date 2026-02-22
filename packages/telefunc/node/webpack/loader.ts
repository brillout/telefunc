import { toPosixPath } from '../../utils/path.js'
import { transformTelefuncFileClientSide } from '../shared/transformer/transformTelefuncFileClientSide.js'
import { transformTelefuncFileServerSide } from '../shared/transformer/transformTelefuncFileServerSide.js'
import type { Loader } from './types.js'
import { getInfo } from './getInfo.js'

export default async function (this: Loader, input: string): Promise<void> {
  this.async()
  const { id, root, isClientSide, isDev } = getInfo(this)
  if (isClientSide) {
    const { code, map } = await transformTelefuncFileClientSide(input, toPosixPath(id), toPosixPath(root))
    this.callback(null, code, map)
  } else {
    const res = await transformTelefuncFileServerSide(input, toPosixPath(id), toPosixPath(root), isDev)
    if (!res) return
    const { code, map } = res
    this.callback(null, code, map)
  }
}
