export { transformTelefuncFile }

import { getExportNames } from './getExportNames'
import { transformTelefuncFileSync } from './transformTelefuncFileSync'

async function transformTelefuncFile(src: string, id: string, root: string) {
  const exportNames = await getExportNames(src)
  return transformTelefuncFileSync(id, root, exportNames)
}
