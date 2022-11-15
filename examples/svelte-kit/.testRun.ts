import { page, test, expect, run, urlBase, autoRetry, fetchHtml } from '@brillout/test-e2e'

export { testRun }

function testRun(cmd: 'pnpm run dev' | 'pnpm run test:preview') {
  run(cmd, {
    serverIsReadyMessage: 'Network: use --host to expose'
  })

  test('Load home page then about page', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('try editing')
    expect(html).toContain('42')
    await page.goto(`${urlBase}/about`)
    const text = await page.textContent('body')
    expect(text).toContain('About this app')
  })

  test('Increment counter', async () => {
    await page.goto(`${urlBase}/`)
    await page.click('button.counter-inc')
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('43')
    })
  })

  test('New to-do item is persisted & rendered to HTML', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('43')
  })
}
