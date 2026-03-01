"use client"

import "./globals.css"
import { CountryProvider } from "@/hooks/useCountry"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CountryProvider>
          {children}
        </CountryProvider>
      </body>
    </html>
  )
}
