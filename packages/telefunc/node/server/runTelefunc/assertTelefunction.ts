export { assertTelefunction }

import { assertWarning, isCallable } from '../utils.js'
import type { Telefunction } from '../types.js'
import pc from '@brillout/picocolors'

function assertTelefunction(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string,
): asserts exportValue is Telefunction {
  assertWarning(
    isCallable(exportValue),
    `${pc.code(`export { ${exportName} }`)} of ${pc.bold(telefuncFilePath)} should be a function https://telefunc.com/warning/non-function-export`,
    { onlyOnce: true },
  )
}
