import "./globals.css"
import Navbar from "@/components/Navbar"
import BackgroundVideo from "@/components/BackgroundVideo"
import { CountryProvider } from "@/hooks/useCountry"

export const metadata = {
  title: "LUX",
  description: "Luxury Affiliate Store",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <CountryProvider>
          <BackgroundVideo />
          <Navbar />
          <main className="relative z-10">{children}</main>
        </CountryProvider>
      </body>
    </html>
  )
}
