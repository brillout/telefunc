export { serializeTelefunctionResult }

import { stringify } from '@brillout/json-s'
import { assertUsage } from '../utils'

function serializeTelefunctionResult(callContext: {
  _telefunctionReturn: unknown
  _telefunctionName: string
  _telefunctionAborted: boolean
}) {
  const bodyValue: Record<string, unknown> = {
    telefunctionReturn: callContext._telefunctionReturn,
  }
  if (callContext._telefunctionAborted) {
    bodyValue.aborted = true
  }
  try {
    const httpResponseBody = stringify(bodyValue)
    return httpResponseBody
  } catch (err: unknown) {
    assertUsage(
      false,
      [
        `Couldn't serialize value returned by telefunction \`${callContext._telefunctionName}\`.`,
        'Make sure returned values',
        'to be of the following types:',
        '`Object`, `string`, `number`, `Date`, `null`, `undefined`, `Inifinity`, `NaN`, `RegExp`.',
      ].join(' '),
    )
  }
}
