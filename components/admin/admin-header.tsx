"use client"

import { Bell, Calendar, ChevronDown, Search } from "lucide-react"
import type { AdminTab } from "@/app/admin/page"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  activeTab: AdminTab
  timeRange: string
  onTimeRangeChange: (range: string) => void
}

const tabTitles: Record<AdminTab, string> = {
  overview: "Overview",
  users: "User Management",
  reports: "Reports",
  analytics: "Analytics",
  settings: "Settings",
}

const timeRanges = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
]

export function AdminHeader({ activeTab, timeRange, onTimeRangeChange }: AdminHeaderProps) {
  const currentRange = timeRanges.find(r => r.value === timeRange)

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{tabTitles[activeTab]}</h1>
        <p className="text-sm text-muted-foreground">
          Monitor and manage your platform
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-64"
          />
        </div>

        {/* Time Range Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors">
              <Calendar className="w-4 h-4" />
              {currentRange?.label}
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => onTimeRangeChange(range.value)}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
            A
          </div>
        </div>
      </div>
    </header>
  )
}
