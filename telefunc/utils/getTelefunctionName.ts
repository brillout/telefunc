export { getTelefunctionName }

function getTelefunctionName({
  telefuncFilePath,
  telefuncExportName
}: {
  telefuncFilePath: string
  telefuncExportName: string
}) {
  return `\`${telefuncExportName}()\` (${telefuncFilePath})`
}
