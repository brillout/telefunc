export { assertNamingConvention }

import { assert, assertWarning, isProduction, assertPosixPath } from '../../utils'
import type { Telefunction } from '../types'
import type * as fsType from 'node:fs'
import type * as pathType from 'node:path'

function assertNamingConvention(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string,
  appRootDir: null | string,
): asserts exportValue is Telefunction {
  if (isProduction()) return
  assertStartsWithOn(exportName, telefuncFilePath)
  assertCollocation(telefuncFilePath, appRootDir, exportValue)
}

function assertStartsWithOn(exportName: string, telefuncFilePath: string) {
  if (/on[A-Z]/.test(exportName)) return
  if (!/on/.test(exportName)) {
    assertWarning(
      false,
      `We recommend the name of your telefunction ${exportName}() (${telefuncFilePath}) to start with "on", see https://telefunc.com/event-based#naming-convention'`,
      { onlyOnce: true },
    )
  } else {
    assertWarning(
      /on[A-Z]/.test(exportName),
      `The name of your telefunction ${exportName}() (${telefuncFilePath}) starts with "on" but isn't followed by a capital letter, see https://telefunc.com/event-based#naming-convention'`,
      { onlyOnce: true },
    )
  }
}

function assertCollocation(telefuncFilePath: string, appRootDir: string | null, exportValue: unknown) {
  appRootDir = appRootDir || ((exportValue as any)._appRootDir as undefined | string) || null
  if (!appRootDir) return

  let fs: typeof fsType
  let path: typeof pathType
  const req: NodeRequire = require
  try {
    fs = req('node:fs')
    path = req('node:path')
  } catch {
    return
  }

  const getBasename = (fileNameOrPath: string): string => {
    assertPosixPath(fileNameOrPath)
    let basename = path.posix.basename(fileNameOrPath).split('.')[0]!
    if (basename.startsWith('+')) basename = basename.slice(1)
    return basename
  }

  assertPosixPath(telefuncFilePath)
  const telefuncFileBasename = getBasename(telefuncFilePath)
  const telefuncFileDir = path.posix.dirname(telefuncFilePath)
  const telefuncFileDirAbsolute = path.posix.join(appRootDir, telefuncFileDir)
  const collocatedFiles = fs.readdirSync(telefuncFileDirAbsolute)
  const collocatedFilesMatchYes: string[] = []
  const collocatedFilesMatchNot: string[] = []
  collocatedFiles.forEach((fileName) => {
    assertPosixPath(fileName) // fileName isn't a path so it shouldn't contain any backslash windows path separator
    const fileBasename = getBasename(fileName)
    fileName = path.posix.join(telefuncFileDir, fileName)
    if (fileBasename === telefuncFileBasename) {
      collocatedFilesMatchYes.push(fileName)
    } else {
      collocatedFilesMatchNot.push(fileName)
    }
  })
  /* There seem to be a race condition: https://github.com/brillout/telefunc/issues/61
  assert(collocatedFilesMatchYes.length >= 1, { telefuncFilePathAbsolute, collocatedFiles })
  */
  assert(!isProduction()) // New lines in production logs are a no-go
  assertWarning(
    collocatedFilesMatchYes.length >= 2,
    [
      `We recommend to collocate ${telefuncFilePath} with a UI component file, see https://telefunc.com/event-based#naming-convention`,
      '    Your telefunction:',
      `      ${telefuncFilePath} (base name: '${telefuncFileBasename}')`,
      '    Its collocated files:',
      ...collocatedFilesMatchNot.map((fileName) => `      ${fileName} (base name: '${getBasename(fileName)}'`),
      `    None of its collocated files share its base name '${telefuncFileBasename}'.`,
    ].join('\n'),
    { onlyOnce: true },
  )
}
