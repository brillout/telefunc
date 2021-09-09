import { page, run, urlBase } from '../../libframe/test/setup'

run('npm run start')

test('remote shell with telefunc', async () => {
  page.goto(`${urlBase}/`)
  const text = await page.textContent('#view')
  expect(text).toContain('First name: Alan')
  expect(text).toContain('Last name: Turing')
})
