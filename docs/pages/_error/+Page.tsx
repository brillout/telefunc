import { usePageContext } from 'vike-react/usePageContext'

const Page = () => {
  const pageContext = usePageContext()

  let msg: string // Message shown to the user
  const { abortReason, abortStatusCode } = pageContext
  if (typeof abortReason === 'string') {
    // Handle `throw render(abortStatusCode, `You cannot access ${someCustomMessage}`)`
    msg = abortReason
  } else if (abortStatusCode === 403) {
    // Handle `throw render(403)`
    msg = "You cannot access this page because you don't have enough privileges."
  } else if (abortStatusCode === 401) {
    // Handle `throw render(401)`
    msg = "You cannot access this page because you aren't logged in. Please log in."
  } else if (abortStatusCode === 404) {
    // Handle `throw render(404)`
    msg = "This page doesn't exist."
  } else if (abortStatusCode === 500) {
    // Handle `throw render(500)`
    msg = 'Something went wrong. Try again (later).'
  } else {
    // Fallback error message
    msg = pageContext.is404 ? "This page doesn't exist." : 'Something went wrong. Try again (later).'
  }

  return <p>{msg}</p>
}
export default Page
