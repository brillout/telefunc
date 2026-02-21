export {
  onUploadFile,
  onUploadMultiple,
  onUploadArray,
  onUploadStream,
  onUploadArrayBuffer,
  onReadTwice,
  onUploadOutOfOrder,
  onUploadBackpressure,
}

/** Single file + text argument */
const onUploadFile = async (file: File, description: string) => {
  const content = await file.text()
  return {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    content,
    description,
  }
}

/** Multiple files as separate arguments */
const onUploadMultiple = async (file1: File, file2: File) => {
  const text1 = await file1.text()
  const text2 = await file2.text()
  return {
    file1: { name: file1.name, content: text1 },
    file2: { name: file2.name, content: text2 },
  }
}

/** Multiple files as an array argument */
const onUploadArray = async (files: File[]) => {
  const results = []
  for (const file of files) {
    results.push({ name: file.name, content: await file.text() })
  }
  return results
}

/** Read via file.stream() */
const onUploadStream = async (file: File) => {
  let totalBytes = 0
  let chunkCount = 0
  for await (const chunk of file.stream()) {
    totalBytes += chunk.byteLength
    chunkCount++
  }
  return { totalBytes, chunkCount }
}

/** Read via file.arrayBuffer() */
const onUploadArrayBuffer = async (file: File) => {
  const ab = await file.arrayBuffer()
  return { content: new TextDecoder().decode(ab), byteLength: ab.byteLength }
}

/** Try to read the same file twice — should throw */
const onReadTwice = async (file: File) => {
  await file.text()
  try {
    await file.text()
    return { error: null }
  } catch (e: any) {
    return { error: e.message || String(e) }
  }
}

/** Read with backpressure — slow consumer delays 50ms per chunk */
const onUploadBackpressure = async (file: File) => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
  let totalBytes = 0
  let chunkCount = 0
  const start = Date.now()
  for await (const chunk of file.stream()) {
    totalBytes += chunk.byteLength
    chunkCount++
    await sleep(50)
  }
  const elapsed = Date.now() - start
  return { totalBytes, chunkCount, elapsed }
}

/** Read files out of order — file1 should be drained and unreadable */
const onUploadOutOfOrder = async (file1: File, file2: File) => {
  // Read file2 first (out of order)
  const text2 = await file2.text()
  // file1 was drained — trying to read should throw
  try {
    await file1.text()
    return { text2, file1Error: null }
  } catch (e: any) {
    return { text2, file1Error: e.message || String(e) }
  }
}
