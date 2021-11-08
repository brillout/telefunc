export { setCookie }

const DAYS = 30

// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name: string, value: string) {
  var expires = ''
  if (DAYS) {
    var date = new Date()
    date.setTime(date.getTime() + DAYS * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
