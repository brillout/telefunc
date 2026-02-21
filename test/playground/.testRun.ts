export { testRun }

import { page, test, expect, expectLog, run, getServerUrl, autoRetry, fetchHtml } from '@brillout/test-e2e'
import { testCounter } from '../utils'

function testRun(cmd: 'npm run dev' | 'npm run preview') {
  run(cmd, {
    tolerateError(log) {
      return log.logText.includes('File arguments are being consumed out of order')
    },
  })

  const isDev = cmd === 'npm run dev'

  test('hello', async () => {
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

  test('counter', async () => {
    await testCounter()
  })

  test('file upload: single file + text arg', async () => {
    await page.goto(`${getServerUrl()}/`)
    await autoRetry(async () => {
      expect(await page.textContent('body')).toContain('File Upload Tests')
    })

    await page.click('#test-single')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result).deep.equal({
        fileName: 'test.txt',
        fileSize: 5,
        fileType: 'text/plain',
        content: 'hello',
        description: 'desc1',
      })
    })
  })

  test('file upload: multiple files', async () => {
    await page.click('#test-multiple')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result).deep.equal({
        file1: { name: 'a.txt', content: 'aaa' },
        file2: { name: 'b.txt', content: 'bbb' },
      })
    })
  })

  test('file upload: File[] array', async () => {
    await page.click('#test-array')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result).length(3)
      expect(result[0]).deep.equal({ name: 'x.txt', content: 'xxx' })
      expect(result[1]).deep.equal({ name: 'y.txt', content: 'yyy' })
      expect(result[2]).deep.equal({ name: 'z.txt', content: 'zzz' })
    })
  })

  test('file upload: file.stream()', async () => {
    await page.click('#test-stream')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result.totalBytes).toBe(800_000) // 'streamed'.length(8) * 100_000
      expect(result.chunkCount).greaterThan(1)
    })
  })

  test('file upload: file.arrayBuffer()', async () => {
    await page.click('#test-arraybuffer')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result).deep.equal({ content: 'buffered', byteLength: 8 })
    })
  })

  test('file upload: one-shot read (read twice throws)', async () => {
    await page.click('#test-read-twice')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result.error).toBeTruthy()
      expect(result.error).toContain('already been consumed')
    })
  })

  test('file upload: out-of-order access drains skipped file', async () => {
    await page.click('#test-out-of-order')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result.text2).toBe('BBB')
      expect(result.file1Error).toBeTruthy()
    })
  })

  test('file upload: backpressure (slow consumer)', async () => {
    await page.click('#test-backpressure')
    await autoRetry(async () => {
      const result = JSON.parse((await page.textContent('#upload-result'))!)
      expect(result.totalBytes).toBe(800_000)
      expect(result.chunkCount).greaterThan(1)
      // 50ms sleep per chunk — elapsed should reflect the delay
      expect(result.elapsed).greaterThanOrEqual(result.chunkCount * 30)
    })
  })

  if (!isDev) {
    test('shield() generation', async () => {
      {
        const resp = await makeTelefuncHttpRequest('Jon')
        expect(resp.status).toBe(200)
        const { ret } = await resp.json()
        expect(ret.message).toBe('Welcome Jon')
      }
      {
        const resp = await makeTelefuncHttpRequest(1337)
        expect(resp.status).toBe(422)
        expect(await resp.text()).toBe('Shield Validation Error')
        // [14:10:31.724][/.test-preview.test.ts][npm run preview][stderr] Shield Validation Error: the arguments passed to the telefunction onLoad() (/pages/index/Hello.telefunc.ts) have the wrong type. Arguments: `[{"name":1337}]`. Wrong type: [root] > [tuple: element 0] > [object: value of key `name`] is `number` but should be `string`.
        expectLog('Shield Validation Error', {
          filter: (log) =>
            log.logSource === 'stderr' && log.logText.includes('onLoad()') && log.logText.includes('Hello.telefunc.ts'),
        })
      }
    })
  }
}

async function makeTelefuncHttpRequest(name: string | number) {
  const resp = await fetch(`${getServerUrl()}/_telefunc`, {
    method: 'POST',
    body: JSON.stringify({
      file: '/pages/index/Hello.telefunc.ts',
      name: 'onLoad',
      args: [{ name }],
    }),
  })
  return resp
}
