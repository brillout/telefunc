// @ts-nocheck
import { database } from '$lib/database'

export { load }

const load = async ({ params, locals }: Parameters<import('./$types').PageServerLoad>[0]) => {
  const { user } = locals
  const { value } = database
  return {
    user,
    value
  }
}
