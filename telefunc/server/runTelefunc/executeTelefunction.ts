export { executeTelefunction }

import { isAbort } from '../Abort'
import { provideContext, Telefunc } from '../getContext'
import { Telefunction } from '../types'
import { assertUsage, isPromise } from '../utils'

import { callTelefunctionErrorListeners } from './onTelefunctionError'

async function executeTelefunction(runContext: {
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefunctions: Record<string, Telefunction>
  providedContext: Telefunc.Context | null
}) {
  const telefunctionName = runContext.telefunctionName
  const telefunctionArgs = runContext.telefunctionArgs
  const telefunctions = runContext.telefunctions
  const telefunction = telefunctions[telefunctionName]

  if (runContext.providedContext) {
    provideContext(runContext.providedContext)
  }

  let telefunctionError: unknown
  let telefunctionHasErrored = false
  let telefunctionAborted = false
  const onError = (err: unknown) => {
    if (isAbort(err)) {
      telefunctionAborted = true
      telefunctionReturn = err.value
    } else {
      telefunctionHasErrored = true
      telefunctionError = err
      callTelefunctionErrorListeners(telefunctionError)
    }
  }

  let resultSync: unknown
  try {
    resultSync = telefunction.apply(null, telefunctionArgs)
  } catch (err: unknown) {
    onError(err)
  }

  let telefunctionReturn: unknown
  if (!telefunctionHasErrored && !telefunctionAborted) {
    assertUsage(
      isPromise(resultSync),
      `The telefunction ${telefunctionName} did not return a promise. Telefunctions should always return a promise. You can define ${telefunctionName} as \`async function\` (or \`async () => {}\`).`,
    )
    try {
      telefunctionReturn = await resultSync
    } catch (err: unknown) {
      onError(err)
    }
  }

  return { telefunctionReturn, telefunctionAborted, telefunctionHasErrored, telefunctionError }
}
