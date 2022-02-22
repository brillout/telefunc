import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { readData } from './readData.telefunc'
import { telefuncConfig } from 'telefunc/dist/client'

/**
 * Change this to `http://localhost:3000/_telefunc` if you're running the app
 * from a simulator, otherwise enter your computer's IP address.
 */
telefuncConfig.telefuncUrl = 'http://192.168.0.126:3000/_telefunc'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<undefined | any>(undefined)
  const [error, setError] = useState<undefined | string>(undefined)
  useEffect(function effect() {
    async function runEffect() {
      setIsLoading(true)

      try {
        const data = await readData()
        setData(data)
      } catch (error) {
        setError(String(error))
      }

      setIsLoading(false)
    }

    runEffect()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'monospace' }}>{JSON.stringify({ isLoading, error, data }, null, 2)}</Text>
    </View>
  )
}
