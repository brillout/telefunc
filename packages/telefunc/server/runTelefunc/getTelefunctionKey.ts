export { getTelefunctionKey }

function getTelefunctionKey({
  telefunctionFilePath,
  telefunctionExportName,
}: {
  telefunctionFilePath: string
  telefunctionExportName: string
}) {
  return telefunctionFilePath + ':' + telefunctionExportName
}
