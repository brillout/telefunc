import { page, run, urlBase, autoRetry, fetchHtml } from '../../libframe/test/setup'

export { runTest }

function runTest(cmd: 'npm run test:dev' | 'npm run test:prod') {
  run(cmd)

  test('Add to-do item', async () => {
    await page.goto(`${urlBase}/`)
    expect(await page.textContent('body')).toContain('todo list')
    await page.fill('input[placeholder="Title"]', 'title')
    await page.fill('input[placeholder="Content"]', 'content')
    await page.click('button[type="submit"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('title')
      expect(await page.textContent('body')).toContain('content')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('title')
    expect(html).toContain('content')
  })

  test('toggle item', async () => {
    await page.click('button[id="toggle-title"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('done')
    })
  })
}
