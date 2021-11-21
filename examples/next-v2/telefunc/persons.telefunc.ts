export { getPerson, getIsServer }

export type Person = {
  id: number
  firstName: string
  lastName: string
}

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
] as const

// should be true even in client
async function getIsServer() {
  return typeof window === 'undefined'
}

async function getPerson(id: number): Promise<Person> {
  const person = persons[id]
  return person
}
