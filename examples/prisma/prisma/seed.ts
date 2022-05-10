// @ts-ignore
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const todoData: Prisma.TodoCreateInput[] = [
  { title: 'Milk', content: 'Buy milk', completed: false },
  { title: 'Bananas', content: 'Buy bananas', completed: false }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const t of todoData) {
    const todo = await prisma.todo.create({
      data: t
    })
    console.log(`Created todo with id: ${todo.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
