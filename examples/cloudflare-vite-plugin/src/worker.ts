import { telefunc } from 'telefunc'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    
    // Handle Telefunc RPC calls
    if (url.pathname.startsWith('/_telefunc')) {
      const body = await request.text()
      const httpResponse = await telefunc({
        url: url.pathname,
        method: request.method,
        body,
        // Pass Cloudflare environment to telefunctions
        context: { env, ctx }
      })
      
      return new Response(httpResponse.body, {
        status: httpResponse.statusCode,
        headers: {
          'Content-Type': httpResponse.contentType,
          // Add CORS headers for development
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
    }
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      })
    }
    
    // Serve static assets (handled by Cloudflare Vite plugin)
    // In production, this would serve your built frontend assets
    return new Response('Hello from Cloudflare Workers with Telefunc!', {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

// Type definitions for Cloudflare Workers environment
interface Env {
  // Add your environment variables and bindings here
  // Example:
  // MY_KV: KVNamespace
  // MY_D1: D1Database
  // MY_SECRET: string
}

declare global {
  interface CloudflareEnv extends Env {}
}
