console.log('init')

import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getPerson, Person, getIsServer } from '../telefunc/persons.telefunc'

console.log('init2')

const Home: NextPage = () => {
  console.log('component render')
  const [person, setPersion] = useState<null | Person>()
  const [isServer, setIsServer] = useState<boolean>()

  const fetchPerson = () => {
    console.log('promise start')
    getPerson(0).then((person) => {
    console.log('promise end', person)
      setPersion(person)
    })
    getIsServer().then((isServer) => {
      setIsServer(isServer)
    })
  }

  useEffect(() => {
    console.log('effect')
    fetchPerson()
  }, [])

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
