import { page, test, expect, run, getServerUrl, autoRetry, fetchHtml } from '@brillout/test-e2e'
import { SERVER_IS_READY } from './SERVER_IS_READY'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run prod') {
  const additionalTimeout = 10 * 1000
  const serverIsReadyDelay = 30 * 1000
  run(cmd, { serverIsReadyMessage: SERVER_IS_READY, serverIsReadyDelay, additionalTimeout })

  test('To-do list and context', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain("<h1>Elisabeth's to-do list</h1>")
    expect(html).toContain('<li>Buy milk</li>')
    expect(html).toContain('<li>Buy strawberries</li>')
    await page.goto(`${getServerUrl()}/`)
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
