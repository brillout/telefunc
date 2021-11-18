import { isPlainObject } from './utils/isPlainObject'
import { unique } from './utils/unique'
import { isCallable } from './utils/isCallable'
import { assert, assertUsage } from '../shared/utils/assert'

export { shield }
export { shieldIsMissing }
export { shieldApply }
export { shieldToHumandReadable }

type ShieldFunction = <T extends unknown[], T2 extends [...T]>(
  telefunction: (...args: T2) => unknown,
  telefunctionShield: T2,
) => void
type Type = typeof type

const _shield = Symbol('_shield')
const _isVerifier = Symbol('_isVerifier')
const _isVerifierTuple = Symbol('_isVerifierTuple')

const shield = <ShieldFunction & { type: Type }>function (telefunction, telefunctionShield) {
  ;(telefunction as any as Record<any, unknown>)[_shield as any] = telefunctionShield
}
type Telefunction = Function

function shieldIsMissing(telefunction: Telefunction): boolean {
  const telefunctionShield = getTelefunctionShield(telefunction)
  return telefunctionShield === null
}

function shieldApply(telefunction: Telefunction, args: unknown[]): true | string {
  const telefunctionShield = getTelefunctionShield(telefunction)
  assert(telefunctionShield !== null)
  return verifyOuter(telefunctionShield, args)
}

type TelefunctionShield = unknown[] | Verifier
function getTelefunctionShield(telefunction: Telefunction): TelefunctionShield | null {
  return (telefunction as any)[_shield] || null
}

function shieldToHumandReadable(telefunctionShield: TelefunctionShield): string {
  return StringBetter(telefunctionShield)
}
// Like `String()` but with support for objects and arrays
function StringBetter(thing: unknown): string {
  if (isPlainObject(thing)) {
    let str = ''
    const entries = Object.entries(thing)
    entries.forEach(([key, val], i) => {
      str += `${String(key)}:${StringBetter(val)}`
      const isLast = i === entries.length - 1
      if (!isLast) {
        str += ','
      }
    })
    str = `{${str}}`
    return str
  }
  if (Array.isArray(thing)) {
    return `[${thing.map((el) => StringBetter(el)).join(',')}]`
  }
  return String(thing)
}

function verifyOuter(verifier: unknown, args: unknown): true | string {
  assert(Array.isArray(args))
  if (Array.isArray(verifier)) {
    verifier = shield.type.tuple(verifier)
    assert(isVerifierTuple(verifier))
  }
  if (isVerifierTuple(verifier)) {
    return verifyRecursive(verifier, args, '[root]')
  }
  console.log(verifier)
  assertUsage(
    false,
    '[shield()] Second argument should be an array: e.g. `shield(telefunction, [shield.type.string])` instead of `shield(telefunction, shield.type.string)`.',
  )
}
function verifyRecursive(verifier: unknown, arg: unknown, breadcrumbs: string): true | string {
  assert(breadcrumbs.startsWith('[root]'))

  if (isVerifier(verifier)) {
    return verifier(arg, breadcrumbs)
  }

  if (isPlainObject(verifier)) {
    const obj = verifier
    return verifyObject(obj, arg, breadcrumbs)
  }

  const errorPrefix = `[shield()] Bad shield definition: ${breadcrumbs}`
  const errorSuffix = `See https://telefunc.com/shield`
  assertUsage(
    !Array.isArray(verifier),
    errorPrefix +
      ' is a plain JavaScript array which is forbidden: use `shield.type.tuple([])` instead of `[]`. ' +
      errorSuffix,
  )
  assertUsage(
    false,
    `${errorPrefix} is \`${getTypeName(
      verifier,
    )}\` which is forbidden. Always use \`shield.type[x]\` or a plain JavaScript Object. ${errorSuffix}`,
  )
}

function verifyObject(obj: Record<string, unknown>, arg: unknown, breadcrumbs: string): true | string {
  if (!isPlainObject(arg)) {
    return errorMessage(breadcrumbs, getTypeName(arg), 'object')
  }
  for (const key of unique([...Object.keys(obj), ...Object.keys(arg)])) {
    const res = verifyRecursive(obj[key], arg[key], `${breadcrumbs} > [object value of key \`${key}\`]`)
    if (res !== true) {
      return res
    }
  }
  return true
}

