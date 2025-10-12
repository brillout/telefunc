export { applyShield }

import { shieldApply, shieldIsMissing } from '../shield.js'
import { assertWarning, isProduction } from '../utils.js'
import type { Telefunction } from '../types.js'
import type { ConfigResolved } from '../serverConfig.js'

function applyShield(runContext: {
  telefunction: Telefunction
  telefunctionName: string
  telefuncFilePath: string
  telefunctionArgs: unknown[]
  serverConfig: Pick<ConfigResolved, 'log'>
}): { isValidRequest: boolean } {
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

  let logShieldErrors = runContext.serverConfig.log.shieldErrors
  if ((logShieldErrors.dev && !isProduction()) || (logShieldErrors.prod && isProduction())) {
    // TODO: don't show stack trace + add prefix 'Shield error:'
    const err = new Error(
      [
        `The arguments passed to the telefunction ${telefunctionName}() (${telefuncFilePath}) have the wrong type.`,
        `Arguments: \`${JSON.stringify(telefunctionArgs)}\`.`,
        `Wrong type: ${applyResult}`,
      ].join(' '),
    )
    console.error(err)
  }

  return { isValidRequest: false }
}
