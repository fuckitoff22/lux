"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useCountry } from "@/hooks/useCountry"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  discount: number
  final_price: number
  images: string[]
  description: string
  affiliate_link: string
  category: string
}

export default function ProductPage() {
  const { id } = useParams()
  const { currency, rate } = useCountry()

  const [product, setProduct] = useState<Product | null>(null)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [activeImg, setActiveImg] = useState(0)

  // Fetch product
  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (data) setProduct(data)
    }

    fetchProduct()

    // Increase traffic
    const increaseTraffic = async () => {
      await supabase.rpc("increment_traffic", { product_id: id })
    }

    increaseTraffic()
  }, [id])

  // Fetch suggestions
  useEffect(() => {
    if (!product) return

    const fetchSuggestions = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category)
        .neq("id", product.id)
        .limit(4)

      if (data) setSuggestions(data)
    }

    fetchSuggestions()
  }, [product])

  const getImageUrl = (fileName: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`
}

  // 🔥 Correct currency formatting (instant update)
  const formatPrice = (price: number) => {
    const converted = price * rate

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(converted)
  }

  const nextImage = () => {
    if (!product?.images) return
    setActiveImg((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!product?.images) return
    setActiveImg((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  if (!product) return null

  return (
    <div className="px-10 py-20 text-white">

      <div className="grid md:grid-cols-2 gap-16">

        {/* IMAGE SECTION */}
        <div
          className="relative group"
          onMouseEnter={nextImage}
        >
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
            <Image
              src={getImageUrl(product.images?.[activeImg] || product.images?.[0])}
              alt={product.name}
              fill
              className="object-cover transition duration-700 ease-in-out group-hover:scale-105"
            />

            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              ◀
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              ▶
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {product.images?.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImg(index)}
                className={`relative h-20 w-20 rounded-lg overflow-hidden cursor-pointer border ${
                  activeImg === index
                    ? "border-yellow-500"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-400 mt-2">{product.brand}</p>

          <div className="flex items-center gap-4 mt-6">
            <span className="text-3xl text-yellow-500 font-bold">
              {formatPrice(product.final_price)}
            </span>

            {product.discount > 0 && (
              <>
                <span className="line-through text-gray-500">
                  {formatPrice(product.price)}
                </span>
                <span className="text-green-400 font-semibold">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={async () => {
              await supabase.rpc("increment_clicks", { product_id: product.id })
              window.open(product.affiliate_link, "_blank")
            }}
            className="inline-block mt-8 bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">
          You may also like
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="bg-white/5 p-4 rounded-xl hover:scale-105 transition"
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={getImageUrl(item.images?.[0])}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mt-3 font-semibold">{item.name}</p>

              <span className="text-yellow-500 font-bold">
                {formatPrice(item.final_price)}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}





