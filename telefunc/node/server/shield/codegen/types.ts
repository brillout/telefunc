type Expect<T extends true> = T

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type EqualToAnyOf<T, L extends any[]> = L extends [infer Head, ...infer Tail]
  ? Equal<T, Head> extends true
    ? true
    : EqualToAnyOf<T, Tail>
  : false

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type UnionToIntersection<T> = (T extends T ? (params: T) => any : never) extends (params: infer P) => any ? P : never

type UnionToTuple<T, Res extends any[] = []> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? UnionToTuple<Exclude<T, ReturnType>, [...Res, ReturnType]>
  : Res

type ShieldRes<S extends string, Acc extends string[] = []> = {
  str: S
  acc: Acc
}

type SimpleType<T, Acc extends any[] = []> = Equals<T, string> extends true
  ? ShieldRes<'t.string', Acc>
  : Equals<T, number> extends true
  ? ShieldRes<'t.number', Acc>
  : Equals<T, boolean> extends true
  ? ShieldRes<'t.boolean', Acc>
  : Equals<T, Date> extends true
  ? ShieldRes<'t.date', Acc>
  : Equals<T, any> extends true
  ? ShieldRes<'t.any', Acc>
  : false

type Literal<T, Acc extends any[]> = T extends string
  ? ShieldRes<`t.const('${T}')`, Acc>
  : T extends boolean
  ? ShieldRes<`t.const(${T})`, Acc>
  : T extends number
  ? ShieldRes<`t.const(${T})`, Acc>
  : false

type ArrayLike<T extends any[], Acc extends any[] = []> = T extends [...infer U]
  ? Equal<U['length'], number> extends true
    ? T extends (infer V)[]
      ? Shield<V, ['array', ...Acc]>
      : never
    : ShieldRes<JoinShieldResList<ShieldList<U>>, ['tuple', ...Acc]>
  : never

type JoinRecord<T extends Record<string, ShieldRes<any, any>>, Acc extends any[]> = ShieldRes<
  JoinStrings<
    UnionToTuple<
      {
        [K in Extract<keyof T, string>]: `${K}: ${WrapShieldRes<T[K]>}`
      }[Extract<keyof T, string>]
    >
  >,
  ['{}', ...Acc]
>

type ShieldRecord<T extends Record<string, any>> = {
  [K in Extract<keyof T, string> as K]: Shield<T[K]>
}

type KeyValueShieldRes<T extends Record<string, any>, Acc extends any[]> = ShieldRecord<T> extends Record<any, any>
  ? JoinRecord<ShieldRecord<T>, Acc>
  : never

type KeyValueOrObjectShield<T extends Record<string, any>, Acc extends any[]> = T extends Record<infer K, infer V>
  ? Equal<K, string> extends true
    ? Shield<V, ['object', ...Acc]>
    : KeyValueShieldRes<T, Acc>
  : KeyValueShieldRes<T, Acc>

type Shield<T, Acc extends any[] = []> = SimpleType<T> extends ShieldRes<any>
  ? SimpleType<T, Acc>
  : undefined extends T
  ? Shield<Exclude<T, undefined>, ['optional', ...Acc]>
  : null extends T
  ? Shield<Exclude<T, null>, ['nullable', ...Acc]>
  : IsUnion<T> extends true
  ? ShieldUnion<T, Acc>
  : T extends any[]
  ? ArrayLike<T, Acc>
  : T extends Record<any, any>
  ? KeyValueOrObjectShield<T, Acc>
  : [Literal<T, Acc>] extends [ShieldRes<any, any>]
  ? Literal<T, Acc>
  : never

type ShieldUnion<
  T,
  Acc extends any[],
  Res = UnionToTuple<T extends any ? Shield<T> : never>,
> = Res extends ShieldRes<any, any>[] ? ShieldRes<JoinShieldResList<Res>, ['union', ...Acc]> : never

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

type Wrap<T extends string, Keyword> = Keyword extends 'nullable'
  ? `t.nullable(${T})`
  : Keyword extends 'optional'
  ? `t.optional(${T})`
  : Keyword extends 'tuple'
  ? `t.tuple(${T})`
  : Keyword extends 'array'
  ? `t.array(${T})`
  : Keyword extends '{}'
  ? `{ ${T} }`
  : Keyword extends 'union'
  ? `t.union(${T})`
  : Keyword extends 'object'
  ? `t.object(${T})`
  : T

