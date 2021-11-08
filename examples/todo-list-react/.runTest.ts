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
}
