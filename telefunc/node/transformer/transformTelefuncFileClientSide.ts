export { transformTelefuncFileClientSide }

import { getExportNames } from './getExportNames'
import { transformTelefuncFileClientSideSync } from './transformTelefuncFileClientSideSync'

async function transformTelefuncFileClientSide(src: string, id: string, appRootDir: string) {
  const exportNames = await getExportNames(src)
  return transformTelefuncFileClientSideSync(id, appRootDir, exportNames)
}
