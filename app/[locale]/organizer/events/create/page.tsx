"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, ArrowLeft, Save, Eye, Globe, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type EventType = "online" | "offline" | "hybrid"

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
  "Cultural Exchange",
  "Language Learning",
  "Business Networking",
  "Food & Cooking",
  "Art & Music",
  "Sports & Recreation",
  "Education & Workshop",
  "Community Meetup",
  "Other"
]

const languages = [
  "Vietnamese",
  "Japanese",
  "English",
  "Vietnamese & Japanese",
  "All Languages"
]

export default function CreateEventPage() {
  const [formData, setFormData] = useState<EventFormData>({
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
  })

  const [isPreview, setIsPreview] = useState(false)

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault()
    console.log("Submitting event:", { ...formData, isDraft })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/organizer/events" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">新規イベント作成</h1>
                <p className="text-sm text-muted-foreground">イベント作成のために詳細を入力してください</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? "編集" : "プレビュー"}
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
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
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
          <form className="space-y-8">
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
                    rows={6}
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
                    カバー画像
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-2">
                      クリックしてアップロード、またはドラッグ&ドロップ
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG/JPG、最大5MB（推奨: 1920x1080）
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Link
                href="/organizer/events"
                className="px-6 py-3 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
              >
                キャンセル
              </Link>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="px-6 py-3 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                下書きとして保存
              </button>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, false)}
                className="px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                公開する
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
