export { createMultipartReplacer }

import { TELEFUNC_FILE_PREFIX, TELEFUNC_BLOB_PREFIX, MULTIPART_PLACEHOLDER_KEY } from './constants.js'

function constructMultipartKey(index: number): string {
  return `${MULTIPART_PLACEHOLDER_KEY}_${index}`
}

/** Creates a stringify replacer that serializes File/Blob → prefixed string descriptors.
 *  `onFile`/`onBlob` are called to collect the binary parts for the FormData. */
function createMultipartReplacer(callbacks: {
  onFile: (key: string, file: File) => void
  onBlob: (key: string, blob: Blob) => void
}) {
  let nextIndex = 0
  return (_key: string, value: unknown, serializer: (v: unknown) => string) => {
    if (value instanceof File) {
      const key = constructMultipartKey(nextIndex++)
      callbacks.onFile(key, value)
      const fileMetadata = {
        key,
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
      return {
        replacement: TELEFUNC_FILE_PREFIX + serializer(fileMetadata),
        resolved: true,
      }
    }
    if (value instanceof Blob) {
      const key = constructMultipartKey(nextIndex++)
      callbacks.onBlob(key, value)
      const fileMetadata = { key, size: value.size, type: value.type }
      return {
        replacement: TELEFUNC_BLOB_PREFIX + serializer(fileMetadata),
        resolved: true,
      }
    }
    return undefined
  }
}
