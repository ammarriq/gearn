import "./globals.css"
import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "@/prismicio"
import { DM_Sans } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// If loading a variable font, you don't need to specify the font weight
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-[#070815] text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  )
}

export default RootLayout
