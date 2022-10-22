export { applyShield }

import { shieldApply, shieldIsMissing } from '../shield'
import { assertWarning, isProduction } from '../../utils'
import type { Telefunction } from '../types'

function applyShield(runContext: {
  telefunction: Telefunction
  telefunctionName: string
  telefuncFilePath: string
  telefunctionArgs: unknown[]
  logInvalidRequests: boolean
}): { isValidRequest: boolean } {
  const { telefunction } = runContext

  const hasShield = !shieldIsMissing(telefunction)
  if (isProduction()) {
    assertWarning(
      hasShield || telefunction.length === 0,
      `The telefunction ${runContext.telefunctionName}() (${runContext.telefuncFilePath}) accepts arguments yet is missing shield(), see https://telefunc.com/shield`,
      { onlyOnce: true }
    )
  }
  if (!hasShield) {
    return { isValidRequest: true }
  }

  const applyResult = shieldApply(telefunction, runContext.telefunctionArgs)
  if (applyResult === true) {
    return { isValidRequest: true }
  }

  if (runContext.logInvalidRequests) {
    const err = new Error(
      [
        `The arguments passed to the telefunction ${runContext.telefunctionName}() (${runContext.telefuncFilePath}) have the wrong type.`,
        `Arguments: \`${JSON.stringify(runContext.telefunctionArgs)}\`.`,
        `Wrong type: ${applyResult}`
      ].join(' ')
    )
    console.error(err)
  }

  return { isValidRequest: false }
}
