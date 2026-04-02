"use client"

import Link from "next/link"
import { Heart, MessageCircle, Calendar, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const t = useTranslations("Sidebar")
  const locale = useLocale()

  const menuItems = [
    { id: "discover", label: t("discover"), icon: Heart, href: "/home" },
    { id: "messages", label: t("messages"), icon: MessageCircle, badge: 3, href: "/home/messages" },
    { id: "events", label: t("events"), icon: Calendar, href: "/home/events" },
    { id: "profile", label: t("profile"), icon: User, href: "/home/profile" },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground tracking-tight">
            Connect VN-JP
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <Link
              key={item.id}
              href={`/${locale}${item.href}`}
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
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-border space-y-1">
        <Link 
          href={`/${locale}/`}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t("logout")}</span>
        </Link>
      </div>
    </aside>
  )
}
