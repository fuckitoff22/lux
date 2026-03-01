"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ManageProducts() {
  const [products, setProducts] = useState<any[]>([])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")

    if (data) setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  const toggleStatus = async (product: any) => {
    const newStatus =
      product.status === "active"
        ? "inactive"
        : "active"

    await supabase
      .from("products")
      .update({ status: newStatus })
      .eq("id", product.id)

    fetchProducts()
  }

  return (
    <div>
      <h1 className="text-4xl text-yellow-400 mb-10">
        Manage Products
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-800 p-4 rounded-xl"
          >
            <img
              src={product.image}
              className="h-40 w-full object-cover rounded mb-3"
            />

            <h2 className="text-lg">{product.name}</h2>
            <p className="text-sm text-gray-400">
              {product.category}
            </p>

            <p className="mt-2">
              Status:
              <span
                className={
                  product.status === "active"
                    ? "text-green-400 ml-2"
                    : "text-red-400 ml-2"
                }
              >
                {product.status}
              </span>
            </p>

            <div className="flex gap-4 mt-4">

              <button
                onClick={() => toggleStatus(product)}
                className="text-yellow-400"
              >
                {product.status === "active"
                  ? "Deactivate"
                  : "Activate"}
              </button>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                className="text-red-400"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}