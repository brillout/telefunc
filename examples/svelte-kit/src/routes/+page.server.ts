import { database } from '$lib/database'

export { load }

const load: import('./$types').PageServerLoad = async ({ params, locals }) => {
  const { user } = locals
  const { value } = database
  return {
    user,
    value
  }
}
