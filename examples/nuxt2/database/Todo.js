export const Todo = {
  findMany,
  createNew,
}

import ProtoDB from '@brillout/proto-db'

const database = ProtoDB.load(process.cwd() + '/database/data.json', {
  todoItems: [
    { text: 'Buy milk', authorId: 0 },
    { text: 'Buy strawberries', authorId: 0 },
  ],
})

function findMany({ authorId }) {
  return database.todoItems.filter((todoItem) => todoItem.authorId === authorId)
}

async function createNew({ text, authorId }) {
  database.todoItems.push({ text, authorId })
  await database._save()
}
