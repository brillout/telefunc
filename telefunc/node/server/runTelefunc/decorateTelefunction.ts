export { decorateTelefunction }

import { assertTelefunction } from './assertTelefunction'
import { registerTelefunction } from './loadTelefuncFilesWithRegistration'
import { getTelefunctionKey } from '../../utils'
import type { Telefunction } from '../types'

function decorateTelefunction(
  telefunction: Telefunction,
  exportName: string,
  telefuncFilePath: string,
  appRootDir: string,
  skipRegistration: boolean
) {
  assertTelefunction(telefunction, exportName, telefuncFilePath)

  {
    const telefunctionKey = getTelefunctionKey(telefuncFilePath, exportName)
    Object.assign(telefunction, {
      _key: telefunctionKey,
      _appRootDir: appRootDir
    })
  }

  if (!skipRegistration) {
    registerTelefunction(telefunction, exportName, telefuncFilePath)
  }
}
