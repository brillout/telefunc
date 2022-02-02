export { getTelefunctionKey }

function getTelefunctionKey({
  telefunctionFilePath,
  telefunctionFileExport,
}: {
  telefunctionFilePath: string
  telefunctionFileExport: string
}) {
  return telefunctionFilePath + ':' + telefunctionFileExport
}
