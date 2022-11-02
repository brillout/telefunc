export { assertNamingConvention }

import { assert, assertWarning } from '../../utils'
import type { Telefunction } from '../types'
import type * as fsType from 'fs'
import type * as pathType from 'path'

function assertNamingConvention(
  exportValue: unknown,
  exportName: string,
  telefuncFilePath: string,
  appRootDir: null | string
): asserts exportValue is Telefunction {
  assertWarning(
    /on[A-Z]/.test(exportName),
    `We recommend the name of your telefunction ${exportName}() (${telefuncFilePath}) to start with "on", see https://telefunc.com/event-based#naming-convention'`,
    { onlyOnce: true }
  )
  appRootDir = appRootDir || ((exportValue as any)._appRootDir as undefined | string) || null
  if (appRootDir) {
    assertCollocation(telefuncFilePath, appRootDir)
  }
}

function assertCollocation(telefuncFilePath: string, appRootDir: string) {
  let fs: typeof fsType
  let path: typeof pathType
  const req: NodeRequire = require
  try {
    fs = req('fs')
    path = req('path')
  } catch {
    return
  }
  const telefuncFilePathAbsolute = path.join(appRootDir, telefuncFilePath)
  const dirFiles = fs.readdirSync(path.dirname(telefuncFilePathAbsolute))
  const pathBase = path.basename(telefuncFilePathAbsolute).split('.')[0]!
  const fileMatches = dirFiles.filter((file) => file.startsWith(pathBase))
  assert(fileMatches.length >= 1, { telefuncFilePathAbsolute, dirFiles })
  assertWarning(
    fileMatches.length >= 2,
    `We recommend to collocate ${telefuncFilePath} with a UI component file, see https://telefunc.com/event-based#naming-convention`,
    { onlyOnce: true }
  )
}
