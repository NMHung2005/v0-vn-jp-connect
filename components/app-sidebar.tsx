"use client"

import { Heart, MessageCircle, Calendar, User, Settings, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: "discover", label: "Khám phá", icon: Heart },
  { id: "messages", label: "Tin nhắn", icon: MessageCircle, badge: 3 },
  { id: "events", label: "Sự kiện", icon: Calendar },
  { id: "profile", label: "Cá nhân", icon: User },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xl font-bold">
            <span className="text-foreground">VN</span>
            <span className="text-primary">❤️</span>
            <span className="text-foreground">JP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-primary font-semibold text-sm">VietJapan</span>
            <span className="text-muted-foreground text-xs">Connect</span>
          </div>
          <div className="ml-auto relative">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "ml-auto w-5 h-5 rounded-full text-xs flex items-center justify-center",
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary text-primary-foreground"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-border space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Sun className="w-5 h-5" />
          <span className="font-medium">Chế độ sáng</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Cài đặt</span>
        </button>
      </div>
    </aside>
  )
}
