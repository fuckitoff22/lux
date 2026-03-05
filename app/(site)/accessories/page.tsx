"use client"
import Link from "next/link"
import { motion } from "framer-motion"

const subCategories = [
  {
    title: "Electronics",
    desc: "Luxury tech & premium gadgets",
    href: "/accessories/electronics",
  },
  {
    title: "Furniture",
    desc: "Modern aesthetic interior pieces",
    href: "/accessories/furniture",
  },
  {
    title: "Accessories",
    desc: "Minimal lifestyle essentials",
    href: "/accessories/accessories",
  },
]

export default function AccessoriesPage() {
  return (
    <div className="relative min-h-screen pt-32 px-6 md:px-20">

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] -z-10" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-light text-yellow-400 tracking-wide">
          Accessories
        </h1>
        <p className="text-zinc-400 mt-4 text-lg">
          Curated luxury essentials that elevate your lifestyle.
        </p>
      </motion.div>

      {/* Subcategory Grid */}
      <div className="grid md:grid-cols-3 gap-10">

        {subCategories.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link href={item.href}>
              <div className="group p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition duration-500 cursor-pointer relative overflow-hidden">

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                <h2 className="text-2xl text-white font-light tracking-wide group-hover:text-yellow-400 transition">
                  {item.title}
                </h2>

                <p className="text-zinc-400 mt-3 text-sm tracking-wide">
                  {item.desc}
                </p>

                <div className="mt-8 text-sm text-yellow-400 opacity-0 group-hover:opacity-100 transition">
                  Explore →
                </div>

              </div>
            </Link>
          </motion.div>
        ))}

      </div>
    </div>
  )

}


