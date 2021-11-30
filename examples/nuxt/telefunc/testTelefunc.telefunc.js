import assert from 'assert'

export { testTelefunc }

async function testTelefunc() {
  const telefunctionWasRunInServer = typeof window === 'undefined'
  // Always true since telefunctions always run on the server-side
  assert(telefunctionWasRunInServer===true)
  return telefunctionWasRunInServer
}
