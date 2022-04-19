import { readFileSync } from 'fs'
import { generateShield } from './transformer'

// FIXME?
const typesSrc = readFileSync(`${__dirname}/../../../../node/server/shield/codegen/types.d.ts`).toString()

test('generateShield, one telefunction', async () => {
  const src = `export function doSomething(arg: string) {

}`
  const shieldedSrc = generateShield(src, typesSrc)
  expect(shieldedSrc).toEqual(`import { shield } from "telefunc";

${src}

const t = shield.type;
shield(doSomething, [t.string])
`)
})

test('generateShield, two telefunctions', async () => {
  const src = `export function doSomething(arg: string) {

}

export function doSomethingElse(arg: string | number, arg2: { val?: number }) {

}`
  const shieldedSrc = generateShield(src, typesSrc)
  expect(shieldedSrc).toEqual(`import { shield } from "telefunc";

${src}

const t = shield.type;
shield(doSomething, [t.string])
shield(doSomethingElse, [t.union(t.number, t.string), { val: t.optional(t.number) }])
`)
})
