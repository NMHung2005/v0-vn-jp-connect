"use client"

import { BadgeCheck, MapPin, Calendar, ArrowLeft, MoreVertical, ThumbsUp, Circle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Flag, ShieldOff, Share2 } from "lucide-react"

interface UserProfileHeaderProps {
  user: {
    name: string
    username: string
    age: number
    location: string
    joinedDate: string
    verified: boolean
    avatar: string
    coverImage: string
    isOnline?: boolean
    lastActive?: string
    positiveRating?: number
  }
  onBack: () => void
  onReport: () => void
  onBlock: () => void
}

export function UserProfileHeader({ user, onBack, onReport, onBlock }: UserProfileHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${user.name}'s Profile`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <Image
          src={user.coverImage}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background/80" />
        
        {/* Top Navigation */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            onClick={onBack}
            className="bg-card/90 backdrop-blur-sm hover:bg-card"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="bg-card/90 backdrop-blur-sm hover:bg-card"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onReport} className="text-amber-600 focus:text-amber-600">
                <Flag className="w-4 h-4 mr-2" />
                Report User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBlock} variant="destructive">
                <ShieldOff className="w-4 h-4 mr-2" />
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Profile Info Bar */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-12">
            {/* Avatar with online indicator */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-3 border-background" />
              )}
            </div>

            {/* Name and Meta */}
            <div className="text-center sm:text-left pb-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold text-foreground">{user.name}, {user.age}</h1>
                {user.verified && (
                  <BadgeCheck className="w-6 h-6 text-primary fill-primary/20" />
                )}
              </div>
              <p className="text-muted-foreground">{user.username}</p>
              
              {/* Online Status & Rating */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                {user.isOnline ? (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                    <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
                    Online
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                )}
                {user.positiveRating && (
                  <span className="flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {user.positiveRating}%
                  </span>
                )}
              </div>

              {/* Location & Join Date */}
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
