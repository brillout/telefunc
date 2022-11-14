import { onLoadData } from './Counter.telefunc'

export { load }

const load: import('./$types').PageLoad = async ({ params }) => {
  const { value } = await onLoadData()
  return {
    value
  }
}
