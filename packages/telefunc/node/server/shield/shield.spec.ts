import { checkType } from '../../../utils/checkType.js'
import { shield, shieldApply, shieldToHumandReadable } from '../shield.js'
import { expect, describe, it } from 'vitest'

describe('shield', () => {
  it('accepts zod-like schemas', () => {
    type ZodLikeString = {
      safeParse(value: unknown):
        | { success: true; data: string }
        | {
            success: false
            error: {
              issues: Array<{ message: string; path?: Array<string | number> }>
            }
          }
    }

    const stringSchema: ZodLikeString = {
      safeParse(value) {
        if (typeof value === 'string') {
          return { success: true, data: value }
        }
        return {
          success: false,
          error: {
            issues: [{ message: 'Expected string' }],
          },
        }
      },
    }

    function onNewTodo(_text: string) {}
    shield(onNewTodo, [stringSchema])

    expect(shieldApply(onNewTodo, ['Write docs'])).toBe(true)
    expect(shieldApply(onNewTodo, [42])).toBe('[root] > [tuple: element 0] Expected string')
  })

  it('accepts Standard Schema validators', () => {
    const todoSchema = {
      '~standard': {
        version: 1,
        vendor: 'test-schema',
        validate(value: unknown) {
          if (
            typeof value === 'object' &&
            value !== null &&
            'text' in value &&
            typeof value.text === 'string' &&
            value.text.length > 0
          ) {
            return { value }
          }
          return {
            issues: [{ message: 'Text is required', path: ['text'] }],
          }
        },
        types: {
          input: null as unknown as { text: string },
          output: null as unknown as { text: string },
        },
      },
    }

    function onNewTodo(todo: { text: string }) {}
    shield(onNewTodo, [todoSchema])

    expect(shieldApply(onNewTodo, [{ text: 'Ship it' }])).toBe(true)
    expect(shieldApply(onNewTodo, [{}])).toBe(
      '[root] > [tuple: element 0] > [test-schema schema path `text`] Text is required',
    )
  })

  it('shield - basic', () => {
    shield(onNewTodoItem, [shield.type.string])
    function onNewTodoItem(_text: string) {}
    expect(shieldApply(onNewTodoItem, ['a'])).toBe(true)
    expect(shieldApply(onNewTodoItem, [1])).toBe('[root] > [tuple: element 0] is `number` but should be `string`.')
    expect(shieldApply(onNewTodoItem, [])).toBe('[root] > [tuple: element 0] is `undefined` but should be `string`.')
  })

  it('shield - human readable', () => {
    const t = shield.type
    expect(shieldToHumandReadable([t.string, t.number])).toBe('[string,number]')
    expect(shieldToHumandReadable([t.string, t.optional(t.number)])).toBe('[string,number|undefined]')
    expect(shieldToHumandReadable([{ a: t.string, b: t.nullable(t.number) }])).toBe('[{a:string,b:number|null}]')
    expect(shieldToHumandReadable(myTelefunctionShield)).toBe(
      '[{a:number},string|number|null|{b:number,arr:[number,undefined,1|true]},number[]|undefined]',
    )
  })

  it('shield - unit', () => {
    const t = shield.type

    {
      const telefunction = (...[]: any) => {}
      shield(telefunction, [t.string, t.optional(t.number)])
      expect(shieldApply(telefunction, ['a', 1])).toBe(true)
      expect(shieldApply(telefunction, ['a', undefined])).toBe(true)
      expect(shieldApply(telefunction, ['a', undefined, undefined])).toBe(true)
      expect(shieldApply(telefunction, ['a'])).toBe(true)
      expect(shieldApply(telefunction, ['a', false])).toBe('[root] > [tuple: element 1] is of wrong type')
    }

    {
      const telefunction = (...[]: any) => {}
      shield(telefunction, [t.string, t.nullable(t.number)])
      expect(shieldApply(telefunction, ['a', 1])).toBe(true)
      expect(shieldApply(telefunction, ['a', null])).toBe(true)
      expect(shieldApply(telefunction, ['a', null, undefined])).toBe(true)
      expect(shieldApply(telefunction, ['a', undefined])).toBe('[root] > [tuple: element 1] is of wrong type')
      expect(shieldApply(telefunction, ['a'])).toBe('[root] > [tuple: element 1] is of wrong type')
    }

    {
      const telefunction = (...[]: any) => {}
      shield(telefunction, [t.or(t.string, t.number)])
      expect(shieldApply(telefunction, ['a'])).toBe(true)
      expect(shieldApply(telefunction, [1])).toBe(true)
      expect(shieldApply(telefunction, [1, 1])).toBe('[root] > [tuple: element 1] is `1` but should be `undefined`.')
    }

    {
      const telefunction = (...[]: [{ a: [string, number] }]) => {}
      shield(telefunction, [{ a: t.tuple(t.string, t.number) }])
      expect(shieldApply(telefunction, [{ a: ['', 0] }])).toBe(true)
      expect(shieldApply(telefunction, [{}])).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] is `undefined` but should be `tuple`.',
      )
    }

    {
      const telefunction = shield((_a) => {}, [t.object(t.number)])
      expect(shieldApply(telefunction, [{ k: 'some string' }])).toBe(
        '[root] > [tuple: element 0] > [object: value of key `k`] is `string` but should be `number`.',
      )
    }
    {
      const telefunction = shield((_a) => {}, [{ a: { b: { c: t.const(42) } } }])
      expect(shieldApply(telefunction, [{ a: { b: { c: 'some string' } } }])).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] > [object: value of key `b`] > [object: value of key `c`] is `some string` but should be `42`.',
      )
    }
    {
      const telefunction = shield((_a) => {}, [{ a: { b: { c: t.const(42) } } }])
      expect(shieldApply(telefunction, [{ a: { b: { d: 42 } } }])).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] > [object: value of key `b`] > [object: value of key `c`] is `undefined` but should be `42`.',
      )
    }
    {
      const telefunction = shield((_a) => {}, [{ a: { b: { c: t.const(42) } } }])
      expect(shieldApply(telefunction, [{ a: { b: { c: 42, d: 42 } } }])).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] > [object: value of key `b`] > [object: value of key `d`] is `42` but should be `undefined`.',
      )
    }
  })

  const t = shield.type
  const myTelefunctionShield = t.tuple(
    { a: t.number },
    t.or(t.string, t.number, t.const(null), {
      b: t.number,
      arr: t.tuple(t.number, t.const(undefined), t.or(t.const(1), t.const(true))),
    }),
    t.optional(t.array(t.number)),
  )
  it('shield - full', () => {
    shield(myTelefunction, myTelefunctionShield)
    function myTelefunction(...[]: any) {}
    expect(shieldApply(myTelefunction, [{ a: 1 }, 'b', [22, 33]])).toBe(true)
    expect(shieldApply(myTelefunction, [{ a: 0 }, null, []])).toBe(true)
    expect(shieldApply(myTelefunction, [{ a: -Infinity }, { b: 42, arr: [1, undefined, true] }, [22, 33, 44]])).toBe(
      true,
    )
    expect(shieldApply(myTelefunction, [{ a: 0 }, ''])).toBe(true)
    expect(shieldApply(myTelefunction, [{ a: '' }])).toBe(
      '[root] > [tuple: element 0] > [object: value of key `a`] is `string` but should be `number`.',
    )
    expect(shieldApply(myTelefunction, [{ a: 0 }])).toBe('[root] > [tuple: element 1] is of wrong type')
    expect(shieldApply(myTelefunction, [])).toBe('[root] > [tuple: element 0] is `undefined` but should be `object`.')
  })

  function testTypescriptBasics() {
    shield(onNewTodoItem, [shield.type.string])
    function onNewTodoItem(_text: string) {}
  }

  function testTypescriptSchemaIntegrations() {
    type ZodLikeSchema<Output> = {
      safeParse(
        value: unknown,
      ):
        | { success: true; data: Output }
        | { success: false; error: { issues?: Array<{ message?: string; path?: Array<string | number> }> } }
    }
    type StandardSchema<Input> = {
      '~standard': {
        version: number
        vendor: string
        validate(value: unknown): {
          value?: unknown
          issues?: Array<{ message?: string; path?: Array<string | number> }>
        }
        types?: {
          input: Input
          output: unknown
        }
      }
    }

    const zString = {} as ZodLikeSchema<string>
    function onZod(_text: string) {}
    shield(onZod, [zString])

    const standardTodo = {} as StandardSchema<{ text: string }>
    function onStandard(_todo: { text: string }) {}
    shield(onStandard, [standardTodo])
  }

  function testTypescriptFull() {
    shield(myTelefunction, myTelefunctionShield)

    function myTelefunction(
      _a: { a: number },
      _b: string | number | null | { b: number; arr: [number, undefined, 1 | true] },
      _c: number[] | undefined,
    ) {}

    shield(myTelefunctionInferred, myTelefunctionShield)
    function myTelefunctionInferred(...[..._args]: typeof myTelefunctionShield) {
      checkType<Parameters<typeof myTelefunction>>(_args)
    }
  }

  // Let TS believe that `testTypescript*` are not dangling
  if (1 !== 1) {
    testTypescriptBasics()
    testTypescriptSchemaIntegrations()
    testTypescriptFull()
  }
})
