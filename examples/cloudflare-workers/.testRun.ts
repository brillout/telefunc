import { page, run, fetchHtml, isGithubAction, urlBase, isWindows, autoRetry } from '../../libframe/test/setup'
import assert from 'assert'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run preview:miniflare' | 'npm run preview:wrangler') {
  const isMiniflare = cmd === 'npm run preview:miniflare'
  const isWrangler = cmd === 'npm run preview:wrangler'
  const isWorker = isMiniflare || isWrangler

  // Wrangler v1 doesn't work with playwright pnpm 7 installation
  // TODO: use wrangler v2
  if (isWorker) {
    test('SKIPED: miniflare and wrangler', () => {})
    return
  }

  if ((isWindows() || !isNode16()) && isWorker) {
    test('SKIPED: miniflare and wrangler', () => {})
    return
  }

  if (isWrangler) {
    if (!isGithubAction() || process.env['GIT_BRANCH'] !== 'master') {
      test('SKIPED: wrangler test is not run locally nor in Pull Requests', () => {})
      return
    }
    test('API keys', () => {
      const envVars = Object.keys(process.env)
      expect(envVars).toContain('CF_ACCOUNT_ID')
      expect(envVars).toContain('CF_API_TOKEN')
    })
  }

  {
    const additionalTimeout = !isWorker ? 0 : (isGithubAction() ? 2 : 1) * 120 * 1000
    const serverIsReadyMessage = (() => {
      if (isMiniflare) {
        return 'Listening on :3000'
      }
      if (isWrangler) {
        return 'Ignoring stale first change'
      }
      assert(!isWorker)
      // Express.js dev server
      return undefined
    })()
    const serverIsReadyDelay = isWorker ? 5000 : undefined
    run(cmd, { additionalTimeout, serverIsReadyMessage, serverIsReadyDelay })
  }

  test('frontend', async () => {
    const html = await fetchHtml('/')
    expect(html).toContain('<div id="view">Loading...</div>')
  })

  test('telefunction hello()', async () => {
    await page.goto(urlBase + '/')
    await autoRetry(async () => {
      expect(await page.textContent('#view')).toBe('Welcome Eva')
    })
  })
}

function isNode16() {
  return !process.version.startsWith('v16.')
}
