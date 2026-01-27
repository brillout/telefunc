const onBeforeHandlers: Array<(ctx: any) => void | Promise<void>> = []

export function onBefore(handler: (ctx: any) => void | Promise<void>) {
  onBeforeHandlers.push(handler)
}

export async function runOnBefore(ctx: any) {
  console.log('🔥 onBefore called')
  for (const handler of onBeforeHandlers) {
    await handler(ctx)
  }
}
