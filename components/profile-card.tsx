"use client"

import { MapPin, ThumbsUp, BadgeCheck, X, Heart, Sparkles } from "lucide-react"
import Image from "next/image"

interface ProfileCardProps {
  profile: {
    id: number
    name: string
    age: number
    location: string
    distance: string
    positiveRating: number
    verified: boolean
    image: string
    bio: string
    languages: string[]
    interests: string[]
  }
  onLike: () => void
  onPass: () => void
  onSuperLike: () => void
}

export function ProfileCard({ profile, onLike, onPass, onSuperLike }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Main Card */}
      <div className="relative w-full max-w-md bg-card rounded-3xl shadow-xl overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Positive rating badge */}
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold">
            <ThumbsUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">{profile.positiveRating}%</span>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Profile info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
              {profile.verified && (
                <BadgeCheck className="w-6 h-6 text-primary fill-primary/20" />
              )}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
              <span>|</span>
              <span>{profile.distance}</span>
            </div>
          </div>
        </div>

        {/* Bio and details */}
        <div className="p-5 space-y-4">
          <p className="text-foreground leading-relaxed">{profile.bio}</p>

          {/* Languages */}
          <div className="flex items-center gap-2 flex-wrap">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={onPass}
          className="w-14 h-14 bg-card border-2 border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-destructive hover:text-destructive hover:scale-110 transition-all shadow-lg"
        >
          <X className="w-7 h-7" />
        </button>
        <button
          onClick={onLike}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-all shadow-lg shadow-primary/30"
        >
          <Heart className="w-8 h-8 fill-current" />
        </button>
        <button
          onClick={onSuperLike}
          className="w-14 h-14 bg-card border-2 border-border rounded-full flex items-center justify-center text-amber-500 hover:border-amber-500 hover:scale-110 transition-all shadow-lg"
        >
          <Sparkles className="w-7 h-7" />
        </button>
      </div>
    </div>
  )
}
