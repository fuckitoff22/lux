export const dynamic = "force-dynamic"
"use client"
import ProductGrid from "@/components/ProductGrid"

export default function watchesPage() {
  return (
    <div className="min-h-screen px-10 py-20">
      <h1 className="text-4xl text-yellow-400 mb-10">
        Watches
      </h1>

      <ProductGrid category="watches" />
    </div>
  )

}

