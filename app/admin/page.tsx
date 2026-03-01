"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface Product {
  id: string
  name: string
  traffic: number
  clicks: number
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalTraffic, setTotalTraffic] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, traffic, clicks")

    if (!error && data) {
      setProducts(data)
      setTotalProducts(data.length)

      const trafficSum = data.reduce(
        (sum, item) => sum + (item.traffic || 0),
        0
      )

      const clickSum = data.reduce(
        (sum, item) => sum + (item.clicks || 0),
        0
      )

      setTotalTraffic(trafficSum)
      setTotalClicks(clickSum)
    }
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white/5 p-6 rounded-xl">
          <p>Total Products</p>
          <h2 className="text-3xl font-bold">{totalProducts}</h2>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <p>Total Traffic</p>
          <h2 className="text-3xl font-bold">{totalTraffic}</h2>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <p>Total Affiliate Clicks</p>
          <h2 className="text-3xl font-bold">{totalClicks}</h2>
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white/5 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">
          Product Performance
        </h2>

        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between py-3 border-b border-white/10"
          >
            <span>{product.name}</span>

            <div className="flex gap-6 text-sm">
              <span>👁 {product.traffic || 0}</span>
              <span>🔗 {product.clicks || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}