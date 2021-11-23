import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

jest.setTimeout(50000)
run('npm run prod')


test('telefunction call', async () => {
  await page.goto(`${urlBase}/`)
  // `autoRetry` to ensure JavaScript has loaded & executed
  await autoRetry(async () => {
    const text = await page.textContent('#view')
    expect(text).toContain('First name: Alan')
    expect(text).toContain('Last name: Turing')
    expect(text).toContain('server: true')
  })
})
