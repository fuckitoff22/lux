export const dynamic = "force-dynamic"

import ProductGrid from "@/components/ProductGrid"

export default function Page() {
  return (
    <div className="pt-24">
      <ProductGrid category="furniture" />
    </div>
  )
}
