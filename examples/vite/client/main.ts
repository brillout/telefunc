import { hello } from '../hello.telefunc'

const { message } = await hello({ name: 'Eva' })
document.querySelector('#view').textContent = message
