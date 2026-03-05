"use client"

import ProductGrid from "@/components/ProductGrid"

export default function ElectronicsPage() {
  return (
    <div className="pt-24 px-6 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-500">
        Electronics
      </h1>

      <ProductGrid category="electronics" />
    </div>
  )
}
