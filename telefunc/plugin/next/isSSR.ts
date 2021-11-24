export { isSSR }

function isSSR(name?: string): boolean {
  return name === 'server'
}
