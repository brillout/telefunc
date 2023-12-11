export default {
  ci: {
    jobs: getCiJobs()
  },
  tolerateError
}

function getCiJobs() {
  const ubuntu20 = {
    os: 'ubuntu-latest',
    node_version: '20'
  }
  const ubuntu18 = {
    os: 'ubuntu-latest',
    node_version: '18'
  }
  const ubuntu16 = {
    os: 'ubuntu-latest',
    node_version: '16'
  }
  const ubuntu17 = {
    os: 'ubuntu-latest',
    node_version: '17'
  }
  const win16 = {
    os: 'windows-latest',
    node_version: '16'
  }
  const win18 = {
    os: 'windows-latest',
    node_version: '18'
  }
  const win20 = {
    os: 'windows-latest',
    node_version: '20'
  }
  const mac17 = {
    os: 'macos-latest',
    node_version: '17'
  }

  return [
    {
      name: 'Vite',
      setups: [ubuntu18, win16, mac17]
    },
    {
      name: 'React Native',
      setups: [ubuntu16, win18]
    },
    {
      name: 'Cloudflare Workers',
      setups: [ubuntu17]
    },
    {
      name: 'Next.js',
      setups: [ubuntu20, win20]
    },
    {
      name: 'Nuxt 2',
      setups: [ubuntu16, win16]
    },
    {
      name: 'SvelteKit',
      setups: [ubuntu16, win18]
    },
    {
      name: 'Prisma',
      setups: [win16, mac17]
    },
    {
      name: 'https://telefunc.com',
      setups: [ubuntu18]
    }
  ]
}

function tolerateError({ logSource, logText }) {
  return (
    isRollupEmptyChunkWarning() ||
    isSveltekitTypesGenWarning() ||
    isCJSVikeWarning() ||
    isCJSViteWarning() ||
    isVikeOldDesignWarning() ||
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
        "The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details."
      )
    )
  }

  function isVikeOldDesignWarning() {
    return (
      logSource === 'stderr' &&
      logText.includes(
        'You are using the old deprecated design, update to the new V1 design, see https://vike.dev/migration/v1-design'
      )
    )
  }

  function isNextJsEslintWarning() {
    return (
      logSource === 'stderr' &&
      logText.includes(
        "DeprecationWarning: 'originalKeywordKind' has been deprecated since v5.0.0 and will no longer be usable after v5.2.0. Use 'identifierToKeywordKind(identifier)' instead."
      )
    )
  }
}
