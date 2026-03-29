"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfileCard } from "@/components/profile-card"
import { FilterPanel } from "@/components/filter-panel"

const sampleProfiles = [
  {
    id: 1,
    name: "Yuki Tanaka",
    age: 28,
    location: "Tokyo, Japan",
    distance: "Living in Hanoi",
    positiveRating: 96,
    verified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
    bio: "Interested in Vietnamese culture. Let's learn together! I love Vietnamese food and want to practice my Vietnamese skills.",
    languages: ["Japanese", "English", "Vietnamese (Basic)"],
    interests: ["Language Learning", "Yoga", "Coffee", "Literature"],
  },
  {
    id: 2,
    name: "Minh Anh",
    age: 25,
    location: "Hanoi, Vietnam",
    distance: "5 km away",
    positiveRating: 92,
    verified: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
    bio: "Japanese language student (N3). Looking for language exchange partners and cultural experiences. Love anime and cooking!",
    languages: ["Vietnamese", "Japanese (N3)", "English"],
    interests: ["Anime", "Cooking", "Photography", "Travel"],
  },
  {
    id: 3,
    name: "Kenji Yamamoto",
    age: 32,
    location: "Osaka, Japan",
    distance: "Living in HCMC",
    positiveRating: 89,
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    bio: "Software engineer working in Vietnam. Passionate about Vietnamese culture and history. Let's grab coffee and practice languages!",
    languages: ["Japanese", "English", "Vietnamese (Intermediate)"],
    interests: ["Technology", "Coffee", "History", "Gaming"],
  },
  {
    id: 4,
    name: "Linh Nguyen",
    age: 27,
    location: "Hanoi, Vietnam",
    distance: "3 km away",
    positiveRating: 94,
    verified: true,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face",
    bio: "Japanese studies graduate. Working as a translator. Looking to make Japanese friends and improve my speaking skills.",
    languages: ["Vietnamese", "Japanese (N2)", "English"],
    interests: ["Literature", "Music", "Tea Ceremony", "Yoga"],
  },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    ageRange: [18, 50] as [number, number],
    distance: 100,
    nationality: ["VN", "JP"],
    verifiedOnly: false,
    interests: [] as string[],
  })

  const currentProfile = sampleProfiles[currentProfileIndex]

  const handleNext = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % sampleProfiles.length)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Discover</h1>
            <p className="text-sm text-muted-foreground">Find new connections</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium">Filters</span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Profile Area */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <ProfileCard
              profile={currentProfile}
              onLike={handleNext}
              onPass={handleNext}
              onSuperLike={handleNext}
            />
          </div>

          {/* Filter Panel */}
          <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
      </main>
    </div>
  )
}
