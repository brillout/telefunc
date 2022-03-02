export { dynamicImport }

import { pathToFileURL } from 'url'

async function dynamicImport(filePath: string): Promise<Record<string, unknown>> {
  return new Function('file', 'return import(file)')(pathToFileURL(filePath).href)
}
