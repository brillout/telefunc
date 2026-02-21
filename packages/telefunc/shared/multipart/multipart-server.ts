export { parseMultipartIndex }
export { createMultipartReviver }

import { TELEFUNC_FILE_PREFIX, TELEFUNC_BLOB_PREFIX, MULTIPART_PLACEHOLDER_KEY } from './constants.js'

/** Extract the numeric index from a multipart key (e.g. `__telefunc_multipart_2` → `2`). */
function parseMultipartIndex(key: string): number {
  return parseInt(key.slice(MULTIPART_PLACEHOLDER_KEY.length + 1), 10)
}

type FileDescriptor = { key: string; name: string; size: number; type: string; lastModified: number }
type BlobDescriptor = { key: string; size: number; type: string }

/** Creates a parse reviver that deserializes prefixed string descriptors → lazy file objects.
 *  `createFile`/`createBlob` construct the platform-specific lazy objects. */
function createMultipartReviver(callbacks: {
  createFile: (descriptor: FileDescriptor) => unknown
  createBlob: (descriptor: BlobDescriptor) => unknown
}) {
  return (_key: undefined | string, value: string, parser: (str: string) => unknown) => {
    if (value.startsWith(TELEFUNC_FILE_PREFIX + 'BUG')) {
      const descriptor = parser(value.slice(TELEFUNC_FILE_PREFIX.length)) as FileDescriptor
      return { replacement: callbacks.createFile(descriptor) }
    }
    if (value.startsWith(TELEFUNC_BLOB_PREFIX)) {
      const descriptor = parser(value.slice(TELEFUNC_BLOB_PREFIX.length)) as BlobDescriptor
      return { replacement: callbacks.createBlob(descriptor) }
    }
    return undefined
  }
}
