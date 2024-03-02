import { page, test, expect, run, getServerUrl, autoRetry, fetchHtml, fetch } from '@brillout/test-e2e'

export { testRun }

function testRun(
  cmd: 'npm run dev' | 'npm run preview' | 'npm run start' | 'npm run prod',
  { skipShieldGenerationTest, doNotFailOnWarning }: { skipShieldGenerationTest?: true; doNotFailOnWarning?: true } = {},
) {
  run(cmd, { doNotFailOnWarning })

  {
    const isDev = cmd !== 'npm run preview'
    if (isDev) {
      skipShieldGenerationTest = true
    }
  }

  test('example', async () => {
    {
      const html = await fetchHtml('/')
      expect(html).toContain('Loading...')
      expect(html).not.toContain('Eva')
    }
    {
      page.goto(`${getServerUrl()}/`)
      // `autoRetry` to ensure that async JavaScript has loaded & executed
      await autoRetry(async () => {
        expect(await page.textContent('body')).toContain('Welcome Eva')
      })
      expect(await page.textContent('body')).not.toContain('Loading')
    }
  })

  if (!skipShieldGenerationTest) {
    test('shield() generation', async () => {
      {
        const resp = await makeTelefuncHttpRequest('Jon')
        const { ret } = await resp.json()
        expect(resp.status).toBe(200)
        expect(ret.message).toBe('Welcome Jon')
      }
      {
        const resp = await makeTelefuncHttpRequest(1337)
        expect(resp.status).toBe(403)
        expect(await resp.text()).toBe('{"ret":"!undefined","abort":true}')
      }
    })
  }
}

async function makeTelefuncHttpRequest(name: string | number) {
  const resp = await fetch(`${getServerUrl()}/_telefunc`, {
    method: 'POST',
    body: JSON.stringify({
      file: '/hello.telefunc.ts',
      name: 'hello',
      args: [{ name }],
    }),
  })
  return resp
}
