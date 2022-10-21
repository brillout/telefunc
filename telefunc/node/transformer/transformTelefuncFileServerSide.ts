export { transformTelefuncFileServerSide }

import { getExportNames } from './getExportNames'
import { assert, assertPosixPath, getTelefunctionKey } from './utils'
import { generateShield } from '../server/shield/codegen/generateShield'

async function transformTelefuncFileServerSide(
  src: string,
  id: string,
  root: string,
  skipRegistration: boolean,
  isDev: boolean
) {
  assertPosixPath(id)
  assertPosixPath(root)

  const exportNames = await getExportNames(src)

  let code = decorateTelefunctions(exportNames, src, id.replace(root, ''), skipRegistration)

  if (!isDev) {
    if (id.endsWith('.ts')) {
      code = generateShield(code, id)
    }
  }

  return code
}

function decorateTelefunctions(
  exportNames: readonly string[],
  src: string,
  filePath: string,
  skipRegistration?: boolean
) {
  assertPosixPath(filePath)

  const codePreprend: string = (() => {
    let line = 'import { __assertTelefuncFileExport } from "telefunc";'
    if (!skipRegistration) {
      line += 'import { __registerTelefunction } from "telefunc";'
    }
    return line
  })()

  const codeAppend: string = (() => {
    const lines: string[] = []

    for (const exportName of exportNames) {
      lines.push(`__assertTelefuncFileExport(${exportName}, "${exportName}", "${filePath}");`)
      if (!skipRegistration) {
        lines.push(`__registerTelefunction(${exportName}, "${exportName}", "${filePath}");`)
      }
      {
        const telefunctionKey = getTelefunctionKey(filePath, exportName)
        lines.push(`${exportName}['_key'] = ${JSON.stringify(telefunctionKey)};`)
      }
    }

    return lines.join('\n')
  })()

  // No break line before `src` to avoid breaking the source map
  assert(!codePreprend.includes('\n'))
  const code = `${codePreprend}${src}\n\n${codeAppend}\n`
  return code
}
