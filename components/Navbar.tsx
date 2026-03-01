"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCountry } from "@/hooks/useCountry"

export default function Navbar() {
  const router = useRouter()
  const { country, setCountry } = useCountry()

  const links = [
    { name: "Shoes", href: "/shoes" },
    { name: "Watches", href: "/watches" },
    { name: "Clothes", href: "/clothes" },
    { name: "Perfume", href: "/perfume" },
    { name: "Electronics", href: "/accessories/electronics" },
    { name: "Furniture", href: "/accessories/furniture" },
    { name: "Accessories", href: "/accessories/accessories" },
  ]

  const countries = [
    "India",
    "USA",
    "Germany",
    "UK",
    "Japan",
    "Canada",
    "Australia",
  ]

  const handleCountryChange = (value: string) => {
    setCountry(value)

    // 🔥 Force refresh but stay on same page
    setTimeout(() => {
      router.refresh()
    }, 50)
  }

  return (
    <div className="fixed top-0 w-full bg-black/60 backdrop-blur-lg z-50">
      <div className="flex justify-between items-center px-10 py-4 text-white">
        <Link
          href="/"
          className="text-3xl font-bold text-yellow-500 tracking-widest"
        >
          LUX
        </Link>

        <div className="flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-yellow-400 transition"
            >
              {link.name}
            </Link>
          ))}

          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="bg-black border border-yellow-500 px-3 py-1 rounded"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
