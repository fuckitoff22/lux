"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "shoes",
    subcategory: "",
    price: "",
    discount: "",
    affiliate_link: "",
  })

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    const fileName = `${Date.now()}-${imageFile.name}`

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile)

    if (error) {
      alert(error.message)
      return null
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const imageUrl = await uploadImage()
    if (!imageUrl) return

    const payload = {
      ...form,
      price: Number(form.price),
      discount: Number(form.discount),
      image: imageUrl,
    }

    if (editingId) {
      await supabase.from("products").update(payload).eq("id", editingId)
      setEditingId(null)
    } else {
      await supabase.from("products").insert([payload])
    }

    setForm({
      name: "",
      brand: "",
      category: "shoes",
      subcategory: "",
      price: "",
      discount: "",
      affiliate_link: "",
    })

    setImageFile(null)
    fetchProducts()
  }

  const editProduct = (product: any) => {
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      subcategory: product.subcategory || "",
      price: product.price,
      discount: product.discount,
      affiliate_link: product.affiliate_link,
    })
    setEditingId(product.id)
  }

  return (
    <div className="min-h-screen px-10 py-20">

      <h1 className="text-4xl text-yellow-500 mb-10">
        Manage Products
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl grid md:grid-cols-2 gap-4 mb-10"
      >
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="p-3 bg-black/50 rounded" required />

        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="p-3 bg-black/50 rounded" />

        {/* CATEGORY */}
        <select name="category" value={form.category} onChange={handleChange} className="p-3 bg-black/50 rounded">
          <option value="shoes">Shoes</option>
          <option value="clothes">Clothes</option>
          <option value="perfume">Perfume</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="accessories">Accessories</option>
        </select>

        {/* SUBCATEGORY ONLY FOR ACCESSORIES */}
        {form.category === "accessories" && (
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            className="p-3 bg-black/50 rounded"
            required
          >
            <option value="">Select Subcategory</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="accessories">Other Accessories</option>
          </select>
        )}

        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-3 bg-black/50 rounded" required />

        <input type="number" name="discount" placeholder="Discount %" value={form.discount} onChange={handleChange} className="p-3 bg-black/50 rounded" />

        <input name="affiliate_link" placeholder="Affiliate Link" value={form.affiliate_link} onChange={handleChange} className="p-3 bg-black/50 rounded md:col-span-2" required />

        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="md:col-span-2" required />

        <button className="bg-yellow-500 text-black p-3 rounded md:col-span-2">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white/10 p-4 rounded-2xl">
            <img src={product.image} className="h-40 w-full object-cover rounded mb-3" />
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            {product.subcategory && <p>{product.subcategory}</p>}
            <div className="flex gap-3 mt-3">
              <button onClick={() => editProduct(product)} className="text-blue-400 text-sm">Edit</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}