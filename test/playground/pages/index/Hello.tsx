export { Hello }

import React, { useState, useEffect } from 'react'
import { onLoad } from './Hello.telefunc'

function Hello() {
  const [msg, setMsg] = useState<string | null>(null)
  useEffect(() => {
    ;(async () => {
      // @ts-ignore
      const { message } = await onLoad({ name: 'Eva', bla: true })
      setMsg(message)
    })()
  }, [])
  return <p>{!msg ? <>Loading...</> : <>{msg}</>}</p>
}
