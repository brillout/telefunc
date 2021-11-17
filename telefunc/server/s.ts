import { assert, assertUsage, hasProp, objectAssign } from './utils'

export { s }

const s = <T extends unknown[], T2 extends [...T]>(params: T2, telefunction: (...args: T2) => unknown) => {
  //const s = <T extends unknown[]>(params: [...T], telefunction: (...args: [...T]) => unknown) => {
  return telefunction
}

function verifyOuter(params: unknown, args: unknown) {
  assertUsage(Array.isArray(params), 'TODO')
  assert(Array.isArray(args))
  params.forEach((param, key: number) => {
    verifyRecursive(param, args[key])
  })
}

function verifyRecursive(param: unknown, arg: unknown) {
  assertParam(param)
  if( param._type=== tString) {
    return typeof arg === 'string'
  }
}

function assertParam(param: unknown): asserts param is Param {
  assertUsage(hasProp(param, '_type'), 'TODO')
  const t = param._type
  assertUsage(isIncluded(t, tTypes), "TODO")
}

function isIncluded<T extends unknown[] | readonly unknown[]>(item: unknown, list: T): item is T[number]  {
  return list.includes(item)
}

/*
type Param = {
  _type: (
  |  typeof tString 
  |  typeof tNumber
  |  typeof tOr 
  |  typeof tTuple 
  |  typeof tValue
  |  typeof tArray 
  )
}
*/

type Param = {
  _type: TTypes
}

//type P = { [K in (typof types)])[number]
type TTypes = (typeof tTypes)[number]


const tString = Symbol('tString')
const tNumber = Symbol('tNumber')
const tOr = Symbol('tOr')
const tTuple = Symbol('tTuple')
const tValue = Symbol('tValue')
const tArray = Symbol('tArray')

const tTypes = [
     tString 
  ,  tNumber
  ,  tOr 
  ,  tTuple 
  ,  tValue
  ,  tArray 
] as const

const _string = {
  _type: tString,
} as any as string

const _number = {
  _type: tNumber,
} as any as number

const _or = <T extends unknown[]>(...elements: T): T[number] => {
  return {
    _type: tOr,
    _elements: elements,
  } as any
}

const _value = <T extends Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null>(param: T): T => {
  return {
    _type: tValue,
    _val: param
  } as any
}

const _tuple = <T extends unknown[]>(elements: [...T]): T => {
  return {
    _type: tTuple,
    _elements: elements
  } as any
}

const _optional = <T>(param: T): T | undefined => _or(param, _value(undefined))
const _nullable = <T>(param: T): T | null => _or(param, _value(null))
const _array = <T>(param: T): T[] => {
  return {
    _type: tArray,
    _arrayType: param
  } as any
}

objectAssign(s, {
  string: _string,
  number: _number,
  or: _or,
  tuple: _tuple,
  value: _value,
  optional: _optional,
  nullable: _nullable,
  array: _array,
  true: _value(true),
  false: _value(false),
  null: _value(null),
  undefined: _value(undefined),
})

const telefunction = s(
  [
    { a: s.number },
    s.or(s.string, s.number, s.null, {
      b: s.number,
      arr: s.tuple([s.number, s.undefined, s.or(s.value(1), s.value(true))]),
    }),
    s.array(s.number),
  ],
  (n1, n2, n3) => {},
)

telefunction({ a: 1 }, { b: 2, arr: [1, undefined, true] }, [2, 3, 5])

type Fn<T> = (...args: [number, string]) => T

/*
const fn2: Fn = (n, str) => 1

function fn(n, str) {
  return 1
}
*/
