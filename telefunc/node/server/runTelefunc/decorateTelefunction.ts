export { decorateTelefunction }

import { assertTelefunction } from './assertTelefunction.js'
import { registerTelefunction } from './loadTelefuncFilesUsingRegistration.js'
import { getTelefunctionKey } from '../../utils.js'
import type { Telefunction } from '../types.js'

function decorateTelefunction(
  telefunction: Telefunction,
  exportName: string,
  telefuncFilePath: string,
  appRootDir: string,
  skipRegistration: boolean,
) {
  assertTelefunction(telefunction, exportName, telefuncFilePath)

  {
    const telefunctionKey = getTelefunctionKey(telefuncFilePath, exportName)
    Object.assign(telefunction, {
      _key: telefunctionKey,
      _appRootDir: appRootDir,
    })
  }

  if (!skipRegistration) {
    registerTelefunction(telefunction, exportName, telefuncFilePath)
  }
}
