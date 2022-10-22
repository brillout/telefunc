export { serializeTelefunctionArguments }

import { stringify } from '@brillout/json-s/stringify'
import { assert, assertUsage, lowercaseFirstLetter, hasProp } from '../utils'

function serializeTelefunctionArguments(callContext: {
  telefuncFilePath: string
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}) {
  const bodyParsed = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: callContext.telefunctionArgs
  }
  assert(typeof callContext.telefuncFilePath === 'string')
  assert(typeof callContext.telefunctionName === 'string')
  assert(Array.isArray(callContext.telefunctionArgs))
  let httpRequestBody: string
  try {
    httpRequestBody = stringify(bodyParsed, { forbidReactElements: true })
  } catch (err) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize arguments for telefunction ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`,
        'Make sure that the arguments pass to telefunction calls are always serializable.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`
      ].join(' ')
    )
  }
  assert(httpRequestBody)
  return httpRequestBody
}
