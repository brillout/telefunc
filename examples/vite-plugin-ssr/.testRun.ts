import { page, run, urlBase, autoRetry, fetchHtml } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run prod') {
  run(cmd)

  test('HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<h1>To-do List</h1>')
    expect(html).toContain('<li>Buy milk</li>')
    expect(html).toContain('<li>Buy strawberries</li>')
  })

  test('Add to-do item', async () => {
    await page.goto(`${urlBase}/`)
    {
      const text = await page.textContent('body')
      expect(text).toContain('To-do List')
      expect(text).toContain('Buy milk')
      expect(text).toContain('Buy strawberries')
    }

    await page.fill('input[type="text"]', 'Buy bananas')
    await page.click('button[type="submit"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('Buy bananas')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<li>Buy bananas</li>')
  })
}
