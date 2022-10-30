import { onHello } from './index.telefunc'
const { message } = await onHello({ name: 'Eva' })
document.querySelector('#view')!.textContent = message
