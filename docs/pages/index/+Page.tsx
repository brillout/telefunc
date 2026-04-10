import { LayoutComponent } from '@unterberg/nivel/client'
import BackendCode from './backendCode.mdx'
import CTAButtons from './CTA'
import { Features } from './Features'
import StartPageFooter from './Footer'
import FrontendCode from './frontendCode.mdx'
import { Quickstart } from './QuickStart/QuickStart'
import SectionHeading from './SectionHeading'

import './landing-code-samples.css'

const Page = () => {
  return (
    <div className="landing-code-samples">
      <div className="overflow-x-clip min-h-[calc(100svh-20*var(--spacing))] flex flex-col justify-center py-16 w-full">
        <LayoutComponent className="relative">
          <div className="text-center mx-auto z-2 relative">
            {/* <div className="flex rounded-field justify-center w-fit mx-auto shadow border border-base-muted-medium/50 overflow-hidden">
            <span className="block py-1.5 px-2 font-semibold text-xs text-base-muted tracking-wide">REPLACES</span>
            <span className="block py-1.5 px-2 bg-base-muted-superlight text-base-muted font-semibold text-xs">
              REST / GraphQL / tRPC / Server Actions
            </span>
          </div> */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl! font-bold tracking-tight">
                Telefunc(tions)
              </h1>
              <p className="font-normal text-base-muted text-lg lg:text-3xl mt-4">
                End-to-End type safety without the schema
              </p>
            </div>
          </div>
        </LayoutComponent>

        <LayoutComponent $size="sm" className="flex gap-2 justify-center">
          <CTAButtons />
        </LayoutComponent>
        <LayoutComponent $size="sm">
          <div className="grid grid-cols-2 gap-4">
            <h2 className="text-lg font mb-2 text-center">Call in the browser</h2>
            <h2 className="text-lg font mb-2 text-center">Run on the server</h2>
          </div>
          <div className="landing-code-samples grid grid-cols-2 gap-4 items-stretch">
            <FrontendCode />
            <BackendCode />
          </div>
        </LayoutComponent>
      </div>

      <div className="relative h-fit overflow-x-clip">
        <div className="absolute top-0 left-0 w-[160svh] h-[160svh] bg-radial from-primary-muted-light/30 to-65%" />

        <LayoutComponent $size="md">
          <SectionHeading>Features</SectionHeading>
          <Features />
          <CTAButtons />
        </LayoutComponent>
      </div>
      <LayoutComponent $size="md">
        <SectionHeading>Quick Start</SectionHeading>
        <Quickstart />
        <CTAButtons />
      </LayoutComponent>
      <div className="relative overflow-hidden h-fit">
        <div className="absolute top-0 left-0 w-full h-[60svh] bg-radial-[at_65%_85%] from-primary-muted-light to-65%" />
        <LayoutComponent $size="sm">
          <SectionHeading>You may not need an API schema</SectionHeading>
          <StartPageFooter />
        </LayoutComponent>
      </div>
    </div>
  )
}

export default Page
