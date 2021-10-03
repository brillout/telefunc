export { getPerson }

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

async function getPerson(id: number) {
  const person = persons[id]
  return person
}
