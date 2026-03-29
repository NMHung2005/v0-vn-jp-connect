"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfileCard } from "@/components/profile-card"
import { FilterPanel } from "@/components/filter-panel"
import { SlidersHorizontal } from "lucide-react"

const sampleProfiles = [
  {
    id: 1,
    name: "Yuki Tanaka",
    age: 28,
    location: "Tokyo, Japan",
    distance: "1500 km",
    rating: 4.9,
    verified: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop&crop=face",
    bio: "ベトナムの文化に興味があります。一緒にベトナム語を勉強しましょう！！I love Vietnamese food!",
    languages: ["日本語", "English", "Tiếng Việt (cơ bản)"],
    interests: ["Học ngoại ngữ", "Yoga", "Cà phê", "Văn học"]
  },
  {
    id: 2,
    name: "Minh Anh",
    age: 24,
    location: "Hà Nội, Việt Nam",
    distance: "5 km",
    rating: 4.7,
    verified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop&crop=face",
    bio: "Đang học tiếng Nhật N3, muốn tìm bạn người Nhật để thực hành giao tiếp. 日本語を練習したいです！",
    languages: ["Tiếng Việt", "日本語 (N3)", "English"],
    interests: ["Anime", "Manga", "Âm nhạc", "Du lịch"]
  },
  {
    id: 3,
    name: "Kenji Yamamoto",
    age: 32,
    location: "Osaka, Japan",
    distance: "1800 km",
    rating: 4.8,
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&crop=face",
    bio: "ハノイで働いています。ベトナム語を勉強中です。週末はカフェでおしゃべりしましょう！",
    languages: ["日本語", "English", "Tiếng Việt (sơ cấp)"],
    interests: ["Cà phê", "Công nghệ", "Lập trình", "Thể thao"]
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("discover")
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    ageRange: [18, 50] as [number, number],
    distance: 100,
    nationality: ["VN", "JP"],
    verifiedOnly: false,
    interests: [] as string[]
  })

  const currentProfile = sampleProfiles[currentProfileIndex]

  const handleLike = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % sampleProfiles.length)
  }

  const handlePass = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % sampleProfiles.length)
  }

  const handleSuperLike = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % sampleProfiles.length)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Khám phá</h1>
            <p className="text-sm text-muted-foreground">Tìm kiếm kết nối mới</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Bộ lọc</span>
          </button>
        </header>

        {/* Content area */}
        <div className="flex-1 flex">
          {/* Profile cards */}
          <div className="flex-1 flex items-center justify-center p-6 bg-muted/30">
            <ProfileCard
              profile={currentProfile}
              onLike={handleLike}
              onPass={handlePass}
              onSuperLike={handleSuperLike}
            />
          </div>

          {/* Filter panel */}
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
