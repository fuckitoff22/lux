import ProductGrid from "@/components/ProductGrid"

export default function Page() {
  return (
    <main className="min-h-screen pt-32 px-6">
      <h1 className="text-4xl md:text-5xl font-semibold text-white mb-10">
        Accessories
      </h1>

      <ProductGrid category="accessories" />
    </main>
  )
}
