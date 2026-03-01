"use client"

import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="h-screen flex items-center justify-center text-white relative">
      <div className="text-center z-10">
        <h1 className="text-6xl tracking-widest font-light">LUX</h1>
        <p className="mt-4 text-gray-400 text-lg">
          Elevate Your Lifestyle
        </p>

        <button
          onClick={() => router.push("/shoes")}
          className="mt-8 bg-white text-black px-8 py-3 rounded-md hover:scale-105 transition"
        >
          Explore Now
        </button>
      </div>
    </div>
  )
}