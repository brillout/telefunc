import React from 'react'
import { Link } from '@brillout/docpress'

export { ReadingRecommendation }

// TO-DO/eventually: remove
function ReadingRecommendation({ tour, links }: { tour?: true; links?: string[] }) {
  links ??= []
  if (!links.length) tour = true
  const multiple = links.length + (tour ? 1 : 0) > 1
  const intro = <b>Reading Recommendation{multiple ? '.' : ': '}</b>
  return (
    <blockquote>
      {(() => {
        if (!multiple) {
          const link = tour ? <TourLink /> : <Link href={links[0]} />
          return (
            <p>
              {intro}
              {link}
            </p>
          )
        }
        return (
          <>
            <p> {intro}</p>
            <ul
              style={{
                marginLeft: 18,
                marginTop: 11,
              }}
            >
              {tour && (
                <li>
                  <TourLink />
                </li>
              )}
              {links.map((link, i) => (
                <li key={i}>
                  <Link href={link} />
                </li>
              ))}
            </ul>
          </>
        )
      })()}
    </blockquote>
  )
}

function TourLink() {
  return (
    <>
      <Link href={'/react-tour'} noBreadcrumb={true} /> or <Link href={'/vue-tour'} noBreadcrumb={true} />
    </>
  )
}
