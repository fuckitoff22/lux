import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 p-6 space-y-6">

        <h2 className="text-2xl text-yellow-400 mb-6">
          Admin Panel
        </h2>

        <Link href="/admin" className="block hover:text-yellow-400">
          Dashboard
        </Link>

        <Link href="/admin/create" className="block hover:text-yellow-400">
          Create Product
        </Link>

        <Link href="/admin/manage" className="block hover:text-yellow-400">
          Manage Products
        </Link>

      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  )
}