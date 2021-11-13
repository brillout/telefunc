import { assert, assertUsage, cast, hasProp, objectAssign } from './utils'

export { p }

type Primitive = number | string | boolean | Date | null | undefined | RegExp
// type Collection = Primitive | Collection[] | { [key: string]: Collection };

const p = <Params extends number extends Params['length'] ? [] : unknown[]>(
  params: Params,
  telefunction: (...params: Params) => unknown,
) => {
  const telefunctionWrapper = (...args: unknown[]) => {
    args.forEach((arg, i) => {
      const paramType = params[i]
      //verifyType(arg, paramType)
    })
    return telefunction
  }

  telefunctionWrapper._isTelefunctionWrapper = true

  return telefunctionWrapper
}

type JS_TO_TS = {
  'string': string
  'number': number
  'date': Date
}

type UnwrapType<T> = T extends { _type: keyof JS_TO_TS }
  // `p` types
  ? JS_TO_TS[T['_type']]
  // `p.value()`
  : T extends PValue
  ? T['_value']
  // `p.or()`
  : T extends POr
  ? (UnwrapType<T['_typeLeft']> | UnwrapType<T['_typeRight']>)
  // Object
  : T extends object
  ? { [K in keyof T]: UnwrapType<T[K]> }
  // Tuple
  : T extends unknown[]
  ? (number extends T['length'] ? [] : ({ [K in keyof T]: UnwrapType<T[K]> }))
  // That's it
  : never

type Tupli<T extends unknown[]> = number extends T['length'] ? [] : T

type Tuple<T> = _TupleOf<T, []>
type _TupleOf<T, R extends unknown[]> = R | (R['length'] extends 10 ? R : _TupleOf<T, [T, ...R]>);


type Tupi<T extends unknown[] = []> = T | { next: Tupi<[unknown, ...T]> }

  type LinkedList<Type> = Type | { next: LinkedList<Type> };


//interface Tup<T extends unknown[]> extends (number extends T['length'] ? [] : T) {}

type PPrimitive = { _type: 'string' | 'number' | 'date' | 'bigint' | 'boolean'}
type PTuple = {
  _type: 'tuple',
  _tupleElements: P[]
}

type PObject = {
  [prop: string]: P
}

type P =
  PPrimitive |
  POr |
  PValue |
  PArray |
  PTuple |
  PObject

type Value = Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null
type PValue = {
  _type: 'value',
  _value: Value
}
const pValue = <Val extends Value>(value: Val) => ({
  _type: 'value' as const,
  _value: value
})

type POr ={
  _type: 'or',
  _typeLeft: P,
  _typeRight: P
}
const pOr = <P1 extends P, P2 extends P>(p1: P1, p2: P2) => ({
  _type: 'or' as const,
  _typeLeft: p1,
  _typeRight: p2
})


type PArray = {
  _type: 'array',
  _arrayType: P
}



//const p = <Params extends number extends Params['length'] ? [] : unknown[]>(
//const tt = <T extends unknown[]>(
//const tt = <T extends number extends T['length'] ? [] : unknown[]>(
//const tt = <T extends number extends T['length'] ? [] : P[]>(
const tt = <T extends number extends T['length'] ? [] : P[]>(
  params: T,
  telefunction: (...params: UnwrapType<T>) => unknown,
) => {
  const telefunctionWrapper = (...args: unknown[]) => {
    args.forEach((arg, i) => {
      const paramType = params[i]
      //verifyType(arg, paramType)
    })
    return telefunction
  }

  telefunctionWrapper._isTelefunctionWrapper = true

  return telefunctionWrapper
}

objectAssign(tt, {
  or: pOr,
  value: pValue,
  number: {
    _type: 'number' as const,
  },
  string: {
    _type: 'string' as const,
  }
})

const p3 = {a2: tt.or(tt.value(null), tt.value(undefined))}
p3.a2._typeLeft._value
tt([tt.or(tt.value(null), tt.value(undefined))], (a) => {})
tt([tt.number, {a1: tt.string}, {a2: tt.or(tt.value(null), tt.value(undefined))}], (a, {a1}, {a2}: {a2: null | undefined}) => {})

const args = {
  a1: {
    n: tt.number,
  },
}

type Args = typeof args
type TypeWrapper = {
  a: {
    _type: 'string'
  }
}

//const p = <Params extends number extends Params['length'] ? [] : unknown[]>(
/*
type UnwrapType<T> = T extends { _type: keyof JS_TO_TS }
  // `p` types
  ? never
  : never
*/
///*
//*/

type Str = UnwrapType<Args>

const primitives = ['string', 'number', 'date'] as const
type ParamPrimitive = typeof primitives[number]

type ParamType =
  | {
      _type: ParamPrimitive
    }
  | {
      _type: 'array'
      _arrayType: ParamType
    }
  | {
      _type: 'object'
      _subType: ParamType
    }

function verifyType(arg: unknown, param: ParamType) {
  const getType = (thing: unknown) => {
    const isObject = (thing: unknown) => typeof thing === 'object' && thing !== null && thing.constructor === Object
    const isTuple = (thing: unknown) => typeof thing === 'object' && thing !== null && thing.constructor === Array
    if (isObject(thing)) {
      return 'object'
    }
    if (isTuple(thing)) {
      return 'tuple'
    }
    assert(hasProp(thing, '_type', 'string'))
    const type = thing._type
    assertTuple(type, primitives)
    return type
  }
  const paramType = getType(param)
  const argType = getType(arg)
  if (paramType !== argType) {
    throw Abort()
  }
  const type = paramType
  // TODO: recurse
  if (type === 'object') {
    //Object.keys()
  }
}

function assertTuple<Tuple extends readonly string[]>(thing: unknown, tuple: Tuple): asserts thing is Tuple[number] {
  assert(typeof thing === 'string')
  assert(tuple.includes(thing))
}

function Abort() {
  return new Error('TODO')
}

objectAssign(p, {
  number: {
    _type: 'number',
  } as any as number,
  string: 'a',
  boolean: true as boolean,
  bigint: 1 as any as BigInt,
  date: new Date(0),
  array,
  or,
  value,
})

function array<T extends Primitive>(type: T): T[] {
  const unwrap: unknown = type
  assertUsage(hasProp(unwrap, 'type', 'string') && unwrap.type, 'TODO')
  const _arrayType = unwrap.type
  return {
    _type: 'array',
    _arrayType,
  } as any as T[]
}

function or<Params extends unknown[]>(...args: Params): Params[number] {
  return args[1]
}

function value<T extends Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null>(a: T): T {
  return a
}

const firstArg = { a1: 3, a2: p.value(null), a3: p.or(p.value(1), p.value(2)) }
type FirstArg = typeof firstArg

const tel = p([firstArg, p.string, [p.date, p.string]], async ({ a1, a2, a3 }, bl, d?) => {
  console.log(a2)
})

tel({ a1: 4, a2: null, a3: 2 }, 'euh')
