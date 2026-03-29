"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, CheckCircle2, ThumbsUp, X, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const profiles = [
  {
    id: 1,
    name: "Yuki Tanaka",
    age: 28,
    location: "Tokyo, Japan",
    distance: "Living in Hanoi",
    positiveRating: 96,
    verified: true,
    bio: "Interested in Vietnamese culture. Let's learn together! I love Vietnamese food!",
    languages: ["Japanese", "English", "Vietnamese (Basic)"],
    interests: ["Language Learning", "Yoga", "Coffee", "Literature"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
    nationality: "JP",
  },
  {
    id: 2,
    name: "Minh Anh",
    age: 25,
    location: "Hanoi, Vietnam",
    distance: "5 km away",
    positiveRating: 92,
    verified: true,
    bio: "Japanese language student (N3). Looking for language exchange partners and cultural experiences.",
    languages: ["Vietnamese", "Japanese (N3)", "English"],
    interests: ["Anime", "Cooking", "Photography", "Travel"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
    nationality: "VN",
  },
]

export function ProfilePreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const profile = profiles[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Discover amazing people
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse profiles, find people who share your interests, and start meaningful conversations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-md w-full">
            <div className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
              <div className="relative aspect-[4/5]">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                    <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {profile.positiveRating}%
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">
                      {profile.name}, {profile.age}
                    </h3>
                    {profile.verified && (
                      <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{profile.location}</span>
                    <span className="text-white/50 mx-1">|</span>
                    <span className="text-sm">{profile.distance}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="text-xs border-primary/30 text-primary"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-5 border-t border-border">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-full border-2"
                  onClick={handleNext}
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </Button>
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full"
                  onClick={handleNext}
                >
                  <Heart className="w-7 h-7" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 rounded-full border-2 border-amber-400 text-amber-500 hover:bg-amber-50"
                  onClick={handleNext}
                >
                  <Star className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                The Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Redefining how two distinct cultures collaborate. Connect VN-JP serves as the digital bridge for professionals, students, and visionaries seeking authentic partnerships between Vietnam and Japan. We focus on clarity, efficiency, and cultural synergy.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Direct Connection
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No intermediaries. No barriers. Just direct human potential scaled through technology. Connect with verified users, see their positive rating percentage, and build meaningful relationships.
              </p>
            </div>

            <div className="pt-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Connecting Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
