import { getPerson } from './persons.telefunc'

main()

async function main() {
  const person: any = await getPerson(0)
  const html = `First name: ${person.firstName}<br/>Last name: ${person.lastName}`
  document.getElementById('view')!.innerHTML = html
}
