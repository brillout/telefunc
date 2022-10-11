export function getGlobalObject<T extends Record<string, unknown> = never>(
  /** We use the filename or file path as module key */
  moduleKey: `${string}.ts`,
  defaultValue: T
): T {
  const allGlobalObjects = (globalThis.__telefunc = globalThis.__telefunc || {})
  const globalObject = (allGlobalObjects[moduleKey] = (allGlobalObjects[moduleKey] as T) || defaultValue)
  return globalObject
}
declare global {
  var __telefunc: undefined | Record<string, Record<string, unknown>>
}
