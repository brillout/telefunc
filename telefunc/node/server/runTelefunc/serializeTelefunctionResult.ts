export { serializeTelefunctionResult }

import { stringify } from '@brillout/json-s/stringify'
import { assert, assertUsage, hasProp, lowercaseFirstLetter } from '../../utils'

function serializeTelefunctionResult(runContext: {
  telefunctionReturn: unknown
  telefunctionExportName: string
  telefunctionFilePath: string
  telefunctionAborted: boolean
}) {
  const bodyValue: Record<string, unknown> = {
    ret: runContext.telefunctionReturn,
  }
  if (runContext.telefunctionAborted) {
    bodyValue.abort = true
  }
  try {
    const httpResponseBody = stringify(bodyValue, { forbidReactElements: true })
    return httpResponseBody
  } catch (err: unknown) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize value returned by telefunction \`${runContext.telefunctionExportName}\` (${runContext.telefunctionFilePath}).`,
        'Make sure that telefunctions always return a serializable value.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`,
      ].join(' '),
    )
  }
}
