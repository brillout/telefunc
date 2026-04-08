import tailwindcss from '@tailwindcss/vite'
import vike from 'vike/plugin'

process.env.VIKE_CRAWL ??= JSON.stringify({ git: false })

export default {
  plugins: [tailwindcss(), vike()],
}
