type Expect<T extends true> = T

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type EqualsAnyOf<T, L extends any[]> = L extends [infer Head, ...infer Tail]
  ? Equals<T, Head> extends true
    ? true
    : EqualsAnyOf<T, Tail>
  : false

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

type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${ReplaceAll<After, From, To>}`
  : S

type Literal<T, Acc extends any[]> = T extends string
  ? ShieldRes<`t.const('${ReplaceAll<T, "'", "\\'">}')`, Acc>
  : T extends boolean
  ? ShieldRes<`t.const(${T})`, Acc>
  : T extends number
  ? ShieldRes<`t.const(${T})`, Acc>
  : false

type Joined<T extends any[], Acc extends any[], List = ShieldList<T>, J = JoinShieldResList<List>> = J extends string
  ? ShieldRes<J, Acc>
  : never

type ArrayLike<T extends any[], Acc extends any[] = []> = T extends [...infer U]
  ? Equals<U['length'], number> extends true
    ? T extends (infer V)[]
      ? Shield<V, ['array', ...Acc]>
      : never
    : ShieldList<U> extends ShieldRes<any, any>[]
    ? Joined<U, ['tuple', ...Acc]>
    : never
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
  ? Equals<K, string> extends true
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

type ShieldUnion<T, Acc extends any[]> = ShieldList<UnionToTuple<T>> extends ShieldRes<any, any>[]
  ? Joined<UnionToTuple<T>, ['union', ...Acc]>
  : never

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
  ? `t.or(${T})`
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

type JoinShieldResList<T, Acc extends string = ''> = T extends [infer Head, ...infer Tail]
  ? Head extends ShieldRes<any, any>
    ? Tail extends ShieldRes<any, any>[]
      ? JoinShieldResList<Tail, `${Acc}${Sep<Acc>}${WrapShieldRes<Head>}`>
      : Acc
    : Acc
  : Acc

type ShieldList<T extends any[]> = Head<T> extends never ? [] : [Shield<Head<T>>, ...ShieldList<Tail<T>>]

type JoinStrings<T extends any[], Acc extends string = ''> = T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? JoinStrings<Tail, `${Acc}${Sep<Acc>}${Head}`>
    : Acc
  : Acc

type ShieldStr<T, Res = Shield<T>> = Res extends ShieldRes<any, any> ? WrapShieldRes<Res> : never

export type Tail<L extends any[]> = L extends readonly [] ? [] : L extends readonly [any?, ...infer LTail] ? LTail : []

export type Head<L extends any[]> = L['length'] extends 0 ? never : L[0]

type ShieldStrMap<T extends any[]> = Head<T> extends never ? [] : [ShieldStr<Head<T>>, ...ShieldStrMap<Tail<T>>]

export type ShieldArrStr<T extends any[], M = ShieldStrMap<T>> = M extends any[] ? `[${JoinStrings<M>}]` : never

type _cases = [
  Expect<Equals<ShieldStr<string>, 't.string'>>,
  Expect<Equals<ShieldStr<number>, 't.number'>>,
  Expect<Equals<ShieldStr<boolean>, 't.boolean'>>,
  Expect<Equals<ShieldStr<Date>, 't.date'>>,
  Expect<Equals<ShieldStr<any>, 't.any'>>,
  Expect<Equals<ShieldStr<string | null>, 't.nullable(t.string)'>>,
  Expect<Equals<ShieldStr<string | undefined>, 't.optional(t.string)'>>,
  Expect<Equals<ShieldStr<number | null | undefined>, 't.optional(t.nullable(t.number))'>>,
  Expect<Equals<ShieldStr<1 | null>, 't.nullable(t.const(1))'>>,
  Expect<Equals<ShieldStr<1 | undefined>, 't.optional(t.const(1))'>>,
  Expect<Equals<ShieldStr<[number, boolean]>, 't.tuple(t.number, t.boolean)'>>,
  Expect<
    EqualsAnyOf<
      ShieldStr<[number?, boolean?]>,
      ['t.tuple(t.optional(t.number), t.optional(t.boolean))', 't.tuple(t.optional(t.boolean), t.optional(t.number))']
    >
  >,
  Expect<
    EqualsAnyOf<
      ShieldStr<'one' | 'two'>,
      ["t.or(t.const('two'), t.const('one'))", "t.or(t.const('one'), t.const('two'))"]
    >
  >,
  Expect<
    EqualsAnyOf<
      ShieldStr<1 | 2 | undefined>,
      ['t.optional(t.or(t.const(2), t.const(1)))', 't.optional(t.or(t.const(1), t.const(2)))']
    >
  >,
  Expect<EqualsAnyOf<ShieldStr<number | string>, ['t.or(t.number, t.string)', 't.or(t.string, t.number)']>>,
  Expect<Equals<ShieldStr<number[]>, 't.array(t.number)'>>,
  Expect<Equals<ShieldStr<[number, string][]>, 't.array(t.tuple(t.number, t.string))'>>,
  Expect<Equals<ShieldStr<{ age: number; hasBike: boolean }>, '{ hasBike: t.boolean, age: t.number }'>>,
  Expect<Equals<ShieldStr<{ age: number; hasBike?: boolean }>, '{ hasBike: t.optional(t.boolean), age: t.number }'>>,
  Expect<Equals<ShieldStr<'test'>, "t.const('test')">>,
  Expect<Equals<ShieldStr<"'test'">, "t.const('\\'test\\'')">>,
  Expect<Equals<ShieldStr<true>, 't.const(true)'>>,
  Expect<Equals<ShieldStr<false>, 't.const(false)'>>,
  Expect<Equals<ShieldStr<123>, 't.const(123)'>>,
  Expect<Equals<ShieldStr<{ isGood: boolean } | string>, 't.or({ isGood: t.boolean }, t.string)'>>,
  Expect<Equals<ShieldStr<{ age: number }[]>, 't.array({ age: t.number })'>>,
  Expect<Equals<ShieldStr<Record<string, number>>, 't.object(t.number)'>>,
  Expect<Equals<ShieldStr<Record<string, { age?: number }>>, 't.object({ age: t.optional(t.number) })'>>,
  Expect<Equals<ShieldStr<Record<string, number>[]>, 't.array(t.object(t.number))'>>,
  Expect<Equals<ShieldArrStr<[string, number]>, '[t.string, t.number]'>>,
  Expect<Equals<ShieldArrStr<[number?]>, '[t.optional(t.number)]'>>,
  Expect<Equals<ShieldArrStr<[string, number?, string?]>, '[t.string, t.optional(t.number), t.optional(t.string)]'>>
]
