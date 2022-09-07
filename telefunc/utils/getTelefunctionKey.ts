import { assert } from './assert'

export function getTelefunctionKey(filePath: string, exportName: string) {
  assert(!filePath.includes(':')) // This assert isn't actually necessary since `telefunctionKey` is never parsed
  const telefunctionKey = filePath + ':' + exportName
  return telefunctionKey
}
