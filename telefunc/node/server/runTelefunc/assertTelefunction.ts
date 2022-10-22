import { assertUsage, isCallable } from '../../utils'
import type { Telefunction } from '../types'

export function assertTelefunction(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string
): asserts exportValue is Telefunction {
  assertUsage(isCallable(exportValue), `\`export { ${exportName} }\` of ${telefuncFilePath} should be a function`)
}
