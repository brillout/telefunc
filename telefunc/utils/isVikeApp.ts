export function isVikeApp(): boolean {
  const g = globalThis as Record<string, unknown>
  // Set by Vike: https://github.com/vikejs/vike/blob/c6fda92e838f1ea35f5df5a84f8e19781cdb81cf/vike/node/runtime/index-common.ts#L20
  return !!g._isVikeApp || !!g._isVitePluginSsr
}
