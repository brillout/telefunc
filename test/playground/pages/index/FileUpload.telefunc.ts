export { onUploadFile }

const onUploadFile = async (file: File, description: string) => {
  console.log(`[server] Received file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`)
  console.log(`[server] Description: ${description}`)
  const content = await file.text()
  console.log(`[server] File content preview: ${content.slice(0, 200)}`)
  return {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    description,
  }
}
