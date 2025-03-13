import { toPosixPath } from '../utils.js'

export { isViteCliCall }

function isViteCliCall({ command, ssr }: { command: 'build' | 'dev' | 'preview'; ssr?: true }) {
  const { isViteCli, viteCliCommand, viteCliOptions } = analyzise()

  if (!isViteCli) {
    return false
  }

  if (ssr && !viteCliOptions.includes('--ssr')) {
    return false
  }

  if (command === 'dev') {
    if (!['dev', 'serve', ''].includes(viteCliCommand)) {
      return false
    }
  } else {
    if (command !== viteCliCommand) {
      return false
    }
  }

  return true
}

function analyzise() {
  const { argv } = process

  const viteCliOptions: string[] = []
  let viteCliCommand: string = ''

  let isViteCli = false
  for (const arg of argv) {
    if (isViteCli) {
      if (arg.startsWith('-')) {
        viteCliOptions.push(arg)
      } else {
        if (viteCliOptions.length === 0) {
          viteCliCommand = arg
        }
      }
    } else {
      const a = toPosixPath(arg)
      if (
        // pnpm
        a.endsWith('/bin/vite.js') ||
        // npm & yarn
        a.endsWith('/.bin/vite')
      ) {
        isViteCli = true
      }
    }
  }

  return { isViteCli, viteCliOptions, viteCliCommand }
}
