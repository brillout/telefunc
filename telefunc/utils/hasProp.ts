export { hasProp }

import { isCallable } from './isCallable.js'

// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'true'):  obj is ObjectType & Record<PropName, true>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'boolean'):  obj is ObjectType & Record<PropName, boolean>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'number'):  obj is ObjectType & Record<PropName, number>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'string'): obj is ObjectType & Record<PropName, string>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'object'): obj is ObjectType & Record<PropName, Record<string, unknown>>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'array'): obj is ObjectType & Record<PropName, unknown[]>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'string[]'): obj is ObjectType & Record<PropName, string[]>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'function'): obj is ObjectType & Record<PropName, (...args: any[]) => unknown>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: 'null'): obj is ObjectType & Record<PropName, null>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey, Enum>(obj: ObjectType, prop: PropName, type: Enum[]): obj is ObjectType & Record<PropName, Enum>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName): obj is ObjectType & Record<PropName, unknown>;
// prettier-ignore
// biome-ignore format:
function hasProp<ObjectType, PropName extends PropertyKey>(obj: ObjectType, prop: PropName, type: string | string[] = 'unknown'): boolean {
  const propExists = typeof obj === 'object' && obj !== null && prop in obj
  if (!propExists) {
    return false
  }
  if (type === 'unknown') {
    return true
  }
  const propValue = (obj as Record<any, unknown>)[prop]
  if (type === 'array') {
    return Array.isArray(propValue)
  }
  if (type === 'string[]') {
    return Array.isArray(propValue) && propValue.every((el) => typeof el === 'string')
  }
  if (type === 'function') {
    return isCallable(propValue)
  }
  if (Array.isArray(type)) {
    return typeof propValue === 'string' && type.includes(propValue)
  }
  if (type === 'null') {
    return propValue === null
  }
  if (type === 'true') {
    return propValue === true
  }
  return typeof propValue === type
}

/* Couldn't make it work
function propsIsNotNullish<ObjectType extends Record<PropName, PropType | null | undefined>, PropName extends PropertyKey, PropType>(obj: ObjectType, prop: PropName): obj is ObjectType & Record<PropName, PropType> {
  return obj[prop] !== null && obj[prop] !== undefined
}
*/

// Resources:
//  - https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html
//  - https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDAzgFQJ4AcCmdgAUAbgIYA2IOAXIiWBgDSJTbWIDkARnHGTnewCUNUhRzIUibr35gA3AFgAUKEiwEEzLnzFylGnUbNWNdmBABbTjgBOQkXvGpE5q7cUrw0eElRa8hKL6tPRMLLimKFA2MGAA5vaIQU6SUTHxHqreGn6sOskGocYRHOAA1mBwAO5gickSiOWVNZle6r7oeYGOhUbhbGmxcYgAvKVgFdW1wlI8fHSIAN7KiMiExeIjW+OTNeyIgksrq4g2OFAgNkjRlMcAvsdnF1cb+EmOo9v9Hg9KyhAIKK0GhNKajRAAFgATMplCQUChbFACLltIQSEwzJZrHZBIJ-oCZAA6MhwOIEEj4v6eNQ+WgIpEEAFgAAmMHaIImzTAM3hiJsUEkzLZ7SOShOa0QTIQIp8hyelzAx1WUAAFjZqi4cFVEABRGwamwEdgAQQZArpADESDAyEJlHcgA
