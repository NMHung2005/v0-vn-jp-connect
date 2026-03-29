"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, BadgeCheck, MapPin, Briefcase, Calendar, Users, ThumbsUp, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ProfileHeaderProps {
  user: {
    name: string
    avatar: string
    coverImage: string
    bio: string
    location: string
    occupation: string
    verified: boolean
    positiveRating: number
    connections: number
    joinDate: string
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

export function ProfileHeader({ user, onUpdate }: ProfileHeaderProps) {
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [editedBio, setEditedBio] = useState(user.bio)

  const handleSaveBio = () => {
    onUpdate({ bio: editedBio })
    setIsEditingBio(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-primary/20 to-accent">
        <Image
          src={user.coverImage}
          alt="Cover"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
        <button className="absolute bottom-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
          <Camera className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <div className="relative w-32 h-32 rounded-full border-4 border-card overflow-hidden bg-muted">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-20">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                {user.verified && (
                  <BadgeCheck className="w-6 h-6 text-primary fill-primary/20" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {user.occupation}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDate(user.joinDate)}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{user.positiveRating}%</p>
                <p className="text-xs text-muted-foreground">Positive Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{user.connections}</p>
                <p className="text-xs text-muted-foreground">Connections</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">About</h3>
              <button
                onClick={() => setIsEditingBio(true)}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Edit Bio Dialog */}
      <Dialog open={isEditingBio} onOpenChange={setIsEditingBio}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">About You</Label>
              <Textarea
                id="bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                placeholder="Tell others about yourself..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{editedBio.length}/500 characters</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingBio(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBio}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
