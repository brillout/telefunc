import { cmMerge } from '@classmatejs/react'
import { Link } from '@unterberg/nivel'
import type { HTMLAttributes } from 'react'

const CTAButtons = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cmMerge('flex justify-center gap-x-5 mx-9 not-prose my-10', props.className)} {...props}>
      <Link href={`/quick-start`} className="btn btn-secondary lg:btn-lg">
        Get started
      </Link>
      <Link href={`/concepts`} className="btn btn-ghost border-base-content bg-transparent lg:btn-lg">
        Learn more
      </Link>
    </div>
  )
}

export default CTAButtons
