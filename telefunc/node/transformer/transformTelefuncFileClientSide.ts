export { transformTelefuncFileClientSide }

import { getExportNames } from './getExportNames'
import { transformTelefuncFileClientSideSync } from './transformTelefuncFileClientSideSync'

async function transformTelefuncFileClientSide(src: string, id: string, appRootDir: string) {
  const exportNames = (await getExportNames(src)).map((e) => e.exportName)
  return transformTelefuncFileClientSideSync(id, appRootDir, exportNames)
}
