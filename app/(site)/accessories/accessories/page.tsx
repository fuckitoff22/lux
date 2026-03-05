"use client"

import ProductGrid from "@/components/ProductGrid"

export const dynamic = "force-dynamic"

export default function AccessoriesPage() {
  return (
    <div className="pt-24">
      <ProductGrid category="accessories" />
    </div>
  )
}
