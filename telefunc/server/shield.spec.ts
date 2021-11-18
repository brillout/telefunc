import { checkType } from './utils'
import { shield, shieldApply } from './shield'

test('shield - basic', () => {
  shield(onNewTodoItem, [shield.type.string])
  function onNewTodoItem(_text: string) {}
  expect(shieldApply(onNewTodoItem, ['a'])).toBe(true)
  expect(shieldApply(onNewTodoItem, [1])).toBe(false)
  expect(shieldApply(onNewTodoItem, [])).toBe(false)
})

test('shield - unit', () => {
  const t = shield.type

  shield(tfn1, [t.string, t.optional(t.number)])
  function tfn1(...[]: any) {}
  expect(shieldApply(tfn1, ['a', 1])).toBe(true)
  expect(shieldApply(tfn1, ['a', undefined])).toBe(true)
  expect(shieldApply(tfn1, ['a', undefined, undefined])).toBe(true)
  expect(shieldApply(tfn1, ['a'])).toBe(true)
  expect(shieldApply(tfn1, ['a', false])).toBe(false)

  shield(tfn2, [t.string, t.nullable(t.number)])
  function tfn2(...[]: any) {}
  expect(shieldApply(tfn2, ['a', 1])).toBe(true)
  expect(shieldApply(tfn2, ['a', null])).toBe(true)
  expect(shieldApply(tfn2, ['a', null, undefined])).toBe(true)
  expect(shieldApply(tfn2, ['a', undefined])).toBe(false)
  expect(shieldApply(tfn2, ['a'])).toBe(false)

  shield(tfn3, [t.or(t.string, t.number)])
  function tfn3(...[]: any) {}
  expect(shieldApply(tfn3, ['a'])).toBe(true)
  expect(shieldApply(tfn3, [1])).toBe(true)
  expect(shieldApply(tfn3, [1, 1])).toBe(false)
})

test('shield - full', () => {
  const t = shield.type
  const myTelefunctionShield = t.tuple([
    { a: t.number },
    t.or(t.string, t.number, t.null, {
      b: t.number,
      arr: t.tuple([t.number, t.undefined, t.or(t.value(1), t.value(true))]),
    }),
    t.optional(t.array(t.number)),
  ])
  shield(myTelefunction, myTelefunctionShield)
  function myTelefunction(...[]: any) {}
  expect(shieldApply(myTelefunction, [{ a: 1 }, 'b', [22, 33]])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: 0 }, null, []])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: -Infinity }, { b: 42, arr: [1, undefined, true] }, [22, 33, 44]])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: 0 }, ''])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: '' }])).toBe(false)
  expect(shieldApply(myTelefunction, [{ a: 0 }])).toBe(false)
  expect(shieldApply(myTelefunction, [])).toBe(false)
})

function testTypescriptBasics() {
  shield(onNewTodoItem, [shield.type.string])
  function onNewTodoItem(_text: string) {}
}

function testTypescriptFull() {
  const t = shield.type
  const myTelefunctionShield = t.tuple([
    { a: t.number },
    t.or(t.string, t.number, t.null, {
      b: t.number,
      arr: t.tuple([t.number, t.undefined, t.or(t.value(1), t.value(true))]),
    }),
    t.array(t.number),
  ])

  shield(myTelefunction, myTelefunctionShield)

  function myTelefunction(
    _a: { a: number },
    _b: string | number | null | { b: number; arr: [number, undefined, 1 | true] },
    _c: number[],
  ) {}

  shield(myTelefunctionInferred, myTelefunctionShield)
  function myTelefunctionInferred(...[..._args]: typeof myTelefunctionShield) {
    checkType<Parameters<typeof myTelefunction>>(_args)
  }
}

// Let TS believe that `testTypescript*` are not dangling
if (1 !== 1) {
  testTypescriptBasics()
  testTypescriptFull()
}
