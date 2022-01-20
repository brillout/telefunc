export default Page

import { useEffect, useState } from 'react'
import { getPerson } from '../person.telefunc'

function Page() {
  const [person, setPersion] = useState()

  useEffect(() => {
    getPerson(1).then((person) => {
      setPersion(person)
    })
  }, [])

  return (
    <>
      First name: {person?.firstName}
      <br />
      Last name: {person?.lastName}
      <br />
    </>
  )
}
