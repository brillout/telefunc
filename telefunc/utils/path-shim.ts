export { pathJoin }
export { pathIsAbsolute }

// Simple shim for `import * from "node:path"` used by the server runtime.
// Robust alternative: https://github.com/unjs/pathe

import { assert } from './assert.js'

function pathJoin(path1: string, path2: string): string {
  assert(!path1.includes('\\'))
  assert(!path2.includes('\\'))
  let joined = [...path1.split('/'), ...path2.split('/')].filter(Boolean).join('/')
  if (path1.startsWith('/')) joined = '/' + joined
  return joined
}

// https://github.com/unjs/pathe/blob/1eadc66c0fb3b2916cbcc1c73370bf4b824985ff/src/path.ts#L14
const IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/
function pathIsAbsolute(filePath: string) {
  return IS_ABSOLUTE_RE.test(filePath)
}
