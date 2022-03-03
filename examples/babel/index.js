import { hello } from './hello.telefunc.mjs'
const { message } = await hello({ name: 'Eva' })
document.querySelector('#view').textContent = message
