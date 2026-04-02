"use client"

import { User, Languages, Heart, Image } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileTabsProps {
  currentTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "languages", label: "Language Skills", icon: Languages },
  { id: "interests", label: "Interests", icon: Heart },
  { id: "photos", label: "Photos", icon: Image },
]

export function ProfileTabs({ currentTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-1">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
