import { Abort, shield } from 'telefunc'
import prisma from './client'

const t = shield.type

export async function onGetTodos() {
  const todos = await prisma.todo.findMany()
  return todos
}

export const onToggleTodo = shield([t.number], async function onToggleTodo(id) {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })
  if (!todo) {
    throw Abort()
  }
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !todo.completed,
    },
  })
})

export const onDeleteTodo = shield([t.number], async function onDeleteTodo(id) {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })
  if (!todo) {
    throw Abort()
  }
  await prisma.todo.delete({
    where: {
      id,
    },
  })
})
