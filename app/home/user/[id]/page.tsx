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
    gender: "Female",
    nationality: "Japanese",
    location: "Tokyo, Japan",
    bio: "Love learning Vietnamese! I enjoy cooking, traveling, and watching K-dramas. Looking for language exchange partners to practice Vietnamese and share Japanese culture.",
    occupation: "Marketing Specialist",
    education: "Waseda University",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&h=400&fit=crop",
    verified: true,
    positiveRating: 98,
    connections: 256,
    joinDate: "2023-08-20",
    languages: [
      { language: "Japanese", level: "Native", certificate: null },
      { language: "Vietnamese", level: "Intermediate", certificate: null },
      { language: "English", level: "Fluent", certificate: "TOEIC 920" },
    ],
    interests: ["Language Exchange", "Cooking", "Travel", "K-Drama", "Photography", "Music"],
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    ],
  },
  {
    id: 2,
    name: "Sato Hiroshi",
    age: 28,
    gender: "Male",
    nationality: "Japanese",
    location: "Osaka, Japan",
    bio: "Software engineer interested in Vietnamese tech scene. I love gaming, anime, and exploring new cultures. Want to make friends from Vietnam!",
    occupation: "Software Engineer",
    education: "Kyoto University",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=400&fit=crop",
    verified: true,
    positiveRating: 95,
    connections: 189,
    joinDate: "2023-11-15",
    languages: [
      { language: "Japanese", level: "Native", certificate: null },
      { language: "Vietnamese", level: "Basic", certificate: null },
      { language: "English", level: "Advanced", certificate: "IELTS 7.5" },
    ],
    interests: ["Gaming", "Anime", "Technology", "Coffee", "Cycling", "Music"],
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

  const handleConnect = () => {
    // Send connection request
    console.log("Connect request sent to:", user.name)
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
    <div className="flex h-screen bg-background">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border bg-card">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">View profile</p>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <UserProfileView
              user={user}
              onMessage={handleMessage}
              onConnect={handleConnect}
              onReport={handleReport}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
