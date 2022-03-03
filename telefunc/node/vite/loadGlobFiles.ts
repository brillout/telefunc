export { loadGlobFiles }
export type { GlobFiles }

type GlobFiles = Record<FilePath, () => Promise<Record<ExportName, ExportValue>>>
type FilePath = string
type ExportName = string
type ExportValue = unknown

async function loadGlobFiles(telefuncFilesGlob: GlobFiles): Promise<Record<string, Record<string, unknown>>> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(telefuncFilesGlob).map(async ([filePath, loadModuleExports]) => [
        filePath,
        await loadModuleExports()
      ])
    )
  )
}
