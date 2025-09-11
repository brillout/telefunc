export { getMagicString }

import MagicString from 'magic-string'

// TODO/now use everywhere
// Used everywhere instead of `new MagicString()` for consistent source map generation
function getMagicString(code: string, id: string) {
  const magicString = new MagicString(code)

  const getMagicStringResult = () => {
    if (!magicString.hasChanged()) return undefined
    return {
      code: magicString.toString(),
      map: magicString.generateMap({ hires: true, source: id }),
    }
  }

  return { magicString, getMagicStringResult }
}
