import { usePageContext } from 'vike-react/usePageContext'

const Page = () => {
  const pageContext = usePageContext()

  if (pageContext.abortStatusCode === 404 || pageContext.is404) {
    return <p>This page does not exist.</p>
  }

  return <p>Something went wrong.</p>
}

export default Page
