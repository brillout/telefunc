import { page, run, urlBase, autoRetry } from '../../libframe/test/setup'

export { runTest }

function runTest(cmd: 'npm run test:dev' | 'npm run test:prod') {
  run(cmd)

  test('Add to-do item', async () => {
    await page.goto(`${urlBase}/`)
    expect(await page.textContent('h1')).toBe('To-do List')
    await page.fill('input[placeholder="Title"]', 'Cherries')
    await page.fill('input[placeholder="Content"]', 'Buy cherries')
    await page.click('button[type="submit"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('Cherries')
      expect(await page.textContent('body')).toContain('Buy cherries')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    await page.goto(`${urlBase}/`)
    await autoRetry(async () => {
      const html = await page.content()
      expect(html).toContain('Cherries')
      expect(html).toContain('Buy cherries')
    })
  })

  test('Toggle is-completed state of to-do item', async () => {
    expect(await page.textContent('body')).not.toContain('done')
    await page.click('input[type="checkbox"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('done')
    })
  })

  test('Remove to-do item', async () => {
    const numberOfItems = (await page.$$('li')).length
    await page.click('button.remove')
    await autoRetry(async () => {
      expect((await page.$$('li')).length).toBe(numberOfItems - 1)
    })
  })
}
