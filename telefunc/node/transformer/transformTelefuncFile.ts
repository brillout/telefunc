export { transformTelefuncFile }

import { getExportNames } from './getExportNames'
import {getCode, transformTelefuncFileSync} from './transformTelefuncFileSync'
async function transformTelefuncFile(src: string, id: string, root: string): Promise<{ code: string; map: null }>;
async function transformTelefuncFile(src: string): Promise<{ code: string; map: null }>;
async function transformTelefuncFile(src: string, id?: string, root?: string) {
  const exportNames = await getExportNames(src);
  if(id !== undefined && root !== undefined) {
    return transformTelefuncFileSync(id, root, exportNames)
  }
  else { // just the src specified ?
    return {
      code: getCode(exportNames, src),
      map: null
    }
  }
}
