export { transformTelefuncFileClientSide }

import { getExportList } from './getExportList'
import { transformTelefuncFileClientSideSync } from './transformTelefuncFileClientSideSync'

async function transformTelefuncFileClientSide(src: string, id: string, appRootDir: string) {
  const exportNames = (await getExportList(src)).map((e) => e.exportName)
  return transformTelefuncFileClientSideSync(id, appRootDir, exportNames)
}
