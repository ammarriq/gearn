import Bounded from "@/components/Bounded"
import { Content } from "@prismicio/client"
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react"
import clsx from "clsx"
import Image from "next/image"
import React from "react"
import StarBackground from "./StarBackground"
import StylizedLogoMark from "./StylizedLogoMark"
import background from "./background.jpg"
import AnimatedContent from "./AnimatedContent"

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

        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  )
}

export default Integrations
