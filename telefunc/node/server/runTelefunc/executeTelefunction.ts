export { executeTelefunction }

import { isAbort, Abort } from '../Abort'
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
    assertUsage(
      typeof err === 'object' && err !== null,
      `The telefunction ${runContext.telefunctionExportName} (${runContext.telefunctionFilePath}) threw a non-object error: \`${err}\`. Make sure the telefunction does \`throw new Error(${err})\` instead.`,
    )
    assertUsage(
      err !== Abort,
      `Missing parentheses \`()\` in \`throw Abort\`: it should be \`throw Abort()\`. Telefunction: ${runContext.telefunctionExportName} (${runContext.telefunctionFilePath}).`,
    )
    if (isAbort(err)) {
      telefunctionAborted = true
      telefunctionReturn = err.abortValue
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
