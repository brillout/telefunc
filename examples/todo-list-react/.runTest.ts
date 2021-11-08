import { page, run, urlBase, autoRetry, fetchHtml } from '../../libframe/test/setup'

export { runTest }

function runTest(cmd: 'npm run dev' | 'npm run prod') {
  run(cmd)

  test('Add to-do item', async () => {
    await page.goto(`${urlBase}/`)
    expect(await page.textContent('body')).toContain('Cherries')
    await page.waitForSelector('fieldset:not([disabled])')
    await page.fill('input[type="text"]', 'Banana')
    await page.click('button[type="submit"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('Banana')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('Banana')
  })

  test('Sessions', async () => {
    await page.goto(`${urlBase}/`)
    await page.waitForSelector('button:not([disabled]) >> text=Logout')
    await page.click('text=Logout')

    await page.waitForSelector('fieldset:not([disabled])')
    expect(await page.textContent('body')).toContain('Login')
    await page.fill('input[type="text"]', 'Seb')
    await page.click('text=Create Account')

    await page.waitForSelector('button:not([disabled]) >> text=Login as Seb')
    await page.click('button >> text=Login as Seb')
    expect(await page.textContent('body')).toContain('User: Seb')
    expect((await page.$$('li')).length).toBe(1)
    expect(await page.textContent('body')).not.toContain('Cherries')

    await page.waitForSelector('fieldset:not([disabled])')
    await page.fill('input[type="text"]', 'Apples')
    await page.click('button[type="submit"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('Apples')
    })
  })
}
