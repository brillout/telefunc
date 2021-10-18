export { importTelefuncFiles };

function importTelefuncFiles()  {
  const telefuncFiles: Record<string, unknown> = {};

  // webpack resolves globs with regex: https://webpack.js.org/guides/dependency-management/#requirecontext
  // @ts-ignore
  const imports = require.context('RELATIVE_PATH_TO_ROOT', true, /\.telefunc.*([a-zA-Z0-9])/);
  imports.keys().forEach((k: string) => {
    telefuncFiles[k.slice(1)] = imports(k);
  });
  return { telefuncFiles };
}