const type = (() => {
  const or = <T extends unknown[]>(...elements: T): T[number] => {
    const verifier = (input: unknown, breadcrumbs: string) => {
      const typeTargets = elements.map((el) => verifyRecursive(el, input, `${breadcrumbs}`))
      if (typeTargets.includes(true)) {
        return true
      }
      return `${breadcrumbs} is of wrong type`
    }
    markVerifier(verifier)
    verifier.toString = () => elements.map((el) => StringBetter(el)).join('|')
    return verifier as any
  }
  const tuple = <T extends unknown[]>(elements: [...T]): T => {
    const verifier = (input: unknown, breadcrumbs: string) => {
      if (!Array.isArray(input)) {
        return errorMessage(breadcrumbs, getTypeName(input), 'array')
      }
      const errorMessages = [...Array(Math.max(input.length, elements.length)).keys()]
        .map((i) =>
          verifyRecursive(
            i > elements.length - 1 ? type.undefined : elements[i],
            input[i],
            `${breadcrumbs} > [tuple element ${i}]`,
          ),
        )
        .filter((res) => res !== true)
      if (errorMessages.length === 0) {
        return true
      }
      return errorMessages[0]
    }
    markVerifier(verifier)
    markVerifierTuple(verifier)
    verifier.toString = () => StringBetter(elements)
    return verifier as any
  }
  const array = <T>(arrayType: T): T[] => {
    const verifier = (input: unknown, breadcrumbs: string) => {
      if (!Array.isArray(input)) {
        return errorMessage(breadcrumbs, getTypeName(input), 'array')
      }
      const errorMessages = input
        .map((_, i) => verifyRecursive(arrayType, input[i], `${breadcrumbs} > [array element ${i}]`))
        .filter((res) => res !== true)
      if (errorMessages.length === 0) {
        return true
      }
      return errorMessages[0]
    }
    markVerifier(verifier)
    verifier.toString = () => {
      let s = StringBetter(arrayType)
      if (s.includes(',')) {
        s = `(${s})`
      }
      s = `${s}[]`
      return s
    }
    return verifier as any
  }

  const value = <T extends Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null>(val: T): T => {
    const verifier = (input: unknown, breadcrumbs: string) =>
      input === val ? true : errorMessage(breadcrumbs, String(input), String(val))
    markVerifier(verifier)
    verifier.toString = () => StringBetter(val)
    return verifier as any
  }

  const string = ((): string => {
    const verifier = (input: unknown, breadcrumbs: string) =>
      typeof input === 'string' ? true : errorMessage(breadcrumbs, getTypeName(input), 'string')
    markVerifier(verifier)
    verifier.toString = () => 'string'
    return verifier as any
  })()
  const number = ((): number => {
    const verifier = (input: unknown, breadcrumbs: string) =>
      typeof input === 'number' ? true : errorMessage(breadcrumbs, getTypeName(input), 'number')
    markVerifier(verifier)
    verifier.toString = () => 'number'
    return verifier as any
  })()

  return {
    string,
    number,
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
shield.type = type

function errorMessage(breadcrumbs: string, is: string, should: string) {
  return `${breadcrumbs} is \`${is}\` but should be \`${should}\`.`
}

type Verifier = ((input: unknown, breadcrumbs: string) => true | string) & {
  [_isVerifier]?: true
  [_isVerifierTuple]?: true
}

function isVerifier(thing: unknown): thing is Verifier {
  return (thing as any) && (thing as any)[_isVerifier] === true
}
function markVerifier(verifier: Verifier) {
  assert(isCallable(verifier))
  verifier[_isVerifier] = true
}

function isVerifierTuple(thing: unknown): thing is Verifier {
  return isVerifier(thing) && thing[_isVerifierTuple] === true
}
function markVerifierTuple(verifier: Verifier) {
  verifier[_isVerifierTuple] = true
}

function getTypeName(thing: unknown): string {
  if (thing === null) {
    return 'null'
  }
  if (thing === undefined) {
    return 'undefined'
  }

  if (typeof thing === 'object') {
    assert(thing !== null)
    if (thing.constructor === Date) {
      return 'date'
    }
    if (Array.isArray(thing)) {
      return 'array'
    }
  }

  return typeof thing
}
