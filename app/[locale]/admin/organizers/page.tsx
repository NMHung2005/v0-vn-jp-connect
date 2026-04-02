"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, Save, Eye, Globe, FileText, CheckCircle, Plus, Trash2, Edit2 } from "lucide-react"
import { cn } from "@/lib/utils"

type EventType = "online" | "offline" | "hybrid"
type EventStatus = "draft" | "published"

interface Event {
  id: string
  title: string
  description: string
  eventType: EventType
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  onlineLink: string
  maxParticipants: string
  language: string
  category: string
  coverImage: string | null
  status: EventStatus
  createdAt: string
}

interface EventFormData {
  title: string
  description: string
  eventType: EventType
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  onlineLink: string
  maxParticipants: string
  language: string
  category: string
  coverImage: string | null
}

const categories = [
  "文化交流",
  "語学学習",
  "ビジネス交流",
  "フード・料理",
  "アート・音楽",
  "スポーツ・レクリエーション",
  "教育・ワークショップ",
  "コミュニティ交流会",
  "その他"
]

const languages = [
  "ベトナム語",
  "日本語",
  "英語",
  "ベトナム語・日本語",
  "すべての言語"
]

const mockEvents: Event[] = [
  {
    id: "1",
    title: "日越言語交換ミートアップ",
    description: "ベトナム語話者と日本語話者が互いの言語を練習するカジュアルな交流会です。レベルを問わず参加できます。",
    eventType: "offline",
    startDate: "2024-04-15",
    startTime: "14:00",
    endDate: "2024-04-15",
    endTime: "17:00",
    location: "ハノイ文化センター（Tran Hung Dao通り123）",
    onlineLink: "",
    maxParticipants: "30",
    language: "ベトナム語・日本語",
    category: "語学学習",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
    status: "published",
    createdAt: "2024-03-20"
  },
  {
    id: "2",
    title: "オンライン日本料理教室",
    description: "プロのシェフと一緒に本格的な日本料理を学びます。食材リストはイベント前に送付します。",
    eventType: "online",
    startDate: "2024-04-20",
    startTime: "19:00",
    endDate: "2024-04-20",
    endTime: "21:00",
    location: "",
    onlineLink: "https://zoom.us/j/123456789",
    maxParticipants: "50",
    language: "英語",
    category: "フード・料理",
    coverImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop",
    status: "published",
    createdAt: "2024-03-22"
  },
  {
    id: "3",
    title: "日越ビジネス交流ナイト",
    description: "ベトナムと日本の起業家・ビジネス関係者とつながる交流イベントです。",
    eventType: "hybrid",
    startDate: "2024-04-25",
    startTime: "18:00",
    endDate: "2024-04-25",
    endTime: "21:00",
    location: "サクラホテル（ホーチミン市）",
    onlineLink: "https://meet.google.com/abc-defg-hij",
    maxParticipants: "100",
    language: "すべての言語",
    category: "ビジネス交流",
    coverImage: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=400&fit=crop",
    status: "draft",
    createdAt: "2024-03-25"
  }
]

const initialFormData: EventFormData = {
  title: "",
  description: "",
  eventType: "offline",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  location: "",
  onlineLink: "",
  maxParticipants: "",
  language: "",
  category: "",
  coverImage: null
}

