"use client"

import { MapPin, ThumbsUp, X, Heart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
}

export function ProfileCard({ profile, onLike, onPass }: ProfileCardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Horizontal Rectangle Card */}
      <div className="flex flex-col md:flex-row w-full bg-card rounded-[2.5rem] shadow-2xl overflow-hidden border border-border min-h-[450px]">
        {/* Left Side: Image (Proper Rectangle) */}
        <div className="relative w-full md:w-[350px] lg:w-[400px] shrink-0">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Rating Badge */}
          <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold shadow-sm">
            <ThumbsUp className="w-4 h-4 text-primary" />
            <span className="text-foreground">{profile.positiveRating}%</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
          <div className="absolute bottom-6 left-6 text-white md:hidden">
            <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
          </div>
        </div>

        {/* Right Side: Information (Spreading out to fill width) */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-10">
            {/* Header Section */}
            <div className="hidden md:flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-extrabold text-foreground tracking-tight">{profile.name}, {profile.age}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-lg font-medium">{profile.location} • {profile.distance}</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">The Vibe</h3>
              <p className="text-xl text-foreground leading-relaxed font-medium italic">
                "{profile.bio}"
              </p>
            </div>

            {/* Tags Section (Grid for horizontal spread) */}
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Speaks</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1.5 bg-muted/80 text-foreground rounded-lg text-sm font-semibold">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Into</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1.5 bg-primary/5 text-primary rounded-lg text-sm font-semibold border border-primary/10">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={onPass}
              className="px-6 py-4 bg-muted/50 hover:bg-destructive/10 hover:text-destructive text-foreground rounded-2xl flex items-center justify-center gap-2 font-bold transition-all border border-transparent hover:border-destructive/20"
            >
              <X className="w-5 h-5" />
              <span>Skip</span>
            </button>
            <Link
              href={`/home/user/${profile.id}`}
              className="px-6 py-4 bg-muted hover:bg-muted/80 text-foreground rounded-2xl flex items-center justify-center gap-2 font-bold transition-all border border-border"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <button
              onClick={onLike}
              className="flex-1 py-4 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center gap-3 font-bold hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
            >
              <Heart className="w-6 h-6 fill-current" />
              <span>Connect with {profile.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

