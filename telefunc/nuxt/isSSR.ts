export { isSSR }

function isSSR(compiler: { name?: string }): boolean {
  return compiler.name === 'server'
}
