"use client"

import { CountryProvider } from "@/hooks/useCountry"
import Navbar from "@/components/Navbar"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // 🔹 keeps your scroll/animation logic intact
  useEffect(() => {
    // if you already had scroll logic here, keep it
  }, [pathname])

  return (
    <CountryProvider>
      {/* BACKGROUND VIDEO */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/lux-bg.mp4" type="video/mp4" />
        </video>

        {/* Frost overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="pt-24 min-h-screen text-white">
        {children}
      </div>
    </CountryProvider>
  )
}