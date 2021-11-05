import type { NextPage } from 'next'
import { useState } from 'react'
import { getPerson, Person, getIsServer } from '../telefunc/persons.telefunc'

const Home: NextPage = () => {
  const [person, setPersion] = useState<null | Person>()
  const [isServer, setIsServer] = useState<boolean>()

  const fetchPerson = () => {
    getPerson(0).then((person) => {
      setPersion(person)
    })
    getIsServer().then((isServer) => {
      setIsServer(isServer)
    })
  }

  fetchPerson()

  return (
    <div id="view">
      First name: {person?.firstName}
      <br />
      Last name: {person?.lastName}
      <br />
      server: {isServer ? 'true' : 'false'}
    </div>
  )
}

export default Home
