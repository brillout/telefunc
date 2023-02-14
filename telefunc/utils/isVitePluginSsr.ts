export function isVitePluginSsr(): boolean {
  return globalThis._isVitePluginSsr === true
}

declare global {
  var _isVitePluginSsr: undefined | boolean
}
