export { serializeTelefunctionArguments }

import { stringify } from '@brillout/json-serializer/stringify'
import { assert, assertUsage, lowercaseFirstLetter, hasProp } from '../utils.js'
import { createMultipartReplacer } from '../../shared/multipart/multipart-client.js'
import { TELEFUNC_METADATA_KEY } from '../../shared/multipart/constants.js'

type CallContext = {
  telefuncFilePath: string
  telefunctionName: string
  telefunctionArgs: unknown[]
  telefuncUrl: string
}

function serializeTelefunctionArguments(callContext: CallContext): string | FormData {
  const bodyParsed = {
    file: callContext.telefuncFilePath,
    name: callContext.telefunctionName,
    args: callContext.telefunctionArgs,
  }

  const fileParts: { key: string; value: File | Blob }[] = []
  const replacer = createMultipartReplacer({
    onFile: (key, file) => fileParts.push({ key, value: file }),
    onBlob: (key, blob) => fileParts.push({ key, value: blob }),
  })
  const serialized = serializeBody(bodyParsed, callContext, replacer)

  if (fileParts.length === 0) return serialized

  // __telefunc metadata MUST come first — the streaming parser needs it before file data
  const formData = new FormData()
  formData.append(TELEFUNC_METADATA_KEY, serialized)
  for (const { key, value } of fileParts) {
    formData.append(key, value)
  }
  return formData
}

type Replacer = Parameters<typeof stringify>[1] extends infer O ? (O extends { replacer?: infer R } ? R : never) : never
function serializeBody(bodyParsed: Record<string, unknown>, callContext: CallContext, replacer?: Replacer): string {
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
