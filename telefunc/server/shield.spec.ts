import { checkType } from './utils'
import { shield, shieldApply } from './shield'

function testTypescriptBasics() {
  shield(onNewTodoItem, [shield.type.string])
  function onNewTodoItem(_text: string) {}
}

test('shield - basic', () => {
  shield(onNewTodoItem, [shield.type.string])
  function onNewTodoItem(_text: string) {}
  expect(shieldApply(onNewTodoItem, ['a'])).toBe(true)
  expect(shieldApply(onNewTodoItem, [1])).toBe(false)
})

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
