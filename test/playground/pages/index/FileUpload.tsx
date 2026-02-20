export { FileUpload }

import React, { useState } from 'react'
import { onUploadFile } from './FileUpload.telefunc'

function FileUpload() {
  const [result, setResult] = useState<{
    fileName: string
    fileSize: number
    fileType: string
    description: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File
    const description = formData.get('description') as string

    if (!file || !file.size) {
      setError('Please select a file')
      return
    }

    try {
      const res = await onUploadFile(file, description)
      setResult(res)
    } catch (err) {
      setError(String(err))
    }
  }

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" name="file" />
        </div>
        <div>
          <input type="text" name="description" placeholder="Description" defaultValue="test upload" />
        </div>
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
