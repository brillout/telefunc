export { serializeTelefunctionResult }

import { stringify } from '@brillout/json-serializer/stringify'
import { assert, assertUsage } from '../../../utils/assert.js'
import { hasProp } from '../../../utils/hasProp.js'
import { lowercaseFirstLetter } from '../../../utils/lowercaseFirstLetter.js'

function serializeTelefunctionResult(runContext: {
  telefunctionReturn: unknown
  telefunctionName: string
  telefuncFilePath: string
  telefunctionAborted: boolean
}): string {
  const bodyValue: Record<string, unknown> = {
    ret: runContext.telefunctionReturn,
  }
  if (runContext.telefunctionAborted) {
    bodyValue.abort = true
  }
  try {
    const httpResponseBody: string = stringify(bodyValue, { forbidReactElements: true })
    return httpResponseBody
  } catch (err: unknown) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize value returned by telefunction ${runContext.telefunctionName}() (${runContext.telefuncFilePath}).`,
        'Make sure that telefunctions always return a serializable value.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`,
      ].join(' '),
    )
  }
}
