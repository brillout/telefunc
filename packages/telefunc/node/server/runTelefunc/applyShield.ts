export { applyShield }

import { shieldApply, shieldIsMissing, type ShieldResult } from '../shield.js'
import { assertWarning } from '../../../utils/assert.js'
import { isProduction } from '../../../utils/isProduction.js'
import type { Telefunction } from '../types.js'
import type { ConfigResolved } from '../serverConfig.js'

function applyShield<Args extends unknown[]>(runContext: {
  telefunction: Telefunction
  telefunctionName: string
  telefuncFilePath: string
  telefunctionArgs: Args
  serverConfig: Pick<ConfigResolved, 'log'>
}): ShieldResult<Args> {
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
    return { validatedArguments: telefunctionArgs }
  }

  const applyResult = shieldApply(telefunction, telefunctionArgs)
  if (!applyResult.error) {
    return { validatedArguments: applyResult.validatedArguments }
  }

  let logShieldErrors = runContext.serverConfig.log.shieldErrors
  if ((logShieldErrors.dev && !isProduction()) || (logShieldErrors.prod && isProduction())) {
    const errMsg = [
      `Shield Validation Error: the arguments passed to the telefunction ${telefunctionName}() (${telefuncFilePath}) have the wrong type.`,
      `Arguments: \`${JSON.stringify(telefunctionArgs)}\`.`,
      `Wrong type: ${applyResult.error.message}`,
    ].join(' ')
    console.error(errMsg)
  }

  return { error: applyResult.error }
}
