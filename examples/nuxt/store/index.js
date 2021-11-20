import { getPerson, getIsServer } from '../telefunc/persons.telefunc'

export const state = () => ({
  firstName: '',
  lastName: '',
  isServer: false,
})

export const mutations = {
  set(state, { firstName, lastName, isServer }) {
    state.firstName = firstName
    state.lastName = lastName
    state.isServer = isServer
  },
}
export const actions = {
  async fetch({ commit }) {
    const person = await getPerson(0)
    const isServer = await getIsServer()

    commit('set', {
      ...person,
      isServer,
    })
  },
}
