export function isVikeApp(): boolean {
  const g = globalThis as Record<string, unknown>
  // Set by Vike: https://github.com/vikejs/vike/blob/8fa3acac956a8b310f8c7cbfa75e28bb42a93f7c/vike/node/runtime/index-common.ts#L20
  return !!g._isVikeApp || !!g._isVitePluginSsr
}
