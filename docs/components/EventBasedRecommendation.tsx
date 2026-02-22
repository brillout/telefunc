export { EventBasedRecommendation }

import React from 'react'
import { Link } from '@brillout/docpress'

function EventBasedRecommendation({ samePage }: { samePage?: boolean }) {
  return (
    <>
      <blockquote>
        <p>
          Opting out of the naming convention is perfectly fine, though it's recommended to have a clear reason for
          doing so.
        </p>
        <p>
          It's recommended to read{' '}
          {samePage ? <Link href="#example">the example above</Link> : <Link href="/event-based" />} before opting out.
          It explains why event-based telefunctions lead to increased:
        </p>
        <ul>
          <li>Development speed </li>

          <li>Security </li>
          <li>Performance </li>
        </ul>
        <p>
          <a href="https://github.com/brillout/telefunc/issues/new">Feel free to reach out</a> if you have questions.
        </p>
      </blockquote>
    </>
  )
}
