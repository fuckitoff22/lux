"use client"

import Link from "next/link"
import { useCountry } from "@/hooks/useCountry"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const { country, setCountry } = useCountry()
  const router = useRouter()

  const [open, setOpen] = useState(false)

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

  const handleChange = (value: string) => {
    setCountry(value)
    router.refresh()
  }

  return (
    <div className="fixed top-0 w-full bg-black/60 backdrop-blur-lg z-50">

      <div className="flex justify-between items-center px-4 md:px-10 py-4 text-white">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* HAMBURGER (mobile only) */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="text-3xl font-bold text-yellow-500 tracking-widest"
          >
            LUX
          </Link>

        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-yellow-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* COUNTRY SELECTOR (DESKTOP ONLY) */}
        <select
          value={country}
          onChange={(e) => handleChange(e.target.value)}
          className="hidden md:block bg-black border border-yellow-500 px-3 py-1 rounded text-sm"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black/70 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* CLOSE BUTTON */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col gap-6 px-6 text-lg">

          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10">

            {/* MOBILE COUNTRY SELECTOR */}
            <select
              value={country}
              onChange={(e) => handleChange(e.target.value)}
              className="bg-black border border-yellow-500 px-3 py-2 rounded w-full"
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

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
        ></div>
      )}

    </div>
  )
}
