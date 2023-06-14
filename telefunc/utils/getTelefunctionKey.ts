export function getTelefunctionKey(filePath: string, exportName: string) {
  /* This assert fails for Filesystem Routing paths such as `pages/product/:id/index.js`.
   * This assert isn't actually necessary since `telefunctionKey` is never parsed.
  assert(!filePath.includes(':'))
  */
  const telefunctionKey = filePath + ':' + exportName
  return telefunctionKey
}
