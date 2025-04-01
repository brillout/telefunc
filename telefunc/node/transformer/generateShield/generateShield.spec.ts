import { testGenerateShield } from './generateShield.js'
import { expect, describe, it } from 'vitest'

describe('generateShield', () => {
  it('generateShield, one telefunction', async () => {
    const src = `export function doSomething(arg: string) {

}`
    const shieldedSrc = await testGenerateShield(src)
    expect(shieldedSrc).toMatchInlineSnapshot(`
      "import { shield as __telefunc_shield } from \\"telefunc\\";

      const __telefunc_t = __telefunc_shield.type;
      "
    `)
  })

  it('generateShield, two telefunctions', async () => {
    const src = `export function doSomething(arg: string) {

}

export function doSomethingElse(arg: string | number, arg2: { val?: number }) {

}`
    const shieldedSrc = await testGenerateShield(src)
    expect(shieldedSrc).toMatchInlineSnapshot(`
      "import { shield as __telefunc_shield } from \\"telefunc\\";

      const __telefunc_t = __telefunc_shield.type;
      "
    `)
  })

  it('generateShield, real use case', async () => {
    const src = `import { __decorateTelefunction } from "telefunc";export function onFoo(bar: string, baz: Attending) {
        console.log({ bar });
}

export enum Attending {
        MAYBE = 'MAYBE',
        ATTENDING = 'ATTENDING',
        NOT_ATTENDING = 'NOT_ATTENDING',
        UNKNOWN = 'UNKNOWN'
}`
    const shieldedSrc = await testGenerateShield(src)
    expect(shieldedSrc).toMatchInlineSnapshot(`
      "import { shield as __telefunc_shield } from \\"telefunc\\";

      const __telefunc_t = __telefunc_shield.type;
      "
    `)
  })
})
