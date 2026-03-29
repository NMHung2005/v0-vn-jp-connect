"use client"

import { Heart, MessageCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface UserProfileActionsProps {
  user: {
    id: number
    name: string
  }
}

export function UserProfileActions({ user }: UserProfileActionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleConnect = () => {
    setIsConnected(!isConnected)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6 border-b border-border">
      {/* Like Button */}
      <Button
        variant={isLiked ? "default" : "outline"}
        size="lg"
        onClick={handleLike}
        className={cn(
          "gap-2 min-w-[120px]",
          isLiked && "bg-primary hover:bg-primary/90"
        )}
      >
        <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
        {isLiked ? "Liked" : "Like"}
      </Button>

      {/* Message Button */}
      <Button
        variant="outline"
        size="lg"
        className="gap-2 min-w-[120px]"
      >
        <MessageCircle className="w-5 h-5" />
        Message
      </Button>

      {/* Connect Button */}
      <Button
        variant={isConnected ? "secondary" : "outline"}
        size="lg"
        onClick={handleConnect}
        className={cn(
          "gap-2 min-w-[120px]",
          isConnected && "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20"
        )}
      >
        <UserPlus className="w-5 h-5" />
        {isConnected ? "Connected" : "Connect"}
      </Button>
    </div>
  )
}
