import { StandardSchemaV1 } from '../../../standard-schema.js'
import { checkType } from '../../../utils/checkType.js'
import { shield, shieldApply, shieldToHumandReadable } from '../shield.js'
import { expect, describe, it } from 'vitest'

describe('shield', () => {
  it('shield - basic', () => {
    shield(onNewTodoItem, [shield.type.string])
    function onNewTodoItem(_text: string) {}
    expect(shieldApply(onNewTodoItem, ['a'])).toStrictEqual({ validatedArguments: ['a'] })
    expect(shieldApply(onNewTodoItem, [1]).error?.message).toBe(
      '[root] > [tuple: element 0] is `number` but should be `string`.',
    )
    expect(shieldApply(onNewTodoItem, []).error?.message).toBe(
      '[root] > [tuple: element 0] is `undefined` but should be `string`.',
    )
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

      expect(shieldApply(telefunction, ['a', 1])).toStrictEqual({ validatedArguments: ['a', 1] })
      expect(shieldApply(telefunction, ['a', undefined])).toStrictEqual({ validatedArguments: ['a', undefined] })
      expect(shieldApply(telefunction, ['a', undefined, undefined])).toStrictEqual({
        validatedArguments: ['a', undefined, undefined],
      })
      expect(shieldApply(telefunction, ['a'])).toStrictEqual({ validatedArguments: ['a'] })
      expect(shieldApply(telefunction, ['a', false]).error?.message).toBe(
        '[root] > [tuple: element 1] is of wrong type',
      )
    }

    {
      const telefunction = (...[]: any) => {}
      shield(telefunction, [t.string, t.nullable(t.number)])
      expect(shieldApply(telefunction, ['a', 1])).toStrictEqual({ validatedArguments: ['a', 1] })
      expect(shieldApply(telefunction, ['a', null])).toStrictEqual({ validatedArguments: ['a', null] })
      expect(shieldApply(telefunction, ['a', null, undefined])).toStrictEqual({
        validatedArguments: ['a', null, undefined],
      })
      expect(shieldApply(telefunction, ['a', undefined]).error?.message).toBe(
        '[root] > [tuple: element 1] is of wrong type',
      )
      expect(shieldApply(telefunction, ['a']).error?.message).toBe('[root] > [tuple: element 1] is of wrong type')
    }

    {
      const telefunction = (...[]: any) => {}
      shield(telefunction, [t.or(t.string, t.number)])
      expect(shieldApply(telefunction, ['a'])).toStrictEqual({ validatedArguments: ['a'] })
      expect(shieldApply(telefunction, [1])).toStrictEqual({ validatedArguments: [1] })
      expect(shieldApply(telefunction, [1, 1]).error?.message).toBe(
        '[root] > [tuple: element 1] is `1` but should be `undefined`.',
      )
    }

    {
      const telefunction = (...[]: [{ a: [string, number] }]) => {}
      shield(telefunction, [{ a: t.tuple(t.string, t.number) }])
      expect(shieldApply(telefunction, [{ a: ['', 0] }])).toStrictEqual({ validatedArguments: [{ a: ['', 0] }] })
      expect(shieldApply(telefunction, [{}]).error?.message).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] is `undefined` but should be `tuple`.',
      )
    }

    {
      const telefunction = shield([t.object(t.number)], (_a) => {})
      expect(shieldApply(telefunction, [{ k: 'some string' }]).error?.message).toBe(
        '[root] > [tuple: element 0] > [object: value of key `k`] is `string` but should be `number`.',
      )
    }
    {
      const telefunction = shield([{ a: { b: { c: t.const(42) } } }], (_a) => {})
      expect(shieldApply(telefunction, [{ a: { b: { c: 'some string' } } }]).error?.message).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] > [object: value of key `b`] > [object: value of key `c`] is `some string` but should be `42`.',
      )
    }
    {
      const telefunction = shield([{ a: { b: { c: t.const(42) } } }], (_a) => {})
      expect(shieldApply(telefunction, [{ a: { b: { d: 42 } } }]).error?.message).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] > [object: value of key `b`] > [object: value of key `c`] is `undefined` but should be `42`.',
      )
    }
    {
      const telefunction = shield([{ a: { b: { c: t.const(42) } } }], (_a) => {})
      expect(shieldApply(telefunction, [{ a: { b: { c: 42, d: 42 } } }]).error?.message).toBe(
        '[root] > [tuple: element 0] > [object: value of key `a`] > [object: value of key `b`] > [object: value of key `d`] is `42` but should be `undefined`.',
      )
    }

    {
      const schema: [StandardSchemaV1<unknown, string>, StandardSchemaV1<unknown, number | undefined>] = [
        {
          ['~standard']: {
            version: 1 as const,
            vendor: 'mock',
            validate: (value, options) => {
              if (typeof value === 'string') {
                return { value } as const
              }

              return { issues: [{ message: 'value must be a string' }] }
            },
          },
        },
        {
          ['~standard']: {
            version: 1 as const,
            vendor: 'mock',
            validate: (value, options) => {
              if (value === undefined || typeof value === 'number') {
                return { value } as const
              }

              return { issues: [{ message: 'value must be a number' }] }
            },
          },
        },
      ]

      const telefunction = (str: string, num?: number) => {}
      shield(telefunction, schema)
      expect(shieldApply(telefunction, ['a', 1])).toStrictEqual({ validatedArguments: ['a', 1] })
      expect(shieldApply(telefunction, ['a', 'false']).error?.message).toBe('[root] value must be a number')
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
    ;[
      [{ a: 1 }, 'b', [22, 33]],
      [{ a: 0 }, null, []],
      [{ a: -Infinity }, { b: 42, arr: [1, undefined, true] }, [22, 33, 44]],
      [{ a: 0 }, ''],
    ].forEach((args) => {
      expect(shieldApply(myTelefunction, args)).toStrictEqual({ validatedArguments: args })
    })

    expect(shieldApply(myTelefunction, [{ a: 1 }, 'b', [22, 33]])).toStrictEqual({
      validatedArguments: [{ a: 1 }, 'b', [22, 33]],
    })
    expect(shieldApply(myTelefunction, [{ a: '' }]).error?.message).toBe(
      '[root] > [tuple: element 0] > [object: value of key `a`] is `string` but should be `number`.',
    )
    expect(shieldApply(myTelefunction, [{ a: 0 }]).error?.message).toBe('[root] > [tuple: element 1] is of wrong type')
    expect(shieldApply(myTelefunction, []).error?.message).toBe(
      '[root] > [tuple: element 0] is `undefined` but should be `object`.',
    )
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
    testTypescriptFull()
  }
})
