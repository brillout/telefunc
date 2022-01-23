export { getTelefunctions }

import { assertUsage, isCallable } from '../utils'
import type { Telefunction, TelefuncFiles } from '../types'

async function getTelefunctions(runContext: { telefuncFiles: TelefuncFiles }): Promise<{
  telefunctions: Record<string, Telefunction>
}> {
  const telefunctions: Record<string, Telefunction> = {}
  Object.entries(runContext.telefuncFiles).forEach(([telefuncFileName, telefuncFileExports]) => {
    Object.entries(telefuncFileExports).forEach(([exportName, exportValue]) => {
      const telefunctionName = telefuncFileName + ':' + exportName
      assertTelefunction(exportValue, {
        exportName,
        telefuncFileName,
      })
      telefunctions[telefunctionName] = exportValue
    })
  })

  return { telefunctions }
}

function assertTelefunction(
  telefunction: unknown,
  {
    exportName,
    telefuncFileName,
  }: {
    exportName: string
    telefuncFileName: string
  },
): asserts telefunction is Telefunction {
  const errPrefix = `The telefunction \`${exportName}\` defined in \`${telefuncFileName}\``
  assertUsage(
    isCallable(telefunction),
    `${errPrefix} is not a function. A tele-*func*tion should always be a function.`,
  )
}
