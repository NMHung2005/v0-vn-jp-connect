"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfileCard } from "@/components/profile-card"
import { FilterPanel } from "@/components/filter-panel"
import { useTranslations } from "next-intl"

const profileBaseData = [
  {
    id: 1,
    age: 28,
    positiveRating: 96,
    verified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
  },
  {
    id: 2,
    age: 25,
    positiveRating: 92,
    verified: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
  },
  {
    id: 3,
    age: 32,
    positiveRating: 89,
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
  },
  {
    id: 4,
    age: 27,
    positiveRating: 94,
    verified: true,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face",
  },
]

export default function HomePage() {
  const t = useTranslations("Home")
  const tRoot = useTranslations()
  
  const sampleProfiles = useMemo(() => {
    return profileBaseData.map((base, index) => {
      try {
        const translatedArray = tRoot.raw("SampleProfiles")
        
        // Ensure it's an array and not a missing message string
        if (Array.isArray(translatedArray) && translatedArray[index]) {
          return { ...base, ...translatedArray[index] }
        }
        
        // Fallback if missing
        return {
          ...base,
          name: tRoot(`SampleProfiles.${index}.name`) !== `SampleProfiles.${index}.name` ? tRoot(`SampleProfiles.${index}.name`) : "User",
          location: "Location",
          distance: "Distance",
          bio: "",
          languages: [],
          interests: []
        }
      } catch (e) {
        return {
          ...base,
          name: "User",
          location: "Unknown",
          distance: "Unknown",
          bio: "No bio available",
          languages: [],
          interests: []
        }
      }
    })
  }, [tRoot])

  const [activeTab, setActiveTab] = useState("discover")
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    ageRange: [18, 35] as [number, number],
    distance: 50,
    nationality: ["VN", "JP"],
    gender: "all",
    japaneseLevel: [] as string[],
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
            <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium text-sm">{t("filters")}</span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Profile Area */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-12 bg-muted/50 overflow-y-auto">
            <div className="w-full max-w-5xl my-auto">
              <ProfileCard
                profile={currentProfile}
                onLike={handleNext}
                onPass={handleNext}
              />
            </div>
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
