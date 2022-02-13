export { applyShield }

import { shieldApply, shieldIsMissing } from '../shield'
import { assertWarning, getPluginError } from '../../utils'
import type { Telefunction } from '../types'
import { Abort } from '../index'

function applyShield(runContext: {
  telefunction: Telefunction
  telefunctionName: string
  telefunctionArgs: unknown[]
  logInvalidRequests: boolean
}) {
  const { telefunction } = runContext
  const hasShield = !shieldIsMissing(telefunction)
  assertWarning(
    hasShield || telefunction.length === 0,
    `The telefunction ${runContext.telefunctionName} accepts arguments yet is missing a \`shield()\`, see https://telefunc.com/shield`,
  )
  if (hasShield) {
    const applyResult = shieldApply(telefunction, runContext.telefunctionArgs)
    if (applyResult !== true) {
      if (runContext.logInvalidRequests) {
        const errMsg = [
          `\`shield()\`: invalid arguments passed to telefunction ${runContext.telefunctionName}.`,
          `Arguments: \`${JSON.stringify(runContext.telefunctionArgs)}\`.`,
          `Error: ${applyResult}`,
        ].join(' ')
        console.error(getPluginError(errMsg))
      }
      throw Abort()
    }
  }
}
