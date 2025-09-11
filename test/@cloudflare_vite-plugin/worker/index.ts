import { handleSsr } from './ssr'
import { telefunc, config } from 'telefunc'
import { DurableObject, env } from 'cloudflare:workers'
config.disableNamingConvention = true

export default {
  async fetch(request) {
    const url = new URL(request.url)

    // Serve Telefunc
    if (url.pathname.startsWith('/_telefunc')) {
      const body = await request.text()
      const { method } = request
      const response = await handleTelefunc({ url: url.pathname, method, body })
      return response
    }

    if (['/increment', '/decrement', '/state'].includes(url.pathname)) {
      const name = url.searchParams.get('name')
      if (!name) {
        return new Response(
          'Select a Durable Object to contact by using' +
            ' the `name` URL query string parameter, for example, ?name=A',
        )
      }

      // A stub is a client Object used to send messages to the Durable Object.
      const stub = env.COUNTERS.getByName(name)

      // Send a request to the Durable Object using RPC methods, then await its response.
      let count = null
      switch (url.pathname) {
        case '/increment':
          count = await stub.increment()
          break
        case '/decrement':
          count = await stub.decrement()
          break
        case '/state':
          // Serves the current value.
          count = await stub.getCounterValue()
          break
      }
      return new Response(`Durable Object '${name}' count: ${count}`)
    }

    return await handleSsr(url)
  },
} satisfies ExportedHandler<Env>

async function handleTelefunc({ url, method, body }: any) {
  const httpResponse = await telefunc({ url, method, body })
  return new Response(httpResponse.body, {
    headers: { 'content-type': httpResponse.contentType },
    status: httpResponse.statusCode,
  })
}

// Durable Object
export class Counter extends DurableObject {
  async getCounterValue() {
    let value = (await this.ctx.storage.get('value')) || 0
    return value
  }

  async increment(amount = 1) {
    let value = (await this.ctx.storage.get('value')) || 0
    value += amount
    // You do not have to worry about a concurrent request having modified the value in storage.
    // "input gates" will automatically protect against unwanted concurrency.
    // Read-modify-write is safe.
    await this.ctx.storage.put('value', value)
    return value
  }

  async decrement(amount = 1) {
    let value = (await this.ctx.storage.get('value')) || 0
    value -= amount
    await this.ctx.storage.put('value', value)
    return value
  }
}
