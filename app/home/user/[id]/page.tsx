"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { UserProfileHeader } from "@/components/profile/user-profile-header"
import { ProfileLanguages } from "@/components/profile/profile-languages"
import { ProfileAbout } from "@/components/profile/profile-about"
import { UserProfileActions } from "@/components/profile/user-profile-actions"
import { ReportBlockDialog } from "@/components/profile/report-block-dialog"

// Mock data - in real app, fetch from API based on id
const users: Record<string, typeof mockUser> = {
  "1": {
    id: 1,
    name: "Yuki Tanaka",
    username: "@yukitanaka",
    age: 24,
    location: "Tokyo, Japan",
    joinedDate: "January 2024",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    coverImage: "/images/profile-cover.jpg",
    bio: "Hi! I'm Yuki from Tokyo. I'm passionate about learning Vietnamese and would love to help you with Japanese! I enjoy cooking, hiking, and watching K-dramas. Let's practice together!",
    occupation: "Graphic Designer",
    education: "Tokyo University of the Arts",
    languages: [
      { name: "Japanese", level: "Native", proficiency: 100 },
      { name: "Vietnamese", level: "Beginner", proficiency: 25 },
      { name: "English", level: "Intermediate", proficiency: 65 },
    ],
    interests: ["Cooking", "Hiking", "K-Drama", "Photography", "Travel", "Music"],
    stats: {
      connections: 89,
      likes: 312,
      likeRatio: 92,
      exchanges: 56,
      events: 12,
    },
    isOnline: true,
    lastActive: "Active now",
    positiveRating: 92,
  },
  "2": {
    id: 2,
    name: "Sakura Yamamoto",
    username: "@sakuray",
    age: 28,
    location: "Osaka, Japan",
    joinedDate: "February 2024",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    coverImage: "/images/profile-cover.jpg",
    bio: "Vietnamese culture fascinates me! I've been studying the language for 2 years and visited Hanoi last summer. Looking for language partners to improve my speaking skills.",
    occupation: "Marketing Manager",
    education: "Osaka University",
    languages: [
      { name: "Japanese", level: "Native", proficiency: 100 },
      { name: "Vietnamese", level: "N3", proficiency: 55 },
      { name: "English", level: "Advanced", proficiency: 80 },
    ],
    interests: ["Vietnamese Food", "Calligraphy", "Yoga", "Reading", "Coffee"],
    stats: {
      connections: 156,
      likes: 428,
      likeRatio: 88,
      exchanges: 78,
      events: 15,
    },
    isOnline: false,
    lastActive: "Active 2 hours ago",
    positiveRating: 88,
  },
}

const mockUser = users["1"]

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("discover")
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [dialogType, setDialogType] = useState<"report" | "block">("report")

  const userId = params.id as string
  const user = users[userId] || users["1"]

  const handleReport = () => {
    setDialogType("report")
    setShowReportDialog(true)
  }

  const handleBlock = () => {
    setDialogType("block")
    setShowReportDialog(true)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* User Profile Header */}
        <UserProfileHeader 
          user={user} 
          onBack={handleBack}
          onReport={handleReport}
          onBlock={handleBlock}
        />

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          {/* Action Buttons - Like, Message, etc */}
          <UserProfileActions user={user} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - About & Languages */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileAbout user={user} />
              <ProfileLanguages languages={user.languages} />
            </div>

            {/* Right Column - Stats Card */}
            <div className="space-y-6">
              <UserStatsCard stats={user.stats} />
            </div>
          </div>
        </div>

        {/* Report/Block Dialog */}
        <ReportBlockDialog
          isOpen={showReportDialog}
          onClose={() => setShowReportDialog(false)}
          type={dialogType}
          userName={user.name}
        />
      </main>
    </div>
  )
}

function UserStatsCard({ stats }: { stats: typeof mockUser.stats }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-semibold text-foreground mb-4">Activity Stats</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Connections</span>
          <span className="font-semibold text-foreground">{stats.connections}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Likes</span>
          <span className="font-semibold text-foreground">{stats.likes}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Like Ratio</span>
          <span className="font-semibold text-primary">{stats.likeRatio}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Exchanges</span>
          <span className="font-semibold text-foreground">{stats.exchanges}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Events Joined</span>
          <span className="font-semibold text-foreground">{stats.events}</span>
        </div>
      </div>
    </div>
  )
}
