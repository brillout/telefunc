export { serializeTelefunctionArguments }

import { stringify } from '@brillout/json-s/stringify'
import { assert, assertUsage, lowercaseFirstLetter, hasProp } from '../utils'

function serializeTelefunctionArguments(callContext: {
  telefunctionFilePath: string
  telefunctionFileExport: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
  telefunctionName: string
}) {
  const bodyParsed = {
    file: callContext.telefunctionFilePath,
    name: callContext.telefunctionFileExport,
    args: callContext.telefunctionArgs,
  }
  assert(typeof callContext.telefunctionFilePath === 'string')
  assert(typeof callContext.telefunctionFileExport === 'string')
  assert(Array.isArray(callContext.telefunctionArgs))
  let httpRequestBody: string
  try {
    httpRequestBody = stringify(bodyParsed, { forbidReactElements: true })
  } catch (err) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize arguments for telefunction ${callContext.telefunctionName}.`,
        'Make sure that the arguments pass to telefunction calls are always serializable.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`,
      ].join(' '),
    )
  }
  assert(httpRequestBody)
  return httpRequestBody
}
