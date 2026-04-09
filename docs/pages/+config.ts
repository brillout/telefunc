import nivel from '@unterberg/nivel/vike'
import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'
import docsConfig from './+docs'

export { config }

const themePreference = docsConfig.theme?.defaultPreference ?? 'light'
const dataTheme =
  themePreference === 'dark'
    ? (docsConfig.theme?.dark ?? 'consumer-dark')
    : (docsConfig.theme?.light ?? 'consumer-light')

const config: Config = {
  ...nivel,
  extends: [vikeReact],
  title: docsConfig.siteTitle,
  description: docsConfig.siteDescription ?? `${docsConfig.siteTitle} documentation`,
  htmlAttributes: { 'data-theme': dataTheme },
  passToClient: ['docs'],
  prerender: true,
}