export default function CreateEventPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [isPreview, setIsPreview] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault()
    
    const newEvent: Event = {
      id: editingEventId || Date.now().toString(),
      ...formData,
      status: isDraft ? "draft" : "published",
      createdAt: new Date().toISOString().split("T")[0]
    }

    if (editingEventId) {
      setEvents(prev => prev.map(ev => ev.id === editingEventId ? newEvent : ev))
    } else {
      setEvents(prev => [newEvent, ...prev])
    }

    setFormData(initialFormData)
    setShowForm(false)
    setEditingEventId(null)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      startDate: event.startDate,
      startTime: event.startTime,
      endDate: event.endDate,
      endTime: event.endTime,
      location: event.location,
      onlineLink: event.onlineLink,
      maxParticipants: event.maxParticipants,
      language: event.language,
      category: event.category,
      coverImage: event.coverImage
    })
    setEditingEventId(event.id)
    setShowForm(true)
  }

  const handleDelete = (eventId: string) => {
    if (confirm("このイベントを削除してもよろしいですか？")) {
      setEvents(prev => prev.filter(ev => ev.id !== eventId))
    }
  }

  const handleCancel = () => {
    setFormData(initialFormData)
    setShowForm(false)
    setEditingEventId(null)
    setIsPreview(false)
  }

  const publishedCount = events.filter(e => e.status === "published").length
  const draftCount = events.filter(e => e.status === "draft").length

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle className="w-5 h-5" />
          <span>イベントを保存しました。</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            イベント作成
          </h1>
          <p className="text-muted-foreground mt-1">
            ユーザーが閲覧・参加できるイベントを作成・管理
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            新規イベント作成
          </button>
        )}
      </div>

      {showForm ? (
        <>
          {/* Form Header */}
          <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
            <h2 className="text-lg font-semibold text-foreground">
              {editingEventId ? "イベント編集" : "新規イベント"}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? "編集" : "プレビュー"}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={(e) => handleSubmit(e, true)}
                className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                下書き保存
              </button>
              <button
                onClick={(e) => handleSubmit(e, false)}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                公開する
              </button>
            </div>
          </div>

          {isPreview ? (
            /* Preview Mode */
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Cover Image */}
              <div className="h-64 bg-muted flex items-center justify-center">
                {formData.coverImage ? (
                  <img src={formData.coverImage} alt="イベントカバー" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>カバー画像なし</p>
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={cn(
                    "px-3 py-1 text-sm rounded-full font-medium",
                    formData.eventType === "online" ? "bg-blue-100 text-blue-700" :
                    formData.eventType === "offline" ? "bg-emerald-100 text-emerald-700" :
                    "bg-purple-100 text-purple-700"
                  )}>
                    {formData.eventType === "online" ? "オンライン" : formData.eventType === "offline" ? "オフライン" : "ハイブリッド"}
                  </span>
                  {formData.category && (
                    <span className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground">
                      {formData.category}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {formData.title || "イベントタイトル"}
                </h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {formData.startDate ? new Date(formData.startDate).toLocaleDateString("en-US", { 
                        weekday: "long", year: "numeric", month: "long", day: "numeric" 
                      }) : "日付未設定"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>{formData.startTime || "00:00"} - {formData.endTime || "00:00"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{formData.location || formData.onlineLink || "場所未設定"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <span>最大{formData.maxParticipants || "無制限"}名</span>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">イベント概要</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {formData.description || "説明はまだありません"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form className="space-y-6">
              {/* Basic Info */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  基本情報
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      イベントタイトル <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="イベントのタイトルを入力してください"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      説明 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="イベント内容、参加者が期待できること、必要条件などを入力してください"
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        カテゴリ <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">カテゴリを選択</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        使用言語 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => handleInputChange("language", e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">言語を選択</option>
                        {languages.map(lang => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Type & Location */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  開催形式と場所
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      開催形式 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: "offline", label: "オフライン", icon: MapPin },
                        { value: "online", label: "オンライン", icon: Globe },
                        { value: "hybrid", label: "ハイブリッド", icon: Users }
                      ].map(type => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange("eventType", type.value)}
                          className={cn(
                            "flex-1 p-4 border rounded-lg transition-colors flex flex-col items-center gap-2",
                            formData.eventType === type.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50 text-muted-foreground"
                          )}
                        >
                          <type.icon className="w-6 h-6" />
                          <span className="font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(formData.eventType === "offline" || formData.eventType === "hybrid") && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        開催場所 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="会場住所を入力してください"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  )}

                  {(formData.eventType === "online" || formData.eventType === "hybrid") && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        オンライン会議リンク <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        value={formData.onlineLink}
                        onChange={(e) => handleInputChange("onlineLink", e.target.value)}
                        placeholder="Zoom、Google Meetなどのリンクを入力"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  日時
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      開始日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      開始時刻 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      終了日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      終了時刻 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity & Cover Image */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  定員とメディア
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      最大参加人数
                    </label>
                    <input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                      placeholder="無制限の場合は空欄"
                      min="1"
                      className="w-full max-w-xs px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      このイベントに登録できる人数の上限を設定します
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      カバー画像URL
                    </label>
                    <input
                      type="url"
                      value={formData.coverImage || ""}
                      onChange={(e) => handleInputChange("coverImage", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      イベントカバー画像のURLを入力してください（推奨: 1920x1080）
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{events.length}</p>
                  <p className="text-sm text-muted-foreground">総イベント数</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{publishedCount}</p>
                  <p className="text-sm text-muted-foreground">公開中</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{draftCount}</p>
                  <p className="text-sm text-muted-foreground">下書き</p>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">すべてのイベント</h2>
            {events.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">イベントはまだありません</h3>
                <p className="text-muted-foreground mb-4">最初のイベントを作成して始めましょう</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  イベント作成
                </button>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="flex">
                    {/* Cover Image */}
                    <div className="w-48 h-36 bg-muted shrink-0 hidden sm:block">
                      {event.coverImage ? (
                        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={cn(
                              "px-2 py-0.5 text-xs rounded-full font-medium",
                              event.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            )}>
                              {event.status === "published" ? "公開中" : "下書き"}
                            </span>
                            <span className={cn(
                              "px-2 py-0.5 text-xs rounded-full font-medium",
                              event.eventType === "online" ? "bg-blue-100 text-blue-700" :
                              event.eventType === "offline" ? "bg-emerald-100 text-emerald-700" :
                              "bg-purple-100 text-purple-700"
                            )}>
                              {event.eventType === "online" ? "オンライン" : event.eventType === "offline" ? "オフライン" : "ハイブリッド"}
                            </span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                              {event.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                              {event.location || event.onlineLink || "未定"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="編集"
                          >
                            <Edit2 className="w-5 h-5 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="削除"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
