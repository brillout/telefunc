export { decorateTelefunction }

import { assertTelefunction } from './assertTelefunction.js'
import { registerTelefunction } from './loadTelefuncFilesUsingRegistration.js'
import { getTelefunctionKey } from '../../../utils/getTelefunctionKey.js'
import type { Telefunction } from '../types.js'

function decorateTelefunction(
  telefunction: Telefunction,
  exportName: string,
  telefuncFilePath: string,
  appRootDir: string,
) {
  assertTelefunction(telefunction, exportName, telefuncFilePath)

  {
    const telefunctionKey = getTelefunctionKey(telefuncFilePath, exportName)
    Object.assign(telefunction, {
      _key: telefunctionKey,
      _appRootDir: appRootDir,
    })
  }

  registerTelefunction(telefunction, exportName, telefuncFilePath)
}
