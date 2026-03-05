"use client"

import dynamic from "next/dynamic"

const ProductGrid = dynamic(() => import("@/components/ProductGrid"), {
  ssr: false,
})

export default function ElectronicsPage() {
  return (
    <div className="pt-24">
      <ProductGrid category="electronics" />
    </div>
  )
}
