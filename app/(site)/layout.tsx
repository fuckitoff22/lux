"use client"
export const dynamic = "force-dynamic"
import Navbar from "@/components/Navbar"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/lux-bg.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/60 -z-10"></div>

      <Navbar />

      <main className="pt-24 px-10">
        {children}
      </main>

    </div>
  )
}




