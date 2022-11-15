export default {
  ci: {
    jobs: getCiJobs()
  }
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
  const win16 = {
    os: 'windows-latest',
    node_version: '16'
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
      setups: [ubuntu16, win16]
    },
    {
      name: 'https://telefunc.com',
      setups: [ubuntu18]
    }
  ]
}
