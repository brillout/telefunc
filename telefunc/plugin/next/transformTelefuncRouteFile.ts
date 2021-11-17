import glob from 'fast-glob'

export { transformTelefuncRouteFile }

async function transformTelefuncRouteFile(src: string, id: string, root: string) {
  console.log(src, id, root)
  return {
    code: '',
    map: null,
  }
}
