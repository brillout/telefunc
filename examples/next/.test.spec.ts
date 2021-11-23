import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

run('npm run prod', {
  serverIsRunningMessage: 'started server on',
  debug: true,
  additionalTimeout: 240 * 1000,
  serverIsRunningDelay: 20 * 1000,
})

test('telefunction call', async () => {
  await sleep(20 * 1000)
  console.log('b1')
  await page.goto(`${urlBase}/`)
  console.log('b2')

  // `autoRetry` to ensure async remote Telefunction call has finished
  await autoRetry(
    async () => {
      const text = await page.textContent('#view')
      expect(text).toContain('First name: Alan')
    },
    { timeout: 120 * 1000 },
  )

  const text = await page.textContent('#view')
  expect(text).toContain('Last name: Turing')
  expect(text).toContain('server: true')
})

function sleep(milliseconds: number): Promise<void> {
  return new Promise((r) => setTimeout(r, milliseconds))
}
