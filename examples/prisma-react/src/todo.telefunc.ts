import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export { addTodo, getTodos }

async function addTodo({ title, content }: { title: string; content: string }) {
  await prisma.todo.create({
    data: {
      title,
      content,
    },
  })
}

async function getTodos() {
  const todos = await prisma.todo.findMany()
  return todos
}
