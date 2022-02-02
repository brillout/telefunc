export { getTelefunctionName }

function getTelefunctionName({
  telefunctionFilePath,
  telefunctionFileExport,
}: {
  telefunctionFilePath: string
  telefunctionFileExport: string
}) {
  return `\`${telefunctionFileExport}()\` (${telefunctionFilePath})`
}
