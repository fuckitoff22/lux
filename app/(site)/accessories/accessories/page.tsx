"use client"

import dynamic from "next/dynamic"

const ProductGrid = dynamic(() => import("@/components/ProductGrid"), {
  ssr: false,
})

export default function AccessoriesPage() {
  return (
    <div className="pt-24">
      <ProductGrid category="accessories" />
    </div>
  )
}
