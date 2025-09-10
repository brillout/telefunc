export { getGreeting, createUser, getUsers }

import { shield } from 'telefunc'

const t = shield.type

// Simple greeting function
const getGreeting = shield([{ name: t.string }], async function ({ name }, context) {
  // Access Cloudflare environment through context
  const { env, ctx } = context as { env: CloudflareEnv, ctx: ExecutionContext }
  
  return {
    message: `Hello ${name} from Cloudflare Workers!`,
    timestamp: new Date().toISOString(),
    // You can access Cloudflare bindings here
    // Example: await env.MY_KV.get('some-key')
  }
})

// Example with KV storage (uncomment if you have KV binding)
/*
const createUser = shield([{ 
  name: t.string, 
  email: t.string 
}], async function ({ name, email }, context) {
  const { env } = context as { env: CloudflareEnv }
  
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString()
  }
  
  // Store in KV
  await env.MY_KV.put(`user:${user.id}`, JSON.stringify(user))
  
  return { success: true, user }
})

const getUsers = shield([], async function (_, context) {
  const { env } = context as { env: CloudflareEnv }
  
  // List users from KV
  const { keys } = await env.MY_KV.list({ prefix: 'user:' })
  const users = await Promise.all(
    keys.map(async (key) => {
      const userData = await env.MY_KV.get(key.name)
      return userData ? JSON.parse(userData) : null
    })
  )
  
  return { users: users.filter(Boolean) }
})
*/

// Placeholder functions for when KV is not configured
const createUser = shield([{ 
  name: t.string, 
  email: t.string 
}], async function ({ name, email }) {
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString()
  }
  
  // In a real app, you would store this in KV, D1, or another storage solution
  console.log('User created:', user)
  
  return { success: true, user }
})

const getUsers = shield([], async function () {
  // In a real app, you would fetch from KV, D1, or another storage solution
  return { 
    users: [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        createdAt: new Date().toISOString()
      }
    ] 
  }
})
