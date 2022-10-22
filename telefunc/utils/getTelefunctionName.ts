export { getTelefunctionName }

function getTelefunctionName({
  telefuncFilePath,
  telefunctionFileExport
}: {
  telefuncFilePath: string
  telefunctionFileExport: string
}) {
  return `\`${telefunctionFileExport}()\` (${telefuncFilePath})`
}
