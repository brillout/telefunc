import { assertUsage, isCallable } from '../../utils'

export function assertTelefuncFileExport(exportValue: unknown, exportName: string, telefuncFilePath: string) {
  assertUsage(
    isCallable(exportValue),
    `\`export { ${exportName} }\` of ${telefuncFilePath} isn't a function (\`.telefunc.js\` files are only allowed to export functions)`
  )
}
