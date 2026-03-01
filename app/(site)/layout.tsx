"use client"

import { CountryProvider } from "@/hooks/useCountry"
import Navbar from "@/components/Navbar"
import { usePathname } from "next/navigation"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <CountryProvider>
      <div className="relative min-h-screen text-white overflow-x-hidden">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/lux-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="fixed inset-0 bg-black/60 -z-10"></div>

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-24 px-10">
          {children}
        </main>

      </div>
    </CountryProvider>
  )
}
