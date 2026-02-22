export { parseMultipartIndex }
export { createMultipartReviver }

import { SERIALIZER_PREFIX_FILE, SERIALIZER_PREFIX_BLOB, MULTIPART_PLACEHOLDER_KEY } from './constants.js'

/** Extract the numeric index from a multipart key (e.g. `__telefunc_multipart_2` → `2`). */
function parseMultipartIndex(key: string): number {
  return parseInt(key.slice(MULTIPART_PLACEHOLDER_KEY.length + 1), 10)
}

type FileMetadata = { key: string; name: string; size: number; type: string; lastModified: number }
type BlobMetadata = { key: string; size: number; type: string }

/** Creates a parse reviver that deserializes prefixed string descriptors → lazy file objects.
 *  `createFile`/`createBlob` construct the platform-specific lazy objects. */
function createMultipartReviver(callbacks: {
  createFile: (descriptor: FileMetadata) => unknown
  createBlob: (descriptor: BlobMetadata) => unknown
}) {
  return (_key: undefined | string, value: string, parser: (str: string) => unknown) => {
    if (value.startsWith(SERIALIZER_PREFIX_FILE)) {
      const descriptor = parser(value.slice(SERIALIZER_PREFIX_FILE.length)) as FileMetadata
      return { replacement: callbacks.createFile(descriptor) }
    }
    if (value.startsWith(SERIALIZER_PREFIX_BLOB)) {
      const descriptor = parser(value.slice(SERIALIZER_PREFIX_BLOB.length)) as BlobMetadata
      return { replacement: callbacks.createBlob(descriptor) }
    }
    return undefined
  }
}
