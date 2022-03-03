export function getCode(exportNames: readonly string[], telefuncFilePath: string) {
  const lines = [];

  lines.push('// @ts-nocheck');

  lines.push(`import { __internal_fetchTelefunc } from 'telefunc/client';`);

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
