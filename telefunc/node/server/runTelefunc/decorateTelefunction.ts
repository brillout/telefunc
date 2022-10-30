export { decorateTelefunction }

import { assertTelefunction } from './assertTelefunction'
import { registerTelefunction } from './loadTelefuncFilesWithRegistration'
import { getTelefunctionKey } from '../../utils'
import type { Telefunction } from '../types'

function decorateTelefunction(
  telefunction: Telefunction,
  exportName: string,
  telefuncFilePath: string,
  skipRegistration: boolean
) {
  assertTelefunction(telefunction, exportName, telefuncFilePath)
  addTelefunctionKey(telefunction, exportName, telefuncFilePath)
  if (!skipRegistration) {
    registerTelefunction(telefunction, exportName, telefuncFilePath)
  }
}

function addTelefunctionKey(telefunction: Telefunction, exportName: string, telefuncFilePath: string) {
  const telefunctionKey = getTelefunctionKey(telefuncFilePath, exportName)
  Object.assign(telefunction, {
    _key: telefunctionKey
  })
}
