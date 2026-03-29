"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileContent } from "@/components/profile/profile-content"

const currentUser = {
  id: 1,
  name: "Nguyen Van Minh",
  email: "minh.nguyen@email.com",
  age: 26,
  gender: "Male",
  nationality: "Vietnamese",
  location: "Hanoi, Vietnam",
  bio: "Passionate about Japanese culture and language. Looking for friends to practice Japanese and share cultural experiences!",
  occupation: "Software Developer",
  education: "Hanoi University of Science and Technology",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=400&fit=crop",
  verified: true,
  positiveRating: 94,
  connections: 128,
  joinDate: "2024-03-15",
  languages: [
    { language: "Vietnamese", level: "Native", certificate: null },
    { language: "Japanese", level: "N3", certificate: "JLPT N3" },
    { language: "English", level: "Fluent", certificate: "IELTS 7.0" },
  ],
  interests: ["Language Learning", "Anime", "Technology", "Travel", "Photography", "Coffee", "Music", "Cooking"],
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
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState(currentUser)

  const handleUpdateProfile = (updates: Partial<typeof currentUser>) => {
    setUserData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your personal information</p>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
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
