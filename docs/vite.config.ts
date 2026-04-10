import { nivelTailwindVite } from '@unterberg/nivel/tailwind'
import vike from 'vike/plugin'

process.env.VIKE_CRAWL ??= JSON.stringify({ git: false })

export default {
  plugins: [nivelTailwindVite(), vike()],
}
