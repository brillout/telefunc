import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { config } from 'telefunc/client'
import { hello } from './hello.telefunc.mjs'

config.telefuncUrl = 'http://localhost:3000/_telefunc'

export default function App() {
  const [state, set] = useState({ isLoading: true })

  useEffect(() => {
    ;(async () => {
      try {
        const data = await hello({ name: 'Eva' })
        set({ data })
      } catch (error) {
        set({ error })
      }
    })()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'monospace' }}>{JSON.stringify(state, null, 2)}</Text>
    </View>
  )
}
