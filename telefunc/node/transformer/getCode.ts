export function getCode(exportNames: readonly string[], telefuncFilePath: string) {
  const lines = [];

  lines.push('// @ts-nocheck');

  /* Nuxt v2 doesn't seem to support `package.json#exports`
  const importPath =  'telefunc/client'
  /*/
  // This also works for Vite thanks to `package.json#exports["./dist/client"]`
  const importPath = 'telefunc/dist/client';
  //*/
  lines.push(`import { __internal_fetchTelefunc } from '${importPath}';`);

  exportNames.forEach((exportName) => {
    const exportValue = `(...args) => __internal_fetchTelefunc('${telefuncFilePath}', '${exportName}', args);`;
    if (exportName === 'default') {
      lines.push(`export default ${exportValue}`);
    } else {
      lines.push(`export const ${exportName} = ${exportValue};`);
    }
  });

  const code = lines.join('\n');
  return code;
}
