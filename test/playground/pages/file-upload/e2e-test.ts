export { testFileUpload }

import { page, test, expect, autoRetry, getServerUrl } from '@brillout/test-e2e'

function testFileUpload() {
  test('file upload: single file + text arg', async () => {
    await page.goto(`${getServerUrl()}/file-upload`)
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
}
