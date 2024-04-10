"use client"

import { Content } from "@prismicio/client"
import clsx from "clsx"
import React from "react"
import StylizedLogoMark from "./StylizedLogoMark"
import gsap from "gsap"
import { useRef } from "react"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import { useGSAP } from "@gsap/react"

const icons = {
  cloudflare: "icon-[fa6-brands--cloudflare]",
  npm: "icon-[fa6-brands--npm]",
  github: "icon-[fa6-brands--github]",
  figma: "icon-[fa6-brands--figma]",
  digitalocean: "icon-[fa6-brands--digital-ocean]",
  fly: "icon-[fa6-brands--fly]",
}

const AnimatedContent = ({ slice }: { slice: Content.IntegrationsSlice }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const container = useRef(null)
  gsap.registerPlugin(useGSAP)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      })

      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      })

      tl.to(
        ".signal-line",
        {
          keyframes: [
            {
              backgroundPosition: "0% 0%",
            },
            {
              backgroundPosition: "100% 100%",
              duration: 1,
              stagger: { from: "center", each: 0.3 },
            },
          ],
        },
        "-=1.4",
      )

      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              duration: 1,
              stagger: { from: "center", each: 0.3 },
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: { from: "center", each: 0.3 },
            },
          ],
        },
        "-=2",
      )
    },
    { scope: container },
  )

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
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
                index >= Math.floor(slice.items.length / 2)
                  ? "rotate-180"
                  : "rotate-0",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default AnimatedContent
