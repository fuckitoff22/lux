export const dynamic = "force-dynamic"

import ProductGrid from "@/components/ProductGrid"

export default function AccessoriesPage() {
  return (
    <div className="pt-24">
      <ProductGrid category="accessories" />
    </div>
  )
}
