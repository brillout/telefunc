export { executeTelefunction }

import { isAbort } from '../Abort'
import { provideTelefuncContext, Telefunc } from '../getContext'
import type { Telefunction } from '../types'
import { assertUsage, isPromise } from '../../utils'

async function executeTelefunction(runContext: {
  telefunction: Telefunction
  telefunctionFilePath: string
  telefunctionExportName: string
  telefunctionArgs: unknown[]
  telefunctions: Record<string, Telefunction>
  providedContext: Telefunc.Context | null
}) {
  const { telefunction, telefunctionArgs } = runContext

  if (runContext.providedContext) {
    provideTelefuncContext(runContext.providedContext)
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
      `The telefunction ${runContext.telefunctionExportName} (${runContext.telefunctionFilePath}) did not return a promise. A telefunction should always return a promise (e.g. define it as a \`async function\`).`,
    )
    try {
      telefunctionReturn = await resultSync
    } catch (err: unknown) {
      onError(err)
    }
  }

  return { telefunctionReturn, telefunctionAborted, telefunctionHasErrored, telefunctionError }
}
