"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileContent } from "@/components/profile/profile-content"
import { useTranslations } from "next-intl"

const currentUser = {
  id: 1,
  name: "Nguyen Van Minh",
  email: "minh.nguyen@email.com",
  age: 26,
  gender: "男性",
  nationality: "ベトナム",
  location: "ハノイ市",
  bio: "日本の文化と言語に情熱を持っています。日本語を練習し、文化的な経験を共有できる友達を探しています！",
  occupation: "ソフトウェア開発者",
  education: "ハノイ工科大学",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=400&fit=crop",
  verified: true,
  positiveRating: 94,
  connections: 128,
  joinDate: "2024-03-15",
  languages: [
    { language: "ベトナム語", level: "母語", certificate: null },
    { language: "日本語", level: "N3", certificate: "JLPT N3" },
    { language: "英語", level: "上級", certificate: "IELTS 7.0" },
  ],
  interests: ["言語交換", "アニメ", "テクノロジー", "旅行", "写真", "コーヒー", "音楽", "料理"],
  photos: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  ],
  socialLinks: {
    instagram: "minh_nguyen",
    facebook: "minh.nguyen",
    line: "minh_line",
  },
  preferences: {
    showAge: true,
    showLocation: true,
    emailNotifications: true,
    pushNotifications: true,
    profileVisibility: "public",
  },
}

export default function ProfilePage() {
  const t = useTranslations("Profile")
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState(currentUser)

  const handleUpdateProfile = (updates: Partial<typeof currentUser>) => {
    setUserData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="sticky top-0 h-screen">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <ProfileHeader user={userData} onUpdate={handleUpdateProfile} />

            {/* Profile Content - All info in one view */}
            <ProfileContent user={userData} onUpdate={handleUpdateProfile} />
          </div>
        </div>
      </main>
    </div>
  )
}
