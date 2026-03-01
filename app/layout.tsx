import "./globals.css"
import { CountryProvider } from "@/hooks/useCountry"
import Navbar from "@/components/Navbar"

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

        {/* 🔥 Background Video */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/lux-bg.mp4" type="video/mp4" />
          </video>

          {/* Frost Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <CountryProvider>
          <Navbar />
          <main className="pt-24 relative z-10">
            {children}
          </main>
        </CountryProvider>

      </body>
    </html>
  )
}
