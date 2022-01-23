export { serializeTelefunctionArguments }

import { stringify } from '@brillout/json-s'
import { assert, assertUsage } from '../utils'

function serializeTelefunctionArguments(callContext: {
  telefunctionFilePath: string
  telefunctionExportName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}) {
  const bodyParsed = {
    file: callContext.telefunctionFilePath,
    name: callContext.telefunctionExportName,
    args: callContext.telefunctionArgs,
  }
  assert(typeof callContext.telefunctionFilePath === 'string')
  assert(typeof callContext.telefunctionExportName === 'string')
  assert(Array.isArray(callContext.telefunctionArgs))
  let httpRequestBody: string
  try {
    httpRequestBody = stringify(bodyParsed)
  } catch (err_) {
    assertUsage(
      false,
      [
        `Couldn't serialize arguments for telefunction \`${callContext.telefunctionExportName}\` (${callContext.telefunctionFilePath}).`,
        'Make sure that the arguments contain only following types:',
        '`Object`, `string`, `number`, `Date`, `null`, `undefined`, `Infinity`, `NaN`, `RegExp`.',
      ].join(' '),
    )
  }
  assert(httpRequestBody)
  return httpRequestBody
}
