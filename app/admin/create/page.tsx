"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function CreateProduct() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [affiliateLink, setAffiliateLink] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)

  const finalPrice = price - (price * discount) / 100

  const uploadImages = async () => {
    if (!files) return []

    const uploadedFiles: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileName = `${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file)

      if (error) {
        console.error("Upload error:", error)
        alert("Image upload failed")
        return []
      }

      uploadedFiles.push(fileName)
    }

    return uploadedFiles
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const uploadedImages = await uploadImages()

    if (uploadedImages.length === 0) {
      alert("Upload images first")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        brand,
        category,
        subcategory,
        price,
        discount,
        final_price: finalPrice,
        affiliate_link: affiliateLink,
        description,
        images: uploadedImages,
        image: uploadedImages[0], // first image for grid
        status: "active"
      }
    ])

    if (error) {
      console.error(error)
      alert("Product creation failed")
    } else {
      alert("Product created successfully")
      router.push("/admin/manage")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-yellow-500 mb-8">
        Create Product
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl">
        <input
          placeholder="Product Name"
          className="p-3 bg-zinc-800 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Brand"
          className="p-3 bg-zinc-800 rounded"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <select
          className="p-3 bg-zinc-800 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="shoes">Shoes</option>
          <option value="watches">Watches</option>
          <option value="clothes">Clothes</option>
          <option value="perfume">Perfume</option>
          <option value="accessories">Accessories</option>
        </select>

        {category === "accessories" && (
          <select
            className="p-3 bg-zinc-800 rounded"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          >
            <option value="">Select Subcategory</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="accessories">Accessories</option>
          </select>
        )}

        <input
          type="number"
          placeholder="Price"
          className="p-3 bg-zinc-800 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />

        <input
          type="number"
          placeholder="Discount (%)"
          className="p-3 bg-zinc-800 rounded"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

        <textarea
          placeholder="Description"
          className="p-3 bg-zinc-800 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Affiliate Link"
          className="p-3 bg-zinc-800 rounded"
          value={affiliateLink}
          onChange={(e) => setAffiliateLink(e.target.value)}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          className="p-3 bg-zinc-800 rounded"
          onChange={(e) => setFiles(e.target.files)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black py-3 rounded font-semibold hover:bg-yellow-400 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  )
}