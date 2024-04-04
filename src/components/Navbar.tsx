"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { PrismicNextLink } from "@prismicio/next"
import { Content, asLink } from "@prismicio/client"
import clsx from "clsx"
import ButtonLink from "./ButtonLink"
import WordMark from "./WordMark"

type NavbarProps = {
  settings: Content.SettingsDocument
}

const Navbar = ({ settings }: NavbarProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const getAriaCurrent = (item: Content.SettingsDocumentDataNavigationItem) => {
    return pathname.includes(asLink(item.link) as string) ? "page" : undefined
  }

  return (
    <nav className="px-6 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only">Glearn.ai Home Page</span>
          </Link>

          <button
            type="button"
            className="block p-2 text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <i className="icon-[solar--hamburger-menu-linear] size-8" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={clsx(
            "fixed inset-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 mb-4 block rotate-45 p-2 text-5xl font-extralight text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <span>+</span>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                    aria-current={getAriaCurrent(item)}
                  >
                    {item.label}
                  </ButtonLink>
                )
              }

              return (
                <PrismicNextLink
                  key={item.label}
                  field={item.link}
                  className="block px-3 text-3xl first:mt-8"
                  onClick={() => setOpen(false)}
                  aria-current={getAriaCurrent(item)}
                >
                  {item.label}
                </PrismicNextLink>
              )
            })}
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink
                    field={item.link}
                    aria-current={getAriaCurrent(item)}
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              )
            }

            return (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                  aria-current={getAriaCurrent(item)}
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
