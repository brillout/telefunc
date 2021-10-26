import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

run('npm run start')

test('webpack telefunction call', async () => {
  await page.goto(`${urlBase}/`)

  // `autoRetry` to ensure JavaScript has loaded & executed
  await autoRetry(async () => {
    const text = await page.textContent('#view')
    expect(text).toContain('First name: Alan')
    expect(text).toContain('Last name: Turing')
  })
})
