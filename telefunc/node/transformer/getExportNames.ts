export { getExportNames }

import { init, parse } from 'es-module-lexer'

async function getExportNames(src: string): Promise<string[]> {
  await init
  const parseResult = parse(src)
  const exports = parseResult[1]
  const exportNames = exports.map((e) => e.n)
  return exportNames
}
