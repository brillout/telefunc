export { testRun }

import { page, test, expect, run, autoRetry, fetchHtml } from '@brillout/test-e2e'

function testRun(cmd: 'pnpm run dev' | 'pnpm run preview') {
  const serverUrl = cmd.includes('dev') ? 'http://localhost:5173' : 'http://localhost:4173'
  run(cmd, {
    serverIsReadyMessage: serverUrl,
    serverUrl
  })

  test('Home page', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<h1>Welcome to SvelteKit</h1>')
    expect(html).toContain('<span>Counter: 42</span>')
  })

  test('Increment counter', async () => {
    await page.goto(`${serverUrl}/`)
    expect(await page.textContent('span')).toBe('Counter: 42')
    await page.evaluate(() => setTimeout(() => (window as any).__wait = true, 1000))
    await page.waitForFunction(() => (window as any).__wait)
    await page.click('button >> text=+1')
    await autoRetry(async () => {
      expect(await page.textContent('span')).toBe('Counter: 43')
    })
  })

  test('New counter value is persisted', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<span>Counter: 43</span>')
  })
}
