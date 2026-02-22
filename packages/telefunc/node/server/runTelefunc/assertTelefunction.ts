export { assertTelefunction }

import { assertWarning } from '../../../utils/assert.js'
import { isCallable } from '../../../utils/isCallable.js'
import type { Telefunction } from '../types.js'
import pc from '@brillout/picocolors'

function assertTelefunction(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string,
): asserts exportValue is Telefunction {
  assertWarning(
    isCallable(exportValue),
    `${pc.code(`export { ${exportName} }`)} of ${pc.bold(telefuncFilePath)} should be a function ${pc.underline('https://telefunc.com/warning/non-function-export')}`,
    { onlyOnce: true },
  )
}
