import "./globals.css"
import Navbar from "@/components/Navbar"
import { CountryProvider } from "@/hooks/useCountry"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <CountryProvider>
          <Navbar />
          {children}
        </CountryProvider>
      </body>
    </html>
  )
}
