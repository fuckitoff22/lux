"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ProductCard({ product, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      viewport={{ once: true }}
      className="
        bg-white/10
        backdrop-blur-lg
        border border-white/20
        rounded-2xl
        p-6
        transition
        hover:border-yellow-500
        hover:bg-white/15
      "
    >
      <div className="relative w-full h-60 mb-4 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold">
        {product.name}
      </h3>

      <p className="text-gray-300 text-sm mb-2">
        {product.brand}
      </p>

      <p className="text-yellow-500 font-bold text-lg mb-4">
        ₹{product.price}
      </p>

      <button className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:scale-105 transition">
        Buy Now
      </button>
    </motion.div>
  )
}