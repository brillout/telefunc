export { serializeTelefunctionArguments }

import { stringify } from '@brillout/json-serializer/stringify'
import { assert, assertUsage, lowercaseFirstLetter, hasProp } from '../utils.js'
import { createMultipartReplacer } from '../../shared/multipart/multipart-client.js'
import { FORM_DATA_MAIN_FIELD } from '../../shared/multipart/constants.js'

type CallContext = {
  telefuncFilePath: string
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}

function serializeTelefunctionArguments(callContext: CallContext): string | FormData {
  const dataObject = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: callContext.telefunctionArgs,
  }

  const fileParts: { key: string; value: File | Blob }[] = []
  const replacer = createMultipartReplacer({
    onFile: (key, file) => fileParts.push({ key, value: file }),
    onBlob: (key, blob) => fileParts.push({ key, value: blob }),
  })

  const dataObjectSerialized = serialize(dataObject, callContext, replacer)
  if (fileParts.length === 0) return dataObjectSerialized

  // __telefunc metadata MUST come first — the streaming parser needs it before file data
  const formData = new FormData()
  formData.append(FORM_DATA_MAIN_FIELD, dataObjectSerialized)
  for (const { key, value } of fileParts) {
    formData.append(key, value)
  }
  return formData
}

type Replacer = Parameters<typeof stringify>[1] extends infer O ? (O extends { replacer?: infer R } ? R : never) : never
function serialize(bodyParsed: Record<string, unknown>, callContext: CallContext, replacer?: Replacer): string {
  let serialized: string
  try {
    serialized = stringify(bodyParsed, { forbidReactElements: true, replacer })
  } catch (err) {
    assert(hasProp(err, 'message', 'string'))
    assertUsage(
      false,
      [
        `Cannot serialize arguments for telefunction ${callContext.telefunctionName}() (${callContext.telefuncFilePath}).`,
        'Make sure that the arguments passed to telefunction calls are always serializable.',
        `Serialization error: ${lowercaseFirstLetter(err.message)}`,
      ].join(' '),
    )
  }
  assert(serialized)
  return serialized
}
