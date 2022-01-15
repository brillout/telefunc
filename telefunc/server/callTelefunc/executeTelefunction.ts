export { executeTelefunction }

import { provideContext, Telefunc } from '../getContext'
import { Telefunction } from '../../shared/types'
import { assertUsage, isPromise } from '../utils'

async function executeTelefunction(callContext: {
  _telefunctionName: string
  _telefunctionArgs: unknown[]
  _telefunctions: Record<string, Telefunction>
  _providedContext: Telefunc.Context | null
}) {
  const telefunctionName = callContext._telefunctionName
  const telefunctionArgs = callContext._telefunctionArgs
  const telefunctions = callContext._telefunctions
  const telefunction = telefunctions[telefunctionName]

  if (callContext._providedContext) {
    provideContext(callContext._providedContext)
  }

  let resultSync: unknown
  let telefunctionError: unknown
  let telefunctionHasErrored = false
  try {
    resultSync = telefunction.apply(null, telefunctionArgs)
  } catch (err) {
    telefunctionHasErrored = true
    telefunctionError = err
  }

  let telefunctionReturn: unknown
  if (!telefunctionHasErrored) {
    assertUsage(
      isPromise(resultSync),
      `The telefunction ${telefunctionName} did not return a promise. Telefunctions should always return a promise. You can define ${telefunctionName} as \`async function\` (or \`async () => {}\`).`,
    )
    try {
      telefunctionReturn = await resultSync
    } catch (err) {
      telefunctionHasErrored = true
      telefunctionError = err
    }
  }

  return { telefunctionReturn, telefunctionHasErrored, telefunctionError }
}
