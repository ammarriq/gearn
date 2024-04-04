import Bounded from "@/components/Bounded"
import { Content } from "@prismicio/client"
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react"
import StarBackground from "./StarBackground"
import Image from "next/image"
import background from "./background.jpg"
import React from "react"
import StylizedLogoMark from "./StylizedLogoMark"
import clsx from "clsx"

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  const icons = {
    cloudflare: "icon-[fa6-brands--cloudflare]",
    npm: "icon-[fa6-brands--npm]",
    github: "icon-[fa6-brands--github]",
    figma: "icon-[fa6-brands--figma]",
    digitalocean: "icon-[fa6-brands--digital-ocean]",
    fly: "icon-[fa6-brands--fly]",
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />

      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-20 flex flex-col items-center md:flex-row">
          {slice.items.map((item, index) => (
            <React.Fragment key={index}>
              {index === Math.floor(slice.items.length / 2) && (
                <>
                  <StylizedLogoMark />
                  <div className="signal-line rotate-180 bg-gradient-to-t" />
                </>
              )}

              <div className="pulsing-icon flex aspect-square size-12 shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-blue-100 opacity-40 md:size-16 lg:size-[4.6rem]">
                <i className={`size-full ${item.icon && icons[item.icon]}`} />
              </div>

              {index !== slice.items.length - 1 && (
                <div
                  className={clsx(
                    "signal-line",
                    index > Math.floor(slice.items.length / 2)
                      ? "rotate-180"
                      : "rotate-0",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Bounded>
  )
}

export default Integrations
