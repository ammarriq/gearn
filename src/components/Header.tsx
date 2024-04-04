import { createClient } from "@/prismicio"
import Navbar from "./Navbar"

const Header = async () => {
  const client = createClient()
  const settings = await client.getSingle("settings")

  return (
    <header>
      <Navbar settings={settings} />
    </header>
  )
}

export default Header
