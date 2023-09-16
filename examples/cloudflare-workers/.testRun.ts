import { page, test, expect, run, skip, fetchHtml, isCI, getServerUrl, isWindows, autoRetry } from '@brillout/test-e2e'
import assert from 'assert'

export { testRun }

function testRun(cmd: 'npm run dev' | 'npm run preview:miniflare' | 'npm run preview:wrangler') {
  const isMiniflare = cmd === 'npm run preview:miniflare'
  const isWrangler = cmd === 'npm run preview:wrangler'
  const isWorker = isMiniflare || isWrangler

  // Wrangler v1 doesn't work with playwright pnpm 7 installation
  // TODO: use wrangler v2
  if (isWorker) {
    skip('SKIPPED: miniflare and wrangler')
    return
  }

  if ((isWindows() || !isNode16()) && isWorker) {
    skip('SKIPPED: miniflare and wrangler')
    return
  }

  // - `CLOUDFLARE_ACCOUNT_ID`/`CLOUDFLARE_API_TOKEN` not available for:
  //   - Vite's ecosystem CI
  //   - Pull Requests
  //     - https://github.community/t/feature-request-allow-secrets-in-approved-external-pull-requests/18071/4
  if (!process.env['CLOUDFLARE_ACCOUNT_ID']) {
    expect(process.env['CLOUDFLARE_ACCOUNT_ID']).toBeFalsy()
    expect(process.env['CLOUDFLARE_API_TOKEN']).toBeFalsy()
    if (isWrangler) {
      skip(
        "SKIPPED: wrangler tests cannot be run. Because missing environment variables `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. (This is expected in Pull Requests and Vite's ecosystem CI.)"
      )
      return
    }
  } else {
    expect(process.env['CLOUDFLARE_ACCOUNT_ID']).toBeTruthy()
    expect(process.env['CLOUDFLARE_API_TOKEN']).toBeTruthy()
  }

  {
    const additionalTimeout = !isWorker ? 0 : (isCI() ? 2 : 1) * 120 * 1000
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
    await page.goto(getServerUrl() + '/')
    await autoRetry(async () => {
      expect(await page.textContent('#view')).toBe('Welcome Eva')
    })
  })
}

function isNode16() {
  return !process.version.startsWith('v16.')
}
