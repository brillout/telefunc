export { FileUpload }

import React, { useState } from 'react'
import {
  onUploadFile,
  onUploadMultiple,
  onUploadArray,
  onUploadStream,
  onUploadArrayBuffer,
  onReadTwice,
  onUploadOutOfOrder,
  onUploadBackpressure,
  onUploadSlice,
} from './FileUpload.telefunc'

function FileUpload() {
  const [result, setResult] = useState<string>('')

  const file = (name: string, content: string) => new File([content], name, { type: 'text/plain' })

  return (
    <div>
      <h2>File Upload Tests</h2>

      <button
        id="test-single"
        onClick={async () => {
          const res = await onUploadFile(file('test.txt', 'hello'), 'desc1')
          setResult(JSON.stringify(res))
        }}
      >
        Single file
      </button>

      <button
        id="test-multiple"
        onClick={async () => {
          const res = await onUploadMultiple(file('a.txt', 'aaa'), file('b.txt', 'bbb'))
          setResult(JSON.stringify(res))
        }}
      >
        Multiple files
      </button>

      <button
        id="test-array"
        onClick={async () => {
          const res = await onUploadArray([file('x.txt', 'xxx'), file('y.txt', 'yyy'), file('z.txt', 'zzz')])
          setResult(JSON.stringify(res))
        }}
      >
        File[] array
      </button>

      <button
        id="test-stream"
        onClick={async () => {
          const res = await onUploadStream(file('s.txt', 'streamed'.repeat(100_000)))
          setResult(JSON.stringify(res))
        }}
      >
        file.stream()
      </button>

      <button
        id="test-arraybuffer"
        onClick={async () => {
          const res = await onUploadArrayBuffer(file('ab.txt', 'buffered'))
          setResult(JSON.stringify(res))
        }}
      >
        file.arrayBuffer()
      </button>

      <button
        id="test-read-twice"
        onClick={async () => {
          const res = await onReadTwice(file('twice.txt', 'data'))
          setResult(JSON.stringify(res))
        }}
      >
        Read twice
      </button>

      <button
        id="test-backpressure"
        onClick={async () => {
          const res = await onUploadBackpressure(file('bp.txt', 'x'.repeat(800_000)))
          setResult(JSON.stringify(res))
        }}
      >
        Backpressure
      </button>

      <button
        id="test-slice"
        onClick={async () => {
          const res = await onUploadSlice(file('slice.txt', 'hello world'))
          setResult(JSON.stringify(res))
        }}
      >
        file.slice()
      </button>

      <button
        id="test-out-of-order"
        onClick={async () => {
          const res = await onUploadOutOfOrder(file('first.txt', 'AAA'), file('second.txt', 'BBB'))
          setResult(JSON.stringify(res))
        }}
      >
        Out of order
      </button>

      <pre id="upload-result">{result}</pre>
    </div>
  )
}
