export { importTelefuncFiles };

function importTelefuncFiles(): { telefuncFiles: Record<string, unknown> } {
  // Vite resolves globs with micromatch: https://github.com/micromatch/micromatch
  // Pattern `*([a-zA-Z0-9])` is an Extglob: https://github.com/micromatch/micromatch#extglobs
  // @ts-ignore
  const telefuncFiles = import.meta.globEager("/**/*.telefunc.*([a-zA-Z0-9])");
  return { telefuncFiles };
}
