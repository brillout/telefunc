export { assertTelefunction }

import { assertUsage, isCallable } from '../../utils'
import type { Telefunction } from '../types'
import pc from '@brillout/picocolors'

function assertTelefunction(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string,
): asserts exportValue is Telefunction {
  assertUsage(
    isCallable(exportValue),
    `${pc.code(`export { ${exportName} }`)} of ${pc.bold(telefuncFilePath)} should be a function`,
  )
}
