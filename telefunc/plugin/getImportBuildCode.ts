export { getImportBuildCode, getImportBuildCodeWebpack };

function getImportBuildCode(): string {
  return `
  const { telefuncFiles } = require("./importTelefuncFiles.js").importTelefuncFiles();
  const { __internal_setTelefuncFiles: setTelefuncFiles } = require("telefunc");
  setTelefuncFiles(telefuncFiles);
`;
}

function getImportBuildCodeWebpack(contextDir: string): string {
  return `
  function importTelefuncFiles()  {
    const telefuncFiles = {};

    // webpack resolves globs with regex: https://webpack.js.org/guides/dependency-management/#requirecontext
    // @ts-ignore
    const imports = require.context('${contextDir}', true, /\.telefunc.*([a-zA-Z0-9])/);
    imports.keys().forEach((k) => {
      telefuncFiles[k.slice(1)] = imports(k);
    });
    return { telefuncFiles };
  }

  const { telefuncFiles } = importTelefuncFiles();
  const { __internal_setTelefuncFiles: setTelefuncFiles } = require("telefunc");
  setTelefuncFiles(telefuncFiles);
`;
}
