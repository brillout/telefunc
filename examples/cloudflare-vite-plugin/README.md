# Telefunc + @cloudflare/vite-plugin Example

This example demonstrates how to use Telefunc with Cloudflare's official Vite plugin for a seamless development experience with Cloudflare Workers.

## Features

- 🚀 **Full Workers Runtime Integration**: Uses `@cloudflare/vite-plugin` for development with workerd
- 📡 **Type-safe RPC**: Telefunc provides type-safe remote procedure calls
- ⚡ **Hot Module Replacement**: Fast development with Vite's HMR
- 🔧 **Cloudflare Bindings**: Access to KV, D1, R2, and other Cloudflare services
- 🛡️ **Runtime Validation**: Automatic input validation with Telefunc Shield
- 🌐 **Production Ready**: Builds optimized for Cloudflare Workers deployment

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   This starts the Vite dev server with the Workers runtime (workerd) for an environment that closely matches production.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Deploy to Cloudflare:**
   ```bash
   npm run deploy
   ```

## Project Structure

```
├── src/
│   ├── worker.ts              # Cloudflare Worker entry point
│   └── api.telefunc.ts        # Telefunc RPC functions
├── index.html                 # Frontend application
├── vite.config.ts            # Vite configuration with Cloudflare plugin
├── wrangler.toml             # Cloudflare Workers configuration
└── package.json
```

## Key Integration Points

### 1. Vite Configuration

The `vite.config.ts` file configures both plugins:

```typescript
import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { telefunc } from 'telefunc/vite'

export default defineConfig({
  plugins: [
    cloudflare({
      entry: './src/worker.ts',
      dev: { runtime: 'workerd' }
    }),
    telefunc()
  ]
})
```

### 2. Worker Entry Point

The `src/worker.ts` file handles both Telefunc RPC calls and static asset serving:

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Handle Telefunc RPC calls
    if (url.pathname.startsWith('/_telefunc')) {
      return await telefunc({
        url: url.pathname,
        method: request.method,
        body: await request.text(),
        context: { env, ctx } // Pass Cloudflare environment
      })
    }
    // ... handle other requests
  }
}
```

### 3. Telefunc Functions

The `src/api.telefunc.ts` file defines type-safe RPC functions with access to Cloudflare bindings:

```typescript
const getGreeting = shield([{ name: t.string }], async function ({ name }, context) {
  const { env, ctx } = context as { env: CloudflareEnv, ctx: ExecutionContext }
  // Access Cloudflare bindings: env.MY_KV, env.MY_D1, etc.
  return { message: `Hello ${name}!` }
})
```

## Cloudflare Bindings

To use Cloudflare bindings (KV, D1, R2, etc.), uncomment and configure the relevant sections in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "MY_KV"
id = "your-kv-namespace-id"

[[d1_databases]]
binding = "MY_D1"
database_name = "my-database"
database_id = "your-database-id"
```

Then access them in your telefunctions through the context:

```typescript
const saveData = shield([{ data: t.string }], async function ({ data }, context) {
  const { env } = context as { env: CloudflareEnv }
  await env.MY_KV.put('key', data)
  return { success: true }
})
```

## Development vs Production

- **Development**: Uses workerd runtime via `@cloudflare/vite-plugin` for accurate local testing
- **Production**: Deploys to Cloudflare Workers with the same runtime environment

This ensures consistency between development and production environments.

## Benefits of This Integration

1. **Seamless Development**: No need for separate development servers or complex proxy setups
2. **Type Safety**: Full TypeScript support across client and server
3. **Performance**: Optimized builds with tree-shaking and code splitting
4. **Cloudflare Native**: Direct access to all Cloudflare services and APIs
5. **Hot Reloading**: Fast development iteration with Vite's HMR

## Learn More

- [Telefunc Documentation](https://telefunc.com)
- [Cloudflare Vite Plugin Documentation](https://developers.cloudflare.com/workers/vite-plugin/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
