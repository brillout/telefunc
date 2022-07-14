import { page, run, urlBase, autoRetry, fetchHtml } from '../../libframe/test/setup'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run prod') {
  run(cmd, {
    serverIsReadyMessage: 'started server on'
    /* Debug Next.js in GitHub Actions:
    debug: true,
    additionalTimeout: 240 * 1000,
    serverIsReadyDelay: 20 * 1000,
    //*/
  })

  test('To-do list and context', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<h1>Elisabeth&#x27;s to-do list</h1>')
    expect(html).toContain('<li>Buy milk</li>')
    expect(html).toContain('<li>Buy strawberries</li>')
    await page.goto(`${urlBase}/`)
    const text = await page.textContent('body')
    expect(text).toContain("Elisabeth's to-do list")
    expect(text).toContain('Buy milk')
    expect(text).toContain('Buy strawberries')
  })

  test('Add to-do item', async () => {
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
