export { shield }
export { shieldIsMissing }
export { shieldApply }
export { shieldToHumandReadable }

import { isPlainObject, unique, isCallable, assert, assertUsage } from '../utils.js'

const shieldKey = '__telefunc_shield'
const isVerifierKey = '__telefunc_isVerifier'
const isVerifierTupleKey = '__telefunc_isVerifierTuple'

type ShieldOptions = { __autoGenerated?: boolean }

const shield: {
  <
    A extends unknown[],
    TelefunctionArguments extends [...A],
    Telefunction extends (...args: TelefunctionArguments) => unknown,
  >(
    telefunction: Telefunction,
    telefunctionShield: TelefunctionArguments,
    options?: ShieldOptions,
  ): Telefunction
  <
    A extends unknown[],
    TelefunctionArguments extends [...A],
    Telefunction extends (...args: TelefunctionArguments) => unknown,
  >(
    telefunctionShield: TelefunctionArguments,
    telefunction: Telefunction,
    options?: ShieldOptions,
  ): Telefunction
  type: typeof type
} = function (arg1, arg2, options) {
  let telefunction: Telefunction
  let telefunctionShield: TelefunctionShield
  if (isTelefunction(arg1)) {
    assertShield(arg2, 'shield(telefunction, telefunctionShield)')
    telefunction = arg1
    telefunctionShield = arg2
  } else if (isTelefunction(arg2)) {
    assertShield(arg1, 'shield(telefunctionShield, telefunction)')
    telefunction = arg2
    telefunctionShield = arg1
  } else {
    assertUsage(false, '[shield(arg1, arg2)] Neither `arg1` nor `arg2` is a function, but one should be.')
  }
  installShield(telefunction, telefunctionShield, !!options?.__autoGenerated)
  return telefunction
}

type Telefunction = Function

function assertShield(
  telefunctionShield: unknown,
  shieldInvocation: 'shield(telefunction, telefunctionShield)' | 'shield(telefunctionShield, telefunction)',
): asserts telefunctionShield is TelefunctionShield {
  assertUsage(
    Array.isArray(telefunctionShield) || isVerifierTuple(telefunctionShield),
    [
      `[${shieldInvocation.replace('telefunctionShield', 'args')}]`,
      '`args` should be an array.',
      `Example of correct usage: \`${shieldInvocation.replace('telefunctionShield', '[shield.type.string]')}\`.`,
      `Example of wrong usage: \`${shieldInvocation.replace('telefunctionShield', 'shield.type.string')}\`.`,
    ].join(' '),
  )
}

function isTelefunction(thing: unknown): thing is Telefunction {
  return isCallable(thing) && !isVerifier(thing)
}

function installShield(telefunction: Function, telefunctionShield: any, generated: boolean) {
  const installedShield = (telefunction as any as Record<any, unknown>)[shieldKey as any]
  if (installedShield && generated) {
    // another shield is already installed, so not installing generated shield
    return
  }
  ;(telefunction as any as Record<any, unknown>)[shieldKey as any] = telefunctionShield
}

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
  return (telefunction as any)[shieldKey] || null
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
    verifier = shield.type.tuple(...verifier)
    assert(isVerifierTuple(verifier))
  }
  if (isVerifierTuple(verifier)) {
    return verifyRecursive(verifier, args, '[root]')
  }
  assert(false)
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

  if (verifier === undefined) {
    return (shield.type.const(undefined) as any as Verifier)(arg, breadcrumbs)
  }

  const errorPrefix = `[shield()] Bad shield definition: ${breadcrumbs}`
  const errorSuffix = `See https://telefunc.com/shield`
  assertUsage(
    !Array.isArray(verifier),
    errorPrefix +
      ' is a plain JavaScript array which is forbidden: use `shield.type.tuple()` instead of `[]`. ' +
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
    const res = verifyRecursive(obj[key], arg[key], `${breadcrumbs} > [object: value of key \`${key}\`]`)
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
  const tuple = <T extends unknown[]>(...elements: T): T => {
    const verifier = (input: unknown, breadcrumbs: string) => {
      if (!Array.isArray(input)) {
        return errorMessage(breadcrumbs, getTypeName(input), 'tuple')
      }
      const errorMessages = [...Array(Math.max(input.length, elements.length)).keys()]
        .map((i) =>
          verifyRecursive(
            i > elements.length - 1 ? type.const(undefined) : elements[i],
            input[i],
            `${breadcrumbs} > [tuple: element ${i}]`,
          ),
        )
        .filter((res) => res !== true)
      if (errorMessages.length === 0) {
        return true
      }
      return errorMessages[0]!
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
      return errorMessages[0]!
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
  const object = <T>(objectType: T): Record<string, T> => {
    const verifier = (input: unknown, breadcrumbs: string) => {
      if (typeof input !== 'object' || input === null || input.constructor !== Object) {
        return errorMessage(breadcrumbs, getTypeName(input), 'object')
      }
      const errorMessages = Object.entries(input)
        .map(([key, val]) => verifyRecursive(objectType, val, `${breadcrumbs} > [object: value of key \`${key}\`]`))
        .filter((res) => res !== true)
      if (errorMessages.length === 0) {
        return true
      }
      return errorMessages[0]!
    }
    markVerifier(verifier)
    verifier.toString = () => {
      let s = StringBetter(objectType)
      if (s.includes(',')) {
        s = `(${s})`
      }
      s = `Record<string, ${s}}`
      return s
    }
    return verifier as any
  }

  const const_ = <T extends Readonly<number> | Readonly<string> | Readonly<boolean> | undefined | null>(val: T): T => {
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
  const boolean = ((): boolean => {
    const verifier = (input: unknown, breadcrumbs: string) =>
      input === true || input === false ? true : errorMessage(breadcrumbs, getTypeName(input), 'boolean')
    markVerifier(verifier)
    verifier.toString = () => 'boolean'
    return verifier as any
  })()
  const date = ((): Date => {
    const verifier = (input: unknown, breadcrumbs: string) =>
      typeof input === 'object' && input !== null && input.constructor === Date
        ? true
        : errorMessage(breadcrumbs, getTypeName(input), 'date')
    markVerifier(verifier)
    verifier.toString = () => 'date'
    return verifier as any
  })()

  const any = ((): any => {
    const verifier = () => true as const
    markVerifier(verifier)
    verifier.toString = () => 'date'
    return verifier as any
  })()

  return {
    string,
    number,
    boolean,
    date,
    array,
    object,
    or,
    tuple,
    const: const_,
    optional: <T>(param: T): T | undefined => or(param, const_(undefined)),
    nullable: <T>(param: T): T | null => or(param, const_(null)),
    any,
  }
})()
shield.type = type

function errorMessage(breadcrumbs: string, is: string, should: string) {
  return `${breadcrumbs} is \`${is}\` but should be \`${should}\`.`
}

type Verifier = ((input: unknown, breadcrumbs: string) => true | string) & {
  [isVerifierKey]?: true
  [isVerifierTupleKey]?: true
}

function isVerifier(thing: unknown): thing is Verifier {
  return (thing as any) && (thing as any)[isVerifierKey] === true
}
function markVerifier(verifier: Verifier) {
  assert(isCallable(verifier))
  verifier[isVerifierKey] = true
}

function isVerifierTuple(thing: unknown): thing is Verifier {
  return isVerifier(thing) && thing[isVerifierTupleKey] === true
}
function markVerifierTuple(verifier: Verifier) {
  verifier[isVerifierTupleKey] = true
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
