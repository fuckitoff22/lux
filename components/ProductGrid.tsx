export const dynamic = "force-dynamic"
"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useCountry } from "@/hooks/useCountry"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  discount: number
  final_price: number
  image: string
  category: string
  status: string
}

export default function ProductGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const { currency, rate } = useCountry()

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("status", "active")

    if (data) setProducts(data)
  }

  const getImageUrl = (fileName: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`
  }

  const formatPrice = (price: number) => {
    const converted = price * rate

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(converted)
  }

  return (
    <div className="grid md:grid-cols-3 gap-10 mt-14">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-105 transition duration-500"
        >
          <div className="relative h-72 w-full rounded-2xl overflow-hidden">
            <Image
              src={getImageUrl(product.image)}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{product.brand}</p>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-yellow-400 text-2xl font-bold">
                {formatPrice(product.final_price)}
              </span>

              {product.discount > 0 && (
                <>
                  <span className="line-through text-gray-500 text-sm">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-green-400 text-xs font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}


