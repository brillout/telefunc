export { getExportNames }
export type { ExportNames }

import { init, parse } from 'es-module-lexer'

type ExportNames = { exportName: string; localName: string | null }[]

async function getExportNames(src: string): Promise<ExportNames> {
  await init
  const parseResult = parse(src)
  const exports = parseResult[1]
  const exportNames = exports.map((e) => {
    const exportName = e.n
    const localName = e.ln ?? null
    return { exportName, localName }
  })
  return exportNames
}
