import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | VN-JP Connect",
  description: "Admin dashboard for VN-JP Connect platform",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark">
      {children}
    </div>
  )
}
