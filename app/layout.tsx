"use client"

import "./globals.css"
import Navbar from "@/components/Navbar"
import { CountryProvider } from "@/hooks/useCountry"

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CountryProvider>
      <div className="relative min-h-screen text-white overflow-x-hidden">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/lux-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="fixed inset-0 bg-black/60 -z-10"></div>

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="pt-24 px-10">
          {children}
        </main>

      </div>
    </CountryProvider>
  )
}
