export { MultipartParser }
export type { MultipartEvent }

/**
 * Minimal streaming multipart parser tailored for telefunc's use case.
 *
 * Design informed by @mjackson/multipart-parser (https://github.com/mjackson/multipart-parser)
 * — precomputed boundary patterns, single-pass state machine, no per-chunk allocations.
 */

type MultipartEvent =
  | { type: 'part-begin'; name: string; filename: string | null; contentType: string }
  | { type: 'body-data'; data: Uint8Array }
  | { type: 'body-end' }

const enum State {
  START,
  HEADER,
  BODY,
  AFTER_BOUNDARY,
  DONE,
}

const CRLF_CRLF = new Uint8Array([0x0d, 0x0a, 0x0d, 0x0a]) // \r\n\r\n
const DASH_DASH = new Uint8Array([0x2d, 0x2d]) // --
const CRLF = new Uint8Array([0x0d, 0x0a]) // \r\n

const encoder = new TextEncoder()
const decoder = new TextDecoder()

class MultipartParser {
  #state: State = State.START
  #buffer: Uint8Array = new Uint8Array(0)

  // Precomputed boundary patterns
  #openingBoundary: Uint8Array // --boundary\r\n
  #finalBoundary: Uint8Array // --boundary--
  #delimiter: Uint8Array // \r\n--boundary

  constructor(boundary: string) {
    const b = encoder.encode(boundary)
    this.#openingBoundary = concat(DASH_DASH, b, CRLF)
    this.#finalBoundary = concat(DASH_DASH, b, DASH_DASH)
    this.#delimiter = concat(CRLF, DASH_DASH, b)
  }

  /** Feed a chunk of input data. Returns events produced from processing this chunk. */
  feed(chunk: Uint8Array): MultipartEvent[] {
    if (this.#state === State.DONE) return []

    this.#buffer = this.#buffer.length === 0 ? chunk : concat(this.#buffer, chunk)
    const events: MultipartEvent[] = []

    let progress = true
    while (progress && this.#state !== State.DONE) {
      progress = false

      if (this.#state === State.START) {
        let pos = indexOf(this.#buffer, this.#openingBoundary)
        if (pos !== -1) {
          this.#buffer = this.#buffer.subarray(pos + this.#openingBoundary.length)
          this.#state = State.HEADER
          progress = true
        } else if (indexOf(this.#buffer, this.#finalBoundary) !== -1) {
          this.#state = State.DONE
          progress = true
        }
      } else if (this.#state === State.HEADER) {
        const headerEnd = indexOf(this.#buffer, CRLF_CRLF)
        if (headerEnd !== -1) {
          const headerStr = decoder.decode(this.#buffer.subarray(0, headerEnd))
          this.#buffer = this.#buffer.subarray(headerEnd + 4)
          const { name, filename, contentType } = parseHeaders(headerStr)
          events.push({ type: 'part-begin', name, filename, contentType })
          this.#state = State.BODY
          progress = true
        }
      } else if (this.#state === State.BODY) {
        const delimPos = indexOf(this.#buffer, this.#delimiter)
        if (delimPos !== -1) {
          if (delimPos > 0) events.push({ type: 'body-data', data: this.#buffer.subarray(0, delimPos) })
          events.push({ type: 'body-end' })
          this.#buffer = this.#buffer.subarray(delimPos + this.#delimiter.length)
          this.#state = State.AFTER_BOUNDARY
          progress = true
        } else {
          // Emit safe bytes, keep tail that could be a partial delimiter match
          const safe = this.#buffer.length - this.#delimiter.length
          if (safe > 0) {
            events.push({ type: 'body-data', data: this.#buffer.subarray(0, safe) })
            this.#buffer = this.#buffer.subarray(safe)
            progress = true
          }
        }
      } else if (this.#state === State.AFTER_BOUNDARY) {
        if (this.#buffer.length >= 2) {
          if (this.#buffer[0] === 0x2d && this.#buffer[1] === 0x2d) {
            this.#state = State.DONE
          } else if (this.#buffer[0] === 0x0d && this.#buffer[1] === 0x0a) {
            this.#buffer = this.#buffer.subarray(2)
            this.#state = State.HEADER
          }
          progress = true
        }
      }
    }

    return events
  }

  /** Signal end of input. Flushes any remaining body data. */
  finish(): MultipartEvent[] {
    const events: MultipartEvent[] = []
    if (this.#state === State.BODY) {
      if (this.#buffer.length > 0) {
        events.push({ type: 'body-data', data: this.#buffer })
        this.#buffer = new Uint8Array(0)
      }
      events.push({ type: 'body-end' })
    }
    this.#state = State.DONE
    return events
  }
}

// ===== Helpers =====

function concat(...arrays: Uint8Array[]): Uint8Array {
  let total = 0
  for (const a of arrays) total += a.length
  const result = new Uint8Array(total)
  let offset = 0
  for (const a of arrays) {
    result.set(a, offset)
    offset += a.length
  }
  return result
}

function indexOf(haystack: Uint8Array, needle: Uint8Array): number {
  const len = needle.length
  if (len === 0) return 0
  if (haystack.length < len) return -1
  const end = haystack.length - len
  outer: for (let i = 0; i <= end; i++) {
    for (let j = 0; j < len; j++) {
      if (haystack[i + j] !== needle[j]) continue outer
    }
    return i
  }
  return -1
}

function parseHeaders(headerStr: string): {
  name: string
  filename: string | null
  contentType: string
} {
  let name = ''
  let filename: string | null = null
  let contentType = 'application/octet-stream'

  for (const line of headerStr.split('\r\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim().toLowerCase()
    const value = line.slice(colonIdx + 1).trim()

    if (key === 'content-disposition') {
      const nameMatch = value.match(/\bname="([^"]*)"/)
      if (nameMatch) name = nameMatch[1]!
      const filenameMatch = value.match(/\bfilename="([^"]*)"/)
      if (filenameMatch) filename = filenameMatch[1]!
    } else if (key === 'content-type') {
      contentType = value
    }
  }

  return { name, filename, contentType }
}
