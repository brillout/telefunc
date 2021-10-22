export { isTelefuncFile }

function isTelefuncFile(filePath: string) {
  return filePath.includes('.telefunc.')
}
