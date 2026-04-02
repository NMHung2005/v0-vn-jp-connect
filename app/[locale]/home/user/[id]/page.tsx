"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { UserProfileView } from "@/components/profile/user-profile-view"
import { Button } from "@/components/ui/button"

// Sample user data - in a real app, this would come from an API
const sampleUsers = [
  {
    id: 1,
    name: "Tanaka Yuki",
    age: 24,
    gender: "女性",
    nationality: "日本",
    location: "東京、日本",
    bio: "ベトナム語の学習が大好きです。料理、旅行、ドラマ鑑賞を楽しんでいます。ベトナム語を練習しながら、日本文化も共有できる言語交換パートナーを探しています。",
    occupation: "マーケティング担当",
    education: "早稲田大学",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=400&fit=crop",
    verified: true,
    positiveRating: 98,
    connections: 256,
    joinDate: "2023-08-20",
    languages: [
      { language: "日本語", level: "母語", certificate: null },
      { language: "ベトナム語", level: "中級", certificate: null },
      { language: "英語", level: "流暢", certificate: "TOEIC 920" },
    ],
    interests: ["言語交換", "料理", "旅行", "ドラマ", "写真", "音楽"],
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    ],
  },
  {
    id: 2,
    name: "Sato Hiroshi",
    age: 28,
    gender: "男性",
    nationality: "日本",
    location: "大阪、日本",
    bio: "ベトナムのテック業界に興味があるソフトウェアエンジニアです。ゲーム、アニメ、新しい文化の探求が好きで、ベトナムの友人を作りたいです。",
    occupation: "ソフトウェアエンジニア",
    education: "京都大学",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=400&fit=crop",
    verified: true,
    positiveRating: 95,
    connections: 189,
    joinDate: "2023-11-15",
    languages: [
      { language: "日本語", level: "母語", certificate: null },
      { language: "ベトナム語", level: "初級", certificate: null },
      { language: "英語", level: "上級", certificate: "IELTS 7.5" },
    ],
    interests: ["ゲーム", "アニメ", "テクノロジー", "コーヒー", "サイクリング", "音楽"],
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    ],
  },
]

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("discover")

  const userId = Number(params.id)
  const user = sampleUsers.find((u) => u.id === userId) || sampleUsers[0]

  const handleMessage = () => {
    // Navigate to chat with this user
    router.push(`/home/chat?user=${user.id}`)
  }

  const handleReport = (report: { reason: string; description: string; evidence: File[] }) => {
    // Submit report to API
    console.log("Report submitted:", {
      userId: user.id,
      userName: user.name,
      ...report,
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="sticky top-0 h-screen">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">プロフィールを見る</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <UserProfileView
              user={user}
              onMessage={handleMessage}
              onReport={handleReport}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
