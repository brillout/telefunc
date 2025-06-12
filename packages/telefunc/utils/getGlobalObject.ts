export function getGlobalObject<T extends Record<string, unknown> = never>(
  // We use the filename as key; each `getGlobalObject()` call should live inside a file with a unique filename.
  key: `${string}.ts`,
  defaultValue: T,
): T {
  const globalObjectsAll = ((globalThis as any)[projectKey] = (globalThis as any)[projectKey] || {})
  const globalObject = (globalObjectsAll[key] = globalObjectsAll[key] || defaultValue)
  return globalObject
}
const projectKey = '_telefunc'
