export { getTelefunctions }

import { assertUsage, isCallable } from '../../utils'
import type { Telefunction, TelefuncFiles } from '../types'
import { getTelefunctionKey } from './getTelefunctionKey'

async function getTelefunctions(runContext: { telefuncFiles: TelefuncFiles }): Promise<{
  telefunctions: Record<string, Telefunction>
}> {
  const telefunctions: Record<string, Telefunction> = {}
  Object.entries(runContext.telefuncFiles).forEach(([telefunctionFilePath, telefuncFileExports]) => {
    Object.entries(telefuncFileExports).forEach(([telefunctionExportName, exportValue]) => {
      const telefunctionKey = getTelefunctionKey({ telefunctionFilePath, telefunctionExportName })
      assertTelefunction(exportValue, {
        telefunctionExportName,
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
    telefunctionExportName,
    telefunctionFilePath,
  }: {
    telefunctionExportName: string
    telefunctionFilePath: string
  },
): asserts telefunction is Telefunction {
  assertUsage(
    isCallable(telefunction),
    `The telefunction \`${telefunctionExportName}\` (${telefunctionFilePath}) is not a function. Make sure the \`export { ${telefunctionExportName} }\` of ${telefunctionFilePath} to be a function.`,
  )
}
