export { importTelefuncFiles }
export type GlobFiles = ReturnType<typeof importTelefuncFiles>

function importTelefuncFiles() {
  // Vite resolves globs with micromatch: https://github.com/micromatch/micromatch
  // Pattern `*([a-zA-Z0-9])` is an Extglob: https://github.com/micromatch/micromatch#extglobs
  // @ts-ignore
  const globFiles = import.meta.glob('/**/*.telefunc.*([a-zA-Z0-9])')
  return globFiles
}
