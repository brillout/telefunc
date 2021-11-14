import {objectAssign} from "./utils"

export { s }

type Unwrap<T extends readonly TSchema[]> = { [K in keyof T]: Static<T[K]> }
type Arr<T> = T extends unknown[] ? T : never

const str = [ttString(), ttString()]

let str2: Unwrap<typeof str>


const s = <T extends number extends T['length'] ? [] : TSchema[]>(params: T, telefunction: (...args: Arr<Unwrap<T>>) => unknown) => {
}
const s2 = <T extends TTuple<any>>(params: T, telefunction: (...args: Arr<Static<T>>) => unknown) => {
}

objectAssign(s, {
  string: ttString(),
  number: ttNumber()
})

s([{a: s.number}, s.string], (n, n2) => {})

export const BoxKind         = Symbol('BoxKind')
export const KeyOfKind       = Symbol('KeyOfKind')
export const IntersectKind   = Symbol('IntersectKind')
export const UnionKind       = Symbol('UnionKind')
export const TupleKind       = Symbol('TupleKind')
export const ObjectKind      = Symbol('ObjectKind')
export const RecordKind      = Symbol('RecordKind')
export const ArrayKind       = Symbol('ArrayKind')
export const EnumKind        = Symbol('EnumKind')
export const LiteralKind     = Symbol('LiteralKind')
export const StringKind      = Symbol('StringKind')
export const NumberKind      = Symbol('NumberKind')
export const IntegerKind     = Symbol('IntegerKind')
export const BooleanKind     = Symbol('BooleanKind')
export const NullKind        = Symbol('NullKind')
export const UnknownKind     = Symbol('UnknownKind')
export const AnyKind         = Symbol('AnyKind')

export type TEnumType          = Record<string, string | number>
export type TKey               = string | number
export type TValue             = string | number | boolean
export type TEnumKey<T = TKey> = { type: 'number' | 'string', const: T }

type TTuple     <T extends TSchema[]>                     = { kind: typeof TupleKind, type: 'array', items?: [...T]}
type TArray     <T extends TSchema>                       = { kind: typeof ArrayKind, type: 'array', items: T }
type TLiteral   <T extends TValue>                        = { kind: typeof LiteralKind, const: T }
type TEnum      <T extends TEnumKey[]>                    = { kind: typeof EnumKind, anyOf: T }
type TString                                              = { kind: typeof StringKind, type: 'string' }
type TNumber                                              = { kind: typeof NumberKind, type: 'number' }
type TInteger                                             = { kind: typeof IntegerKind, type: 'integer' }
type TBoolean                                             = { kind: typeof BooleanKind, type: 'boolean' }
type TNull                                                = { kind: typeof NullKind, type: 'null' }
type TUnknown                                             = { kind: typeof UnknownKind }
type TAny                                                 = { kind: typeof AnyKind }
type TSchema =
    | TTuple<any>
    | TArray<any>
    | TEnum<any>
    | TLiteral<any>
    | TString
    | TNumber
    | TInteger
    | TBoolean
    | TNull
    | TUnknown
    | TAny
    | object

export const UndefinedKind   = Symbol('UndefinedKind')
export const VoidKind        = Symbol('VoidKind')
export type TUndefined       = { kind: typeof UndefinedKind, type: 'undefined' }
export type TVoid            = { kind: typeof VoidKind, type: 'void' }

type StaticEnum        <T>                                               = T extends TEnumKey<infer U>[] ? U : never
type StaticUnion       <T extends readonly TSchema[]>                    = { [K in keyof T]: Static<T[K]> }[number]
type StaticTuple       <T extends readonly TSchema[]>                    = { [K in keyof T]: Static<T[K]> }
type StaticArray       <T extends TSchema>                               = Array<Static<T>>
type StaticLiteral     <T extends TValue>                                = T
type StaticConstructor <T extends readonly TSchema[], U extends TSchema> = new (...args: [...{ [K in keyof T]: Static<T[K]> }]) => Static<U>
type StaticFunction    <T extends readonly TSchema[], U extends TSchema> = (...args: [...{ [K in keyof T]: Static<T[K]> }]) => Static<U>
type StaticPromise     <T extends TSchema>                               = Promise<Static<T>>
type StaticObject      <T extends object>                                = { [K in keyof T] : Static<T[K]> }

export type Static<T> =
    T extends TTuple<infer U>                ? StaticTuple<U>          :
    T extends TArray<infer U>                ? StaticArray<U>          :
    T extends TEnum<infer U>                 ? StaticEnum<U>           :
    T extends TLiteral<infer U>              ? StaticLiteral<U>        :
    T extends TString                        ? string                  :
    T extends TNumber                        ? number                  :
    T extends TInteger                       ? number                  :
    T extends TBoolean                       ? boolean                 :
    T extends TNull                          ? null                    :
    T extends TUnknown                       ? unknown                 :
    T extends TAny                           ? any                     :
    T extends TUndefined                     ? undefined               :
    T extends TVoid                          ? void                    :
    T extends object                         ? StaticObject<T>         :
    never


    function ttString(): TString {
        return {  kind: StringKind, type: 'string' }
    }
    function ttNumber(): TNumber {
        return {  kind: NumberKind, type: 'number' }
    }


