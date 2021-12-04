import { getPerson } from '../telefunc/persons.telefunc'
import { testTelefunc } from '../telefunc/testTelefunc.telefunc'

export const state = () => ({
  person: {
    firstName: '',
    lastName: '',
  },
  telefunctionWasRunInServer: false,
})

export const mutations = {
  setPerson(state, { firstName, lastName }) {
    state.person = { firstName, lastName }
  },
  setTelefunctionWasRunInServer(state, telefunctionWasRunInServer) {
    state.telefunctionWasRunInServer = telefunctionWasRunInServer
  },
}

export const actions = {
  async loadData({ commit }) {
    const person = await getPerson(0)
    const telefunctionWasRunInServer = await testTelefunc()
    commit('setPerson', person)
    commit('setTelefunctionWasRunInServer', telefunctionWasRunInServer)
  },
}
