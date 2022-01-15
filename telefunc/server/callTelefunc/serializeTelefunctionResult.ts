import { stringify } from '@brillout/json-s'
import { assertUsage } from '../utils'

export { serializeTelefunctionResult }

function serializeTelefunctionResult(callContext: { _telefunctionReturn: unknown; _telefunctionName: string }) {
  try {
    const httpResponseBody = stringify({
      telefunctionReturn: callContext._telefunctionReturn,
    })
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
