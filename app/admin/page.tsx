"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { OverviewTab } from "@/components/admin/tabs/overview-tab"
import { UsersTab } from "@/components/admin/tabs/users-tab"
import { ReportsTab } from "@/components/admin/tabs/reports-tab"
import { AnalyticsTab } from "@/components/admin/tabs/analytics-tab"
import { SettingsTab } from "@/components/admin/tabs/settings-tab"

export type AdminTab = "overview" | "users" | "reports" | "analytics" | "settings"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const [timeRange, setTimeRange] = useState("7d")

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab timeRange={timeRange} />
      case "users":
        return <UsersTab />
      case "reports":
        return <ReportsTab />
      case "analytics":
        return <AnalyticsTab timeRange={timeRange} />
      case "settings":
        return <SettingsTab />
      default:
        return <OverviewTab timeRange={timeRange} />
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader 
          activeTab={activeTab} 
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderTab()}
        </main>
      </div>
    </div>
  )
}
