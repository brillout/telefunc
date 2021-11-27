import { getPerson, getIsServer } from '../telefunc/persons.telefunc'

export const state = () => ({
  firstName: '',
  lastName: '',
  telefunctionWasRunInServer: false,
})

export const mutations = {
  setPerson(state, { firstName, lastName }) {
    state.firstName = firstName
    state.lastName = lastName
  },
  setTelefunctionWasRunInServer(state, value) {
    state.telefunctionWasRunInServer = value
  },
}

export const actions = {
  async person({ commit }) {
    const person = await getPerson(0)

    commit('setPerson', person)
  },
  async telefunctionWasRunInServer({ commit }) {
    const value = await getIsServer()

    commit('setTelefunctionWasRunInServer', value)
  },
}
