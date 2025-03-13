import { assert } from './assert.js'

export function getTelefunctionKey(filePath: string, exportName: string) {
  assert(!exportName.includes(':'))
  const telefunctionKey = filePath + ':' + exportName
  return telefunctionKey
}
