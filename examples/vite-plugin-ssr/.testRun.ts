import { page, run, urlBase, autoRetry, fetchHtml } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run prod') {
  run(cmd)

  test('To-do list and context', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<h1>Alice&#x27;s to-do list</h1>')
    expect(html).toContain('<li>Buy milk</li>')
    expect(html).toContain('<li>Buy strawberries</li>')
    await page.goto(`${urlBase}/`)
    const text = await page.textContent('body')
    expect(text).toContain("Alice's to-do list")
    expect(text).toContain('Buy milk')
    expect(text).toContain('Buy strawberries')
  })

  test('Add to-do item', async () => {
    await page.goto(`${urlBase}/`)
    await page.fill('input[type="text"]', 'Buy bananas')
    await page.click('button[type="submit"]')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('Buy bananas')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<li>Buy bananas</li>')
    expect(html).toContain('bananas')
  })
}
