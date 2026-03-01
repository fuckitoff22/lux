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
  subcategory: string
  status: string
}

export default function ProductGrid({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const { currency, rate, country } = useCountry()

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

  return (
    <div className="grid md:grid-cols-3 gap-10 mt-14">
      {products.map((product) => {

        // 🔥 IMPORTANT: derive values INSIDE render
        const convertedFinal = product.final_price * rate
        const convertedOriginal = product.price * rate

        const formattedFinal = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
        }).format(convertedFinal)

        const formattedOriginal = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
        }).format(convertedOriginal)

        return (
          <Link
            key={`${product.id}-${country}`}
            href={`/product/${product.id}`}
            className="group relative rounded-3xl overflow-hidden transition duration-500"
          >
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">

              <div className="relative h-72 w-full rounded-2xl overflow-hidden">
                <Image
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {product.brand}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-yellow-400 text-2xl font-bold">
                    {formattedFinal}
                  </span>

                  {product.discount > 0 && (
                    <>
                      <span className="line-through text-gray-500 text-sm">
                        {formattedOriginal}
                      </span>

                      <span className="text-green-400 text-xs font-semibold">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

            </div>
          </Link>
        )
      })}
    </div>
  )
}
