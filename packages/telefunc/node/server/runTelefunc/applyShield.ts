export { applyShield }

import { createShieldValidationError } from '../../../shared/shieldValidationError.js'
import type { ShieldValidationErrorPayload } from '../../../shared/shieldValidationError.js'
import { shieldApply, shieldIsMissing } from '../shield.js'
import { assertWarning } from '../../../utils/assert.js'
import { isProduction } from '../../../utils/isProduction.js'
import type { Telefunction } from '../types.js'
import type { ConfigResolved } from '../serverConfig.js'

function applyShield(runContext: {
  telefunction: Telefunction
  telefunctionName: string
  telefuncFilePath: string
  telefunctionArgs: unknown[]
  serverConfig: Pick<ConfigResolved, 'log'>
}): { isValidRequest: true } | { isValidRequest: false; validationError: ShieldValidationErrorPayload } {
  const { telefunction, telefunctionArgs, telefunctionName, telefuncFilePath } = runContext

  const hasShield = !shieldIsMissing(telefunction)
  if (isProduction()) {
    assertWarning(
      hasShield || telefunctionArgs.length === 0,
      `The telefunction ${telefunctionName}() (${telefuncFilePath}) accepts arguments yet is missing shield(), see https://telefunc.com/shield`,
      { onlyOnce: true },
    )
  }
  if (!hasShield) {
    return { isValidRequest: true }
  }

  const applyResult = shieldApply(telefunction, telefunctionArgs)
  if (applyResult === true) {
    return { isValidRequest: true }
  }
  const validationError =
    typeof applyResult === 'string' ? createShieldValidationError({ message: applyResult }) : applyResult

  let logShieldErrors = runContext.serverConfig.log.shieldErrors
  if ((logShieldErrors.dev && !isProduction()) || (logShieldErrors.prod && isProduction())) {
    const errMsg = [
      `Shield Validation Error: the arguments passed to the telefunction ${telefunctionName}() (${telefuncFilePath}) have the wrong type.`,
      `Arguments: \`${JSON.stringify(telefunctionArgs)}\`.`,
      `Wrong type: ${validationError.message}`,
    ].join(' ')
    console.error(errMsg)
  }

  return { isValidRequest: false, validationError }
}
