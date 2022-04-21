import { generateShield } from './transformer'

test('generateShield, one telefunction', async () => {
  const src = `export function doSomething(arg: string) {

}`
  const shieldedSrc = generateShield(src)
  expect(shieldedSrc).toEqual(`import { shield as __shieldGenerator_shield } from "telefunc";

${src}

const __shieldGenerator_t = __shieldGenerator_shield.type;
__shieldGenerator_shield(doSomething, [__shieldGenerator_t.string], { __generated: true })
`)
})

test('generateShield, two telefunctions', async () => {
  const src = `export function doSomething(arg: string) {

}

export function doSomethingElse(arg: string | number, arg2: { val?: number }) {

}`
  const shieldedSrc = generateShield(src)
  expect(shieldedSrc).toEqual(`import { shield as __shieldGenerator_shield } from "telefunc";

${src}

const __shieldGenerator_t = __shieldGenerator_shield.type;
__shieldGenerator_shield(doSomething, [__shieldGenerator_t.string], { __generated: true })
__shieldGenerator_shield(doSomethingElse, [__shieldGenerator_t.or(__shieldGenerator_t.number, __shieldGenerator_t.string), { val: __shieldGenerator_t.optional(__shieldGenerator_t.number) }], { __generated: true })
`)
})
