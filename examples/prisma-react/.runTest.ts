import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

export { runTest }

function runTest(cmd: 'npm run test:dev' | 'npm run test:prod') {
  run(cmd)

  test('Add to-do item', async () => {
    await page.goto(`${urlBase}/`)
    expect(await page.textContent('body')).toContain('todo list')
    await page.fill('input[placeholder="Title"]', 'Star the telefunc repo')
    await page.fill('input[placeholder="Content"]', 'the telefunc repo needs more stars')
    await page.click('button[type="submit"]')

    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('Star the telefunc repo')
      expect(await page.textContent('body')).toContain('the telefunc repo needs more stars')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    await page.goto(`${urlBase}/`)
    await autoRetry(async () => {
      const html = await page.content()

      expect(html).toContain('Star the telefunc repo')
      expect(html).toContain('the telefunc repo needs more stars')
    })
  })

  test('toggle item', async () => {
    await page.click('button[id="toggle-title"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('done')
    })
  })
}
