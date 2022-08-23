export { loadTelefuncFilesWithImportBuild }
export { setBuildLoader }

const buildGetter = (globalThis.__telefunc_vite_buildGetter = globalThis.__telefunc_vite_buildGetter || {
  loadTelefuncFiles: null
})

function setBuildLoader({ loadTelefuncFiles }: { loadTelefuncFiles: () => Promise<unknown> }) {
  buildGetter.loadTelefuncFiles = loadTelefuncFiles
}
async function loadTelefuncFilesWithImportBuild(): Promise<unknown> {
  if (buildGetter.loadTelefuncFiles === null) {
    return null
  }
  const moduleExports = await buildGetter.loadTelefuncFiles()
  return moduleExports
}

declare global {
  var __telefunc_vite_buildGetter: {
    loadTelefuncFiles: (() => Promise<unknown>) | null
  }
}
