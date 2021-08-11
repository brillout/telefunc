import { msg } from './msg.telefunc'

const buttonEl = document.querySelector("button")
const messagesEl = document.querySelector('#messages')

buttonEl.onclick = () => {
  const m = await msg()
  messagesEl.textContent = m
}
