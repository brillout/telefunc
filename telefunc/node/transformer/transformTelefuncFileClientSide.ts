export { transformTelefuncFileClientSide }

import { rollupSourceMapRemove } from '../vite/utils.js'
import { getExportList } from './getExportList.js'
import { transformTelefuncFileClientSideSync } from './transformTelefuncFileClientSideSync.js'

async function transformTelefuncFileClientSide(src: string, id: string, appRootDir: string) {
  const exportList = await getExportList(src)
  const exportNames = exportList.map((e) => e.exportName)
  const { code } = transformTelefuncFileClientSideSync(id, appRootDir, exportNames)
  return rollupSourceMapRemove(code)
}
