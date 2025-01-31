export { assertTelefunction }
export { getAssertTelefunctionErrMsg }

import { assertUsage, isCallable } from '../../utils'
import type { Telefunction } from '../types'

function assertTelefunction(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string,
): asserts exportValue is Telefunction {
  assertUsage(isCallable(exportValue), getAssertTelefunctionErrMsg(exportName, telefuncFilePath))
}
function getAssertTelefunctionErrMsg(exportName: string, telefuncFilePath: string) {
  return `\`export { ${exportName} }\` of ${telefuncFilePath} should be a function`
}
