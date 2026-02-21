export { constructMultipartKey }
export { isMultipartKey }

import { MULTIPART_PLACEHOLDER_KEY } from './constants.js'

function constructMultipartKey(index: number): string {
  return `${MULTIPART_PLACEHOLDER_KEY}_${index}`
}
function isMultipartKey(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith(`${MULTIPART_PLACEHOLDER_KEY}_`)
}
