export { getTelefunctions }

import { getTelefunctionKey } from '../../utils'
import type { Telefunction, TelefuncFiles } from '../types'
import { assertTelefunction } from './assertTelefunction'

async function getTelefunctions(runContext: { telefuncFilesLoaded: TelefuncFiles }): Promise<{
  telefunctions: Record<string, Telefunction>
}> {
  const telefunctions: Record<string, Telefunction> = {}
  Object.entries(runContext.telefuncFilesLoaded).forEach(([telefuncFilePath, telefuncFileExports]) => {
    Object.entries(telefuncFileExports).forEach(([exportName, exportValue]) => {
      assertTelefunction(exportValue, exportName, telefuncFilePath)
      const telefunctionKey = getTelefunctionKey(telefuncFilePath, exportName)
      telefunctions[telefunctionKey] = exportValue
      // @ts-ignore
      // telefunctions[telefunctionKey]._key = telefunctionKey
    })
  })

  return { telefunctions }
}
