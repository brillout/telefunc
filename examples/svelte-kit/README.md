Example of using Telefunc with [SvelteKit](https://kit.svelte.dev/).

To run it:

```bash
git clone git@github.com:brillout/telefunc
cd telefunc/examples/svelte-kit/
npm install
npm run dev
```

If you're using Docker, be sure to include `.svelte-kit/output` in the final image.

Example Dockerfile:

```Dockerfile
# Build stage
FROM node:22 AS builder
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build
RUN npm prune --production

# Final image
FROM node:22
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.svelte-kit/output ./.svelte-kit/output

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build"]
```

