export { getExportList }
export type { ExportList }

import { init, parse } from 'es-module-lexer'

type ExportList = { exportName: string; localName: string | null }[]

async function getExportList(src: string): Promise<ExportList> {
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
