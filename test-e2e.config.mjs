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
  const win14 = {
    os: 'windows-latest',
    node_version: '14'
  }
  const mac17 = {
    os: 'macos-latest',
    node_version: '17'
  }

  return [
    {
      name: 'Vite',
      setups: [ubuntu18, win14, mac17]
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
      setups: [ubuntu16, win14]
    },
    {
      name: 'Nuxt 2',
      setups: [ubuntu16, win14]
    },
    {
      name: 'SvelteKit',
      setups: [ubuntu16]
    },
    {
      name: 'https://telefunc.com',
      setups: [ubuntu18]
    }
  ]
}

function tolerateError(log) {
  return isFetchExperimentalWarning() || isRollupEmptyChunkWarning()

  function isFetchExperimentalWarning() {
    return (
      log.logSource === 'stderr' &&
      log.logText.includes(
        'ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time'
      )
    )
  }

  function isRollupEmptyChunkWarning() {
    return (
      log.logSource === 'stderr' &&
      log.logText.includes(
        'Generated an empty chunk: "hooks"'
      )
    )
  }
}
