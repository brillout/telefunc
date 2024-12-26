export default {
  ci: {
    jobs: getCiJobs(),
  },
  tolerateError,
}

function getCiJobs() {
  const ubuntu20 = {
    os: 'ubuntu-latest',
    node_version: '20',
  }
  const win18 = {
    os: 'windows-latest',
    node_version: '18',
  }
  const setups = [ubuntu20, win18]
  const setupModern = [ubuntu20]

  return [
    {
      name: 'Vite',
      setups,
    },
    {
      name: 'React Native',
      setups,
    },
    {
      name: 'Cloudflare Workers',
      setups: setupModern,
    },
    {
      name: 'Next.js',
      setups,
    },
    {
      name: 'Nuxt 2',
      setups,
    },
    {
      name: 'SvelteKit',
      setups,
    },
    {
      name: 'https://telefunc.com',
      setups: setupModern,
    },
  ]
}

function tolerateError({ logSource, logText }) {
  return (
    // TODO: move everything to this array
    [
      // Error: [DocPress][Warning] prop `text` is deprecated
      'prop `text` is deprecated',
      // [11:03:16.814][/docs/.test-dev.test.ts][pnpm run dev][stderr] Cannot optimize dependency: @brillout/docpress/renderer/onRenderClient, present in 'optimizeDeps.include'
      'Cannot optimize dependency: @brillout/docpress/renderer/onRenderClient',
      // [21:29:57.330][/docs/.test-dev.test.ts][pnpm run dev][stderr] Cannot optimize dependency: @brillout/docpress/Layout, present in 'optimizeDeps.include'
      'Cannot optimize dependency: @brillout/docpress/Layout',
    ].some((t) => logText.includes(t)) ||
    isRollupEmptyChunkWarning() ||
    isSveltekitTypesGenWarning() ||
    isCJSVikeWarning() ||
    isCJSViteWarning() ||
    isVikeDeprecatedDesignWarning() ||
    isNextJsEslintWarning()
  )

  function isRollupEmptyChunkWarning() {
    return logSource === 'stderr' && logText.includes('Generated an empty chunk: "hooks"')
  }

  function isSveltekitTypesGenWarning() {
    return logSource === 'stderr' && logText.includes('Cannot find base config file "./.svelte-kit/tsconfig.json"')
  }

  function isCJSVikeWarning() {
    return (
      logSource === 'stderr' &&
      logText.includes('We recommend setting ') &&
      logText.includes('/package.json#type to "module", see https://vike.dev/CJS')
    )
  }
  function isCJSViteWarning() {
    return (
      logSource === 'stderr' &&
      logText.includes(
        "The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.",
      )
    )
  }

  function isVikeDeprecatedDesignWarning() {
    return (
      logSource === 'stderr' &&
      (logText.includes(
        // Old warning
        'You are using the old deprecated design, update to the new V1 design, see https://vike.dev/migration/v1-design',
      ) ||
        logText.includes(
          // New warning
          "You are using Vike's deprecated design. Update to the new V1 design, see https://vike.dev/migration/v1-design for how to migrate.",
        ))
    )
  }

  function isNextJsEslintWarning() {
    return (
      logSource === 'stderr' &&
      logText.includes(
        "DeprecationWarning: 'originalKeywordKind' has been deprecated since v5.0.0 and will no longer be usable after v5.2.0. Use 'identifierToKeywordKind(identifier)' instead.",
      )
    )
  }
}
