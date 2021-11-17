import { assert, assertUsage } from './utils'

export { shield }
export { shieldIsMissing }
export { shieldApply }

type ShieldFunction = <T extends unknown[], T2 extends [...T]>(
  telefunction: (...args: T2) => unknown,
  telefunctionParameters: T2,
) => unknown
type ShieldType = typeof type

const shieldKey = Symbol('shieldKey')

const shield = <ShieldFunction & { type: ShieldType }>function (telefunction, telefunctionShield) {
  ;(telefunction as any as Record<any, unknown>)[shieldKey as any] = telefunctionShield
}
type Telefunction = Function
function shieldIsMissing(telefunction: Telefunction): boolean {
  const telefunctionShield = getTelefunctionShield(telefunction)
  return telefunctionShield === null
}
function shieldApply(telefunction: Telefunction, args: unknown[]): boolean {
  const telefunctionShield = getTelefunctionShield(telefunction)
  assert(telefunctionShield !== null)
  verifyOuter(telefunctionShield, args)
  return true
}

function getTelefunctionShield(telefunction: Telefunction) {
  return (telefunction as any)[shieldKey] || null
}

function verifyOuter(params: unknown, args: unknown) {
  assertUsage(Array.isArray(params), 'TODO')
  assert(Array.isArray(args))
  params.forEach((param, key) => {
    verifyRecursive(param, args[key])
  })
}
function verifyRecursive(param: unknown, arg: unknown) {
  assertIsShield(param)
  const bool = param(arg)
  assert([true, false].includes(bool))
  return bool
}

function assertIsShield(param: unknown): asserts param is Param {
  assertUsage((param as any)[isShield] === true, 'TODO')
  assert(isCallable(param))
  /*
  assertUsage(hasProp(param, '_type'), 'TODO')
  const t = param._type
  assertUsage(isIncluded(t, tTypes), 'TODO')
  */
}

/*
function isIncluded<T extends unknown[] | readonly unknown[]>(item: unknown, list: T): item is T[number] {
  return list.includes(item)
}
*/

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

type Param = (input: unknown) => boolean

//type P = { [K in (typof types)])[number]
/*
type TTypes = typeof tTypes[number]

const tString = Symbol('tString')
const tNumber = Symbol('tNumber')
const tOr = Symbol('tOr')
const tTuple = Symbol('tTuple')
const tValue = Symbol('tValue')
const tArray = Symbol('tArray')
const tObject = Symbol('tObject')

const tTypes: readonly Param[] = [tString, tNumber, tOr, tTuple, tValue, tArray, tObject] as const

const _string = {
  verifier: (input: unknown) => typeof input === 'string',
  typeCloak: null as any as string,
}

const _number = {
  verifier: (input: unknown) => typeof input === 'number',
  typeCloak: null as any as number,
}

const spec = [
  {
    typeName: 'string',
    typeCloak: null as any as string,
    verifier: () => {}
  },
  {
    typeName: 'number',
    typeCloak: null as any as number,
    verifier: () => {}
  },
] as const

const specT = spec.map(s => {
  const { typeName, typeCloak, verifier } = s
  return [typeName, verifier as any as typeof typeCloak]
})
const oo = objectFromEntries(specT)
*/

const type = (() => {
  const or = <T extends unknown[]>(...elements: T): T[number] => {
    return ((input: unknown) => elements.some((el) => verifyRecursive(el, input))) as any
  }
  const tuple = <T extends unknown[]>(elements: [...T]): T => {
    return ((input: unknown) =>
      Array.isArray(input) && input.every((_, i) => verifyRecursive(elements[i], input[i]))) as any
  }
  const array = <T>(arrayType: T): T[] => {
    return ((input: unknown) =>
      Array.isArray(input) && input.every((_, i) => verifyRecursive(arrayType, input[i]))) as any
  }
  const value = <T extends Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null>(val: T): T => {
    return ((input: unknown) => input === val) as any
  }

  return {
    string: ((input: unknown) => typeof input === 'string') as any as string,
    number: ((input: unknown) => typeof input === 'number') as any as number,
    or,
    tuple,
    array,
    value,
    true: value(true),
    false: value(false),
    null: value(null),
    undefined: value(undefined),
    optional: <T>(param: T): T | undefined => or(param, value(undefined)),
    nullable: <T>(param: T): T | null => or(param, value(null)),
  }
})()

const isShield = Symbol('isShield')
Object.values(type).forEach((t: any) => {
  assert(isCallable(t))
  t[isShield] = true
})

/*
const _or = <T extends unknown[]>(...elements: T): T[number] => {
  return {
    _type: tOr,
    verifier: (input: unknown) => elements.some((el) => verifyRecursive(el, input)),
  } as any
}

const _value = <T extends Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null>(val: T): T => {
  return {
    _type: tValue,
    verifier: (input: unknown) => input === val,
  } as any
}

const _tuple = <T extends unknown[]>(elements: [...T]): T => {
  return {
    _type: tTuple,
    verifier: (input: unknown) => Array.isArray(input) && input.every((_, i) => verifyRecursive(elements[i], input[i])),
  } as any
}

const _optional = <T>(param: T): T | undefined => _or(param, _value(undefined))
const _nullable = <T>(param: T): T | null => _or(param, _value(null))
const _array = <T>(arrayType: T): T[] => {
  return {
    _type: tArray,
    _verifier: (input: unknown) => Array.isArray(input) && input.every((_, i) => verifyRecursive(arrayType, input[i])),
  } as any
}
const _object = <T>(param: T): T => param
/*
const _object = <T>(param: T): T => {
  return {
    _type: tObject,
    _verifier: (input: unknown) => isPlainObject(input)// TODO && input.every((_, i) => verifyRecursive(arrayType, input[i]))
  } as any
}
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && value.constructor === Object
}
*/

/*
const type = {
  string: _string,
  number: _number,
  or: _or,
  tuple: _tuple,
  value: _value,
  optional: _optional,
  nullable: _nullable,
  array: _array,
  object: _object,
  true: _value(true),
  false: _value(false),
  null: _value(null),
  undefined: _value(undefined),
}
*/
shield.type = type

/*
function objectFromEntries<P extends PropertyKey, A extends ReadonlyArray<readonly [P, any]>>(
  array: A,
): { [K in A[number][0]]: Extract<A[number], readonly [K, any]>[1] } {
  return Object.fromEntries(array) as any
}
*/

function isCallable<T extends Function>(thing: T | unknown): thing is T {
  return thing instanceof Function || typeof thing === 'function'
}
