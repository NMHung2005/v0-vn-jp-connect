"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileInfo } from "@/components/profile/profile-info"
import { ProfileLanguages } from "@/components/profile/profile-languages"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileAbout } from "@/components/profile/profile-about"

const currentUser = {
  id: 1,
  name: "Nguyen Minh Tuan",
  username: "@minhtuan",
  age: 26,
  location: "Hanoi, Vietnam",
  joinedDate: "March 2024",
  verified: true,
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  coverImage: "/images/profile-cover.jpg",
  bio: "Japanese language enthusiast and software developer. Love exploring Japanese culture, watching anime, and connecting with people from different backgrounds. Looking for language exchange partners to improve my Japanese speaking skills.",
  occupation: "Software Developer",
  education: "Hanoi University of Science and Technology",
  languages: [
    { name: "Vietnamese", level: "Native", proficiency: 100 },
    { name: "Japanese", level: "N3", proficiency: 60 },
    { name: "English", level: "Advanced", proficiency: 85 },
  ],
  interests: ["Programming", "Anime", "Coffee", "Travel", "Photography", "Japanese Culture"],
  stats: {
    connections: 128,
    likes: 245,
    likeRatio: 87,
    exchanges: 42,
    events: 8,
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Profile Header with Cover Image */}
        <ProfileHeader user={currentUser} />

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          {/* Stats Cards */}
          <ProfileStats stats={currentUser.stats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - About & Languages */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileAbout user={currentUser} />
              <ProfileLanguages languages={currentUser.languages} />
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              <ProfileInfo user={currentUser} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
