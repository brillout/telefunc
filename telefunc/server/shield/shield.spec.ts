import { checkType } from '../utils'
import { shield, shieldApply, shieldToHumandReadable } from '../shield'

test('shield - basic', () => {
  shield(onNewTodoItem, [shield.type.string])
  function onNewTodoItem(_text: string) {}
  expect(shieldApply(onNewTodoItem, ['a'])).toBe(true)
  expect(shieldApply(onNewTodoItem, [1])).toBe('[root] > [tuple element 0] is `number` but should be `string`.')
  expect(shieldApply(onNewTodoItem, [])).toBe('[root] > [tuple element 0] is `undefined` but should be `string`.')


})

test('shield - human readable', () => {
  const t = shield.type
  expect(shieldToHumandReadable([t.string, t.number])).toBe('[string,number]')
  expect(shieldToHumandReadable([t.string, t.optional(t.number)])).toBe('[string,number|undefined]')
  expect(shieldToHumandReadable([{a: t.string, b: t.nullable(t.number)}])).toBe('[{a:string,b:number|null}]')
  expect(shieldToHumandReadable(myTelefunctionShield)).toBe('[{a:number},string|number|null|{b:number,arr:[number,undefined,1|true]},number[]|undefined]')
})

test('shield - unit', () => {
  const t = shield.type

  shield(tfn1, [t.string, t.optional(t.number)])
  function tfn1(...[]: any) {}
  expect(shieldApply(tfn1, ['a', 1])).toBe(true)
  expect(shieldApply(tfn1, ['a', undefined])).toBe(true)
  expect(shieldApply(tfn1, ['a', undefined, undefined])).toBe(true)
  expect(shieldApply(tfn1, ['a'])).toBe(true)
  expect(shieldApply(tfn1, ['a', false])).toBe('[root] > [tuple element 1] is of wrong type')
  /*
  expect(shieldApply(myTelefunction, [{ a: '' }])).toBe('[root] > [tuple] element `0` > [object] key `a`: is `string` but should be `number`.')
  expect(shieldApply(myTelefunction, [{ a: 0 }])).toBe('[root] > [tuple] element `1`: is `false` but should be ``')
  */

  shield(tfn2, [t.string, t.nullable(t.number)])
  function tfn2(...[]: any) {}
  expect(shieldApply(tfn2, ['a', 1])).toBe(true)
  expect(shieldApply(tfn2, ['a', null])).toBe(true)
  expect(shieldApply(tfn2, ['a', null, undefined])).toBe(true)
  expect(shieldApply(tfn2, ['a', undefined])).toBe('[root] > [tuple element 1] is of wrong type')
  expect(shieldApply(tfn2, ['a'])).toBe('[root] > [tuple element 1] is of wrong type')

  shield(tfn3, [t.or(t.string, t.number)])
  function tfn3(...[]: any) {}
  expect(shieldApply(tfn3, ['a'])).toBe(true)
  expect(shieldApply(tfn3, [1])).toBe(true)
  expect(shieldApply(tfn3, [1, 1])).toBe('[root] > [tuple element 1] is `1` but should be `undefined`.')
})

const t = shield.type
const myTelefunctionShield = t.tuple([
  { a: t.number },
  t.or(t.string, t.number, t.null, {
    b: t.number,
    arr: t.tuple([t.number, t.undefined, t.or(t.value(1), t.value(true))]),
  }),
  t.optional(t.array(t.number)),
])
test('shield - full', () => {
  shield(myTelefunction, myTelefunctionShield)
  function myTelefunction(...[]: any) {}
  expect(shieldApply(myTelefunction, [{ a: 1 }, 'b', [22, 33]])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: 0 }, null, []])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: -Infinity }, { b: 42, arr: [1, undefined, true] }, [22, 33, 44]])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: 0 }, ''])).toBe(true)
  expect(shieldApply(myTelefunction, [{ a: '' }])).toBe('[root] > [tuple element 0] > [object value of key `a`] is `string` but should be `number`.')
  expect(shieldApply(myTelefunction, [{ a: 0 }])).toBe('[root] > [tuple element 1] is of wrong type')
  expect(shieldApply(myTelefunction, [])).toBe('[root] > [tuple element 0] is `undefined` but should be `object`.')
})

function testTypescriptBasics() {
  shield(onNewTodoItem, [shield.type.string])
  function onNewTodoItem(_text: string) {}
}

function testTypescriptFull() {
  shield(myTelefunction, myTelefunctionShield)

  function myTelefunction(
    _a: { a: number },
    _b: string | number | null | { b: number; arr: [number, undefined, 1 | true] },
    _c: number[]|undefined,
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
