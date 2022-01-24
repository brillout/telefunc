export { getExportNames }

import { init, parse } from 'es-module-lexer'
import { assert } from '../utils'

async function getExportNames(src: string) {
  await init
  const parseResult = parse(src)
  const exportNames = parseResult[1]
  assert(Array.isArray(exportNames as any), { src, exportNamesType: typeof exportNames })
  return exportNames
}
