export function isVitePluginSsr(): boolean {
  // https://github.com/vikejs/vike/blob/9d3cc76de9c966a9c38803553ecfcae740a02860/vike/node/index.ts#L16-L20
  return globalThis._isVitePluginSsr === true
}
declare global {
  var _isVitePluginSsr: undefined | boolean
}
