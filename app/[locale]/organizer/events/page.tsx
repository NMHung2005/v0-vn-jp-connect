"use client"

import { useState } from "react"
import { Plus, Search, Filter, Calendar, Users, MapPin, MoreHorizontal, Eye, Edit, Trash2, Clock } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type EventStatus = "draft" | "pending" | "published" | "completed" | "cancelled"

interface Event {
  id: string
  title: string
  description: string
  coverImage: string | null
  eventType: "online" | "offline" | "hybrid"
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  participants: number
  maxParticipants: number | null
  status: EventStatus
  category: string
}

const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Japanese Language Exchange Meetup",
    description: "Practice your Japanese with native speakers in a casual setting",
    coverImage: null,
    eventType: "offline",
    startDate: "2024-04-15",
    startTime: "14:00",
    endDate: "2024-04-15",
    endTime: "17:00",
    location: "Ho Chi Minh City, District 1",
    participants: 24,
    maxParticipants: 30,
    status: "published",
    category: "Language Learning"
  },
  {
    id: "e2",
    title: "VN-JP Business Networking Night",
    description: "Connect with professionals from both countries",
    coverImage: null,
    eventType: "hybrid",
    startDate: "2024-04-20",
    startTime: "18:00",
    endDate: "2024-04-20",
    endTime: "21:00",
    location: "Hanoi, Hoan Kiem",
    participants: 45,
    maxParticipants: 50,
    status: "published",
    category: "Business Networking"
  },
  {
    id: "e3",
    title: "Online Cooking Class: Vietnamese Pho",
    description: "Learn to make authentic Vietnamese Pho from a master chef",
    coverImage: null,
    eventType: "online",
    startDate: "2024-04-22",
    startTime: "10:00",
    endDate: "2024-04-22",
    endTime: "12:00",
    location: "Zoom Meeting",
    participants: 18,
    maxParticipants: null,
    status: "pending",
    category: "Food & Cooking"
  },
  {
    id: "e4",
    title: "Cultural Festival Planning",
    description: "Draft event for upcoming cultural festival",
    coverImage: null,
    eventType: "offline",
    startDate: "2024-05-01",
    startTime: "09:00",
    endDate: "2024-05-01",
    endTime: "18:00",
    location: "TBD",
    participants: 0,
    maxParticipants: 200,
    status: "draft",
    category: "Cultural Exchange"
  },
  {
    id: "e5",
    title: "Japanese Calligraphy Workshop",
    description: "Learn the art of Shodo with a certified instructor",
    coverImage: null,
    eventType: "offline",
    startDate: "2024-03-10",
    startTime: "14:00",
    endDate: "2024-03-10",
    endTime: "16:00",
    location: "Da Nang, Hai Chau",
    participants: 15,
    maxParticipants: 15,
    status: "completed",
    category: "Art & Music"
  },
]

const statusConfig = {
  draft: { label: "下書き", color: "bg-muted text-muted-foreground" },
  pending: { label: "審査中", color: "bg-amber-100 text-amber-700" },
  published: { label: "公開中", color: "bg-emerald-100 text-emerald-700" },
  completed: { label: "完了", color: "bg-blue-100 text-blue-700" },
  cancelled: { label: "中止", color: "bg-red-100 text-red-700" },
}

const eventTypeConfig = {
  online: { label: "オンライン", color: "bg-blue-100 text-blue-700" },
  offline: { label: "オフライン", color: "bg-emerald-100 text-emerald-700" },
  hybrid: { label: "ハイブリッド", color: "bg-purple-100 text-purple-700" },
}

export default function OrganizerEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<EventStatus | "all">("all")

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockEvents.length,
    published: mockEvents.filter(e => e.status === "published").length,
    pending: mockEvents.filter(e => e.status === "pending").length,
    draft: mockEvents.filter(e => e.status === "draft").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">マイイベント</h1>
              <p className="text-muted-foreground mt-1">VN-JPコミュニティ向けイベントの管理と作成</p>
            </div>
            <Link
              href="/organizer/events/create"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              イベント作成
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">総イベント数</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.published}</p>
                <p className="text-sm text-muted-foreground">公開中</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">審査中</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Edit className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.draft}</p>
                <p className="text-sm text-muted-foreground">下書き</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="イベントを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EventStatus | "all")}
              className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">すべてのステータス</option>
              <option value="draft">下書き</option>
              <option value="pending">審査中</option>
              <option value="published">公開中</option>
              <option value="completed">完了</option>
              <option value="cancelled">中止</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-6">
                {/* Cover Image */}
                <div className="w-40 h-28 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  {event.coverImage ? (
                    <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 text-xs rounded-full font-medium",
                      statusConfig[event.status].color
                    )}>
                      {statusConfig[event.status].label}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 text-xs rounded-full font-medium",
                      eventTypeConfig[event.eventType].color
                    )}>
                      {eventTypeConfig[event.eventType].label}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{event.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.startTime} - {event.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.participants}{event.maxParticipants ? `/${event.maxParticipants}` : ""}名参加
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/organizer/events/${event.id}`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="表示"
                  >
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  </Link>
                  <Link
                    href={`/organizer/events/${event.id}/edit`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="編集"
                  >
                    <Edit className="w-5 h-5 text-muted-foreground" />
                  </Link>
                  <button
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="削除"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">イベントが見つかりません</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all" 
                ? "検索条件またはフィルターを調整してください" 
                : "最初のイベントを作成して始めましょう"}
            </p>
            <Link
              href="/organizer/events/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              イベント作成
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