type WrapShieldRes<T extends ShieldRes<any, any>> = T extends ShieldRes<infer S, infer Acc>
  ? Acc extends [infer Head, ...infer Tail]
    ? Tail extends any[]
      ? WrapShieldRes<ShieldRes<Wrap<S, Head>, Tail>>
      : never
    : S
  : never

type Sep<T> = T extends '' ? '' : ', '

type JoinShieldResList<T extends ShieldRes<any, any>[], Acc extends string = ''> = T extends [infer Head, ...infer Tail]
  ? Head extends ShieldRes<any, any>
    ? Tail extends ShieldRes<any, any>[]
      ? JoinShieldResList<Tail, `${Acc}${Sep<Acc>}${WrapShieldRes<Head>}`>
      : Acc
    : Acc
  : Acc

type ShieldList<T extends any[], Acc extends ShieldRes<any, any>[] = []> = T extends [infer Head, ...infer Tail]
  ? [Shield<Head>, ...ShieldList<Tail>]
  : Acc

type JoinStrings<T extends any[], Acc extends string = ''> = T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? JoinStrings<Tail, `${Acc}${Sep<Acc>}${Head}`>
    : Acc
  : Acc

type ShieldStr<T, Res = Shield<T>> = Res extends ShieldRes<any, any> ? WrapShieldRes<Res> : never

type ShieldStrMap<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [ShieldStr<Head>, ...ShieldStrMap<Tail>]
  : []

export type ShieldArrStr<T extends any[]> = `[${JoinStrings<ShieldStrMap<T>>}]`

type _cases = [
  Expect<Equal<ShieldStr<string>, 't.string'>>,
  Expect<Equal<ShieldStr<number>, 't.number'>>,
  Expect<Equal<ShieldStr<boolean>, 't.boolean'>>,
  Expect<Equal<ShieldStr<Date>, 't.date'>>,
  Expect<Equal<ShieldStr<any>, 't.any'>>,
  Expect<Equal<ShieldStr<string | null>, 't.nullable(t.string)'>>,
  Expect<Equal<ShieldStr<string | undefined>, 't.optional(t.string)'>>,
  Expect<Equal<ShieldStr<number | null | undefined>, 't.optional(t.nullable(t.number))'>>,
  Expect<Equal<ShieldStr<1 | null>, 't.nullable(t.const(1))'>>,
  Expect<Equal<ShieldStr<1 | undefined>, 't.optional(t.const(1))'>>,
  Expect<Equal<ShieldStr<[number, boolean]>, 't.tuple(t.number, t.boolean)'>>,
  Expect<
    EqualToAnyOf<
      ShieldStr<'one' | 'two'>,
      ["t.union(t.const('two'), t.const('one'))", "t.union(t.const('one'), t.const('two'))"]
    >
  >,
  Expect<
    EqualToAnyOf<
    ShieldStr<1 | 2 | undefined>,
      ["t.optional(t.union(t.const(2), t.const(1)))", "t.optional(t.union(t.const(1), t.const(2)))"]
    >
  >,
  Expect<EqualToAnyOf<ShieldStr<number | string>, ['t.union(t.number, t.string)', 't.union(t.string, t.number)']>>,
  Expect<Equal<ShieldStr<number[]>, 't.array(t.number)'>>,
  Expect<Equal<ShieldStr<[number, string][]>, 't.array(t.tuple(t.number, t.string))'>>,
  Expect<Equal<ShieldStr<{ age: number; hasBike: boolean }>, '{ hasBike: t.boolean, age: t.number }'>>,
  Expect<Equal<ShieldStr<{ age: number; hasBike?: boolean }>, '{ hasBike: t.optional(t.boolean), age: t.number }'>>,
  Expect<Equal<ShieldStr<'test'>, "t.const('test')">>,
  Expect<Equal<ShieldStr<true>, 't.const(true)'>>,
  Expect<Equal<ShieldStr<false>, 't.const(false)'>>,
  Expect<Equal<ShieldStr<123>, 't.const(123)'>>,
  Expect<Equal<ShieldStr<{ isGood: boolean } | string>, 't.union({ isGood: t.boolean }, t.string)'>>,
  Expect<Equal<ShieldStr<{ age: number }[]>, 't.array({ age: t.number })'>>,
  Expect<Equal<ShieldStr<Record<string, number>>, 't.object(t.number)'>>,
  Expect<Equal<ShieldStr<Record<string, { age?: number }>>, 't.object({ age: t.optional(t.number) })'>>,
  Expect<Equal<ShieldStr<Record<string, number>[]>, 't.array(t.object(t.number))'>>,
  Expect<Equal<ShieldArrStr<[string, number]>, '[t.string, t.number]'>>
]
