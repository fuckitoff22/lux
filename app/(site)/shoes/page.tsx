export const dynamic = "force-dynamic"
import ProductGrid from "@/components/ProductGrid"

export default function ShoesPage() {
  return (
    <div className="pt-40 px-10 text-white">
      <h1 className="text-4xl font-bold">Shoes</h1>

      <ProductGrid category="shoes" />
    </div>
  )

}
