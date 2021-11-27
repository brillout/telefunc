export { getPerson, getIsServer }

const persons = [
  {
    id: 0,
    firstName: 'Alan',
    lastName: 'Turing',
  },
  {
    id: 1,
    firstName: 'Kurt',
    lastName: 'Gödel',
  },
  {
    id: 2,
    firstName: 'Alan',
    lastName: 'Key',
  },
]

// should be true even in client (telefunctionWasRunInServer)
async function getIsServer() {
  return typeof window === 'undefined'
}

async function getPerson(id) {
  const person = persons[id]
  return person
}
