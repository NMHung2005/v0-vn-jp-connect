"use client"

import { Heart, Users, MessageCircle, Calendar, ThumbsUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ProfileStatsProps {
  stats: {
    connections: number
    likes: number
    likeRatio: number
    exchanges: number
    events: number
  }
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      label: "Connections",
      value: stats.connections,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Likes Received",
      value: stats.likes,
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      label: "Like Ratio",
      value: `${stats.likeRatio}%`,
      icon: ThumbsUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Exchanges",
      value: stats.exchanges,
      icon: MessageCircle,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Events Joined",
      value: stats.events,
      icon: Calendar,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 -mt-4 relative z-10">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="p-4 text-center bg-card hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 mx-auto rounded-full ${item.bgColor} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
          </Card>
        )
      })}
    </div>
  )
}
