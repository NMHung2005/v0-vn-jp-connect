"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BadgeCheck,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  ThumbsUp,
  Languages,
  Award,
  Flag,
  MessageCircle,
  UserPlus,
  AlertTriangle,
  Upload,
  X,
  ImageIcon,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Language {
  language: string
  level: string
  certificate: string | null
}

interface UserProfile {
  id: number
  name: string
  email?: string
  age: number
  gender: string
  nationality: string
  location: string
  bio: string
  occupation: string
  education: string
  avatar: string
  coverImage: string
  verified: boolean
  positiveRating: number
  connections: number
  joinDate: string
  languages: Language[]
  interests: string[]
  photos: string[]
}

interface UserProfileViewProps {
  user: UserProfile
  onMessage?: () => void
  onReport?: (report: ReportData) => void
}

interface ReportData {
  reason: string
  description: string
  evidence: File[]
}

const reportReasons = [
  { value: "fake_profile", label: "偽プロフィール・なりすまし" },
  { value: "inappropriate_content", label: "不適切なコンテンツ" },
  { value: "harassment", label: "ハラスメント・いじめ" },
  { value: "spam", label: "スパム・詐欺" },
  { value: "underage", label: "未成年ユーザー" },
  { value: "other", label: "その他" },
]

const levelOptions = [
  { value: "Native", color: "bg-emerald-500" },
  { value: "Fluent", color: "bg-blue-500" },
  { value: "Advanced", color: "bg-violet-500" },
  { value: "Intermediate", color: "bg-amber-500" },
  { value: "Basic", color: "bg-gray-400" },
]

export function UserProfileView({ user, onMessage, onReport }: UserProfileViewProps) {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [reportEvidence, setReportEvidence] = useState<File[]>([])
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "long",
      year: "numeric",
    })
  }

  const getLevelColor = (level: string) => {
    const levelOption = levelOptions.find((l) => l.value === level || level.includes(l.value))
    return levelOption?.color || "bg-gray-400"
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - reportEvidence.length)
      setReportEvidence((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveEvidence = (index: number) => {
    setReportEvidence((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmitReport = async () => {
    if (!reportReason || !reportDescription.trim()) return

    setIsSubmittingReport(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (onReport) {
      onReport({
        reason: reportReason,
        description: reportDescription,
        evidence: reportEvidence,
      })
    }

    setIsSubmittingReport(false)
    setReportSubmitted(true)
  }

  const handleCloseReportDialog = () => {
    setIsReportDialogOpen(false)
    // Reset form after dialog closes
    setTimeout(() => {
      setReportReason("")
      setReportDescription("")
      setReportEvidence([])
      setReportSubmitted(false)
    }, 300)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-4 h-4" />
    }
    return <FileText className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-accent">
          <Image
            src={user.coverImage}
            alt="カバー画像"
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <div className="relative w-32 h-32 rounded-full border-4 border-card overflow-hidden bg-muted">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-20">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                  {user.verified && (
                    <BadgeCheck className="w-6 h-6 text-primary fill-primary/20" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {user.occupation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    登録日 {formatDate(user.joinDate)}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={onMessage} className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  メッセージ
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => setIsReportDialogOpen(true)}
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ThumbsUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{user.positiveRating}%</p>
                  <p className="text-xs text-muted-foreground">高評価率</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{user.connections}</p>
                  <p className="text-xs text-muted-foreground">つながり</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">自己紹介</h3>
              <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info Grid */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">基本情報</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">年齢</p>
            <p className="font-semibold text-foreground">{user.age}歳</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">性別</p>
            <p className="font-semibold text-foreground">{user.gender}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">国籍</p>
            <p className="font-semibold text-foreground">{user.nationality}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">学歴</p>
            <p className="font-semibold text-foreground text-sm">{user.education}</p>
          </div>
        </div>
      </div>

      {/* Language Skills */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Languages className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">言語スキル</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {user.languages.map((lang, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Languages className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground text-sm">{lang.language}</h4>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium text-white rounded-full",
                      getLevelColor(lang.level)
                    )}
                  >
                    {lang.level}
                  </span>
                </div>
                {lang.certificate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>{lang.certificate}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">興味・趣味</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Photos */}
      {user.photos.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">写真</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {user.photos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square w-full rounded-xl overflow-hidden border border-border cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Preview Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selectedPhoto && (
            <div className="relative aspect-square w-full">
              <Image
                src={selectedPhoto}
                alt="写真プレビュー"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={handleCloseReportDialog}>
        <DialogContent className="max-w-lg">
          {reportSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">報告を送信しました</h3>
              <p className="text-muted-foreground mb-6">
                ご報告ありがとうございます。運営チームが内容を確認し、適切に対応します。
              </p>
              <Button onClick={handleCloseReportDialog}>閉じる</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  ユーザーを報告
                </DialogTitle>
                <DialogDescription>
                  {user.name}さんのコミュニティガイドライン違反を報告します。詳細と可能であれば証拠を入力してください。
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Report Reason */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">報告理由 *</Label>
                  <RadioGroup value={reportReason} onValueChange={setReportReason}>
                    {reportReasons.map((reason) => (
                      <div key={reason.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={reason.value} id={reason.value} />
                        <Label htmlFor={reason.value} className="text-sm font-normal cursor-pointer">
                          {reason.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    詳細説明 *
                  </Label>
                  <Textarea
                    id="description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="問題の内容を詳しく記入してください。具体例、日時、状況など調査に役立つ情報を含めてください。"
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {reportDescription.length}/1000文字
                  </p>
                </div>

                {/* Evidence Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">証拠（任意）</Label>
                  <p className="text-xs text-muted-foreground">
                    証拠としてスクリーンショットやファイルをアップロードできます。最大5ファイル、各10MBまで。
                  </p>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="evidence-upload"
                      disabled={reportEvidence.length >= 5}
                    />
                    <label
                      htmlFor="evidence-upload"
                      className={cn(
                        "flex flex-col items-center gap-2 cursor-pointer",
                        reportEvidence.length >= 5 && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        クリックしてアップロード、またはドラッグ&ドロップ
                      </span>
                      <span className="text-xs text-muted-foreground">
                        画像、PDF、DOC（最大5ファイル）
                      </span>
                    </label>
                  </div>

                  {/* Uploaded Files List */}
                  {reportEvidence.length > 0 && (
                    <div className="space-y-2">
                      {reportEvidence.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {getFileIcon(file)}
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => handleRemoveEvidence(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCloseReportDialog}>
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleSubmitReport}
                  disabled={!reportReason || !reportDescription.trim() || isSubmittingReport}
                >
                  {isSubmittingReport ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
