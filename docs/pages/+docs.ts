import { defineDocsConfig } from '@unterberg/nivel/config'
import { docsGraph } from '../docs/docs.graph'

const docsConfig = defineDocsConfig({
  graph: docsGraph,
  siteTitle: 'telefunc',
  siteDescription: 'telefunc documentation',
  basePath: '/',
  contentDir: 'docs',
  theme: {
    light: 'telefunc-light',
    dark: 'telefunc-dark',
    defaultPreference: 'dark',
  },
  footer: {
    pagination: true,
  },
  algolia: {
    appId: 'NONXS2JSTL',
    apiKey: '9bf6a6f9bc168ca425e8e19a62cd8ba1',
    indexName: 'telefunc',
  },
  brand: {
    text: 'Telefunc',
    href: '/',
    logoLight: '/logo-light.svg',
    logoDark: '/logo-dark.svg',
    logoAlt: 'Telefunc logo',
  },
  head: {
    faviconSvg: '/favicon.svg',
    faviconIco: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  },
  social: {
    github: 'https://github.com/telefunc/telefunc',
    discord: 'https://discord.com/invite/VJKjMNMguV',
    x: 'https://discord.com/invite/VJKjMNMguV',
  },
  partners: {
    primary: [
      {
        name: 'Tencent Cloud',
        href: 'https://www.tencentcloud.com',
        logoLight: 'partners/tencent.svg',
      },
    ],
    gold: [
      {
        name: 'Telefunc',
        href: '#',
        logoLight: 'partners/telefunc.svg',
      },
      {
        name: 'Void(0)',
        href: '#',
        logoLight: 'partners/void-0.svg',
      },
    ],
  },
})

export default docsConfig
