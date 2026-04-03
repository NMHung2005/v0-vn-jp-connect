import { Suspense } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata = {
  title: "管理ダッシュボード | VN-JP Connect",
  description: "VN-JP Connectプラットフォームを管理・監視",
}

function SidebarFallback() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<SidebarFallback />}>
        <AdminSidebar />
      </Suspense>
      <main className="pl-64">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
