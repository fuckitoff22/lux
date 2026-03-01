"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen text-white relative z-10">

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl font-extrabold tracking-widest text-yellow-500 drop-shadow-lg"
        >
          LUX
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-32 h-[2px] bg-yellow-500 my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="max-w-2xl text-gray-300 text-lg leading-relaxed"
        >
          A curated luxury marketplace connecting you to elite global brands.
          Precision. Craftsmanship. Timeless elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Link
            href="/shoes"
            className="mt-10 inline-block bg-yellow-500 text-black px-10 py-3 rounded-full font-semibold tracking-wide hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Explore Collection
          </Link>
        </motion.div>

      </section>

      {/* PREMIUM GLASS SECTION */}
      <section className="py-32 px-6">

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
            Experience Global Luxury
          </h2>

          <p className="text-gray-300 leading-relaxed text-center">
            From premium footwear and handcrafted watches to exclusive fashion,
            LUX brings you handpicked collections from across the world.
            Elevate your lifestyle with curated excellence.
          </p>
        </motion.div>

      </section>

    </div>
  )
}
