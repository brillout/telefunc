export default {
  ci: {
    jobs: getCiJobs()
  },
  tolerateError
}

function getCiJobs() {
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
      setups: [ubuntu16]
    },
    {
      name: 'Cloudflare Workers',
      setups: [ubuntu17]
    },
    {
      name: 'Next.js',
      setups: [ubuntu16, win16]
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
  return isRollupEmptyChunkWarning() || isSveltekitTypesGenWarning()

  function isRollupEmptyChunkWarning() {
    return logSource === 'stderr' && logText.includes('Generated an empty chunk: "hooks"')
  }

  function isSveltekitTypesGenWarning() {
    return logSource === 'stderr' && logText.includes('Cannot find base config file "./.svelte-kit/tsconfig.json"')
  }
}
