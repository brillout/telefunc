export { getTelefunctions }

import { assertUsage, isCallable } from '../../utils'
import type { Telefunction, TelefuncFiles } from '../types'
import { getTelefunctionKey } from './getTelefunctionKey'
import { getTelefunctionName } from './getTelefunctionName'

async function getTelefunctions(runContext: { telefuncFilesLoaded: TelefuncFiles }): Promise<{
  telefunctions: Record<string, Telefunction>
}> {
  const telefunctions: Record<string, Telefunction> = {}
  Object.entries(runContext.telefuncFilesLoaded).forEach(([telefunctionFilePath, telefuncFileExports]) => {
    Object.entries(telefuncFileExports).forEach(([telefunctionFileExport, exportValue]) => {
      const telefunctionKey = getTelefunctionKey({ telefunctionFilePath, telefunctionFileExport })
      assertTelefunction(exportValue, {
        telefunctionFileExport,
        telefunctionFilePath,
      })
      telefunctions[telefunctionKey] = exportValue
    })
  })

  return { telefunctions }
}

function assertTelefunction(
  telefunction: unknown,
  {
    telefunctionFileExport,
    telefunctionFilePath,
  }: {
    telefunctionFileExport: string
    telefunctionFilePath: string
  },
): asserts telefunction is Telefunction {
  assertUsage(
    isCallable(telefunction),
    `The telefunction ${getTelefunctionName({
      telefunctionFileExport,
      telefunctionFilePath,
    })} is not a function. Make sure the \`export { ${telefunctionFileExport} }\` of ${telefunctionFilePath} to be a function.`,
  )
}
