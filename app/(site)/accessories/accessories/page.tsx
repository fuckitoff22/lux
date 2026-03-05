export const dynamic = "force-dynamic"

import dynamicImport from "next/dynamic"

const ProductGrid = dynamicImport(() => import("@/components/ProductGrid"), {
  ssr: false,
})

export default function Page() {
  return (
    <div className="pt-24">
      <ProductGrid category="accessories" />
    </div>
  )
}
