"use client"

import { useState } from "react"
import { Search, Filter, Ban, CheckCircle, Eye, Flag, X, FileImage, FileText, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type UserStatus = "active" | "banned"
type TabType = "all" | "reports"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  country: "VN" | "JP"
  status: UserStatus
  joinDate: string
  reports: number
}

interface EvidenceFile {
  name: string
  type: "image" | "document"
  url: string
}

interface Report {
  id: string
  reportedUser: User
  reportedBy: string
  reason: string
  description: string
  date: string
  status: "pending" | "resolved" | "dismissed"
  evidence: EvidenceFile[]
}

const mockUsers: User[] = [
  { id: "1", name: "Nguyen Van An", email: "an.nguyen@email.com", avatar: "NA", country: "VN", status: "active", joinDate: "2024-01-15", reports: 0 },
  { id: "2", name: "Tanaka Taro", email: "tanaka@email.jp", avatar: "TT", country: "JP", status: "active", joinDate: "2024-02-20", reports: 1 },
  { id: "3", name: "Tran Thi Binh", email: "binh.tran@email.com", avatar: "TB", country: "VN", status: "active", joinDate: "2024-01-10", reports: 2 },
  { id: "4", name: "Sato Hanako", email: "sato.hanako@email.jp", avatar: "SH", country: "JP", status: "active", joinDate: "2024-03-05", reports: 0 },
  { id: "5", name: "Le Minh Chau", email: "chau.le@email.com", avatar: "LC", country: "VN", status: "banned", joinDate: "2023-12-01", reports: 5 },
  { id: "6", name: "Yamada Kenichi", email: "yamada@email.jp", avatar: "YK", country: "JP", status: "active", joinDate: "2024-02-28", reports: 0 },
  { id: "7", name: "Pham Quoc Dung", email: "dung.pham@email.com", avatar: "PD", country: "VN", status: "active", joinDate: "2024-03-10", reports: 0 },
  { id: "8", name: "Suzuki Misaki", email: "suzuki@email.jp", avatar: "SM", country: "JP", status: "banned", joinDate: "2024-01-25", reports: 3 },
]

const mockReports: Report[] = [
  { 
    id: "r1", 
    reportedUser: mockUsers[2], 
    reportedBy: "Yamada Kenichi", 
    reason: "スパム", 
    description: "ユーザーが広告メッセージを繰り返し送信している", 
    date: "2024-03-28", 
    status: "pending",
    evidence: [
      { name: "spam_screenshot_1.png", type: "image", url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop" },
      { name: "spam_screenshot_2.png", type: "image", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop" },
    ]
  },
  { 
    id: "r2", 
    reportedUser: mockUsers[4], 
    reportedBy: "Nguyen Van An", 
    reason: "不適切な言葉遣い", 
    description: "コメントで攻撃的な言葉を使用している", 
    date: "2024-03-27", 
    status: "pending",
    evidence: [
      { name: "chat_log.pdf", type: "document", url: "/documents/chat_log.pdf" },
      { name: "screenshot.png", type: "image", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop" },
    ]
  },
  { 
    id: "r3", 
    reportedUser: mockUsers[7], 
    reportedBy: "Sato Hanako", 
    reason: "ハラスメント", 
    description: "嫌がらせメッセージを複数回送信している", 
    date: "2024-03-26", 
    status: "pending",
    evidence: [
      { name: "harassment_proof_1.png", type: "image", url: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&h=600&fit=crop" },
      { name: "harassment_proof_2.png", type: "image", url: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop" },
      { name: "message_history.pdf", type: "document", url: "/documents/message_history.pdf" },
    ]
  },
  { 
    id: "r4", 
    reportedUser: mockUsers[1], 
    reportedBy: "Tran Thi Binh", 
    reason: "虚偽コンテンツ", 
    description: "イベントに関する誤情報を投稿している", 
    date: "2024-03-25", 
    status: "resolved",
    evidence: [
      { name: "fake_post.png", type: "image", url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=600&fit=crop" },
    ]
  },
]

const statusConfig = {
  active: { label: "有効", color: "bg-emerald-100 text-emerald-700" },
  banned: { label: "停止", color: "bg-red-100 text-red-700" },
}

const reportStatusConfig = {
  pending: { label: "対応待ち", color: "bg-amber-100 text-amber-700" },
  resolved: { label: "解決済み", color: "bg-emerald-100 text-emerald-700" },
  dismissed: { label: "却下", color: "bg-muted text-muted-foreground" },
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showBanModal, setShowBanModal] = useState(false)
  const [banReason, setBanReason] = useState("")
  const [userToBan, setUserToBan] = useState<User | null>(null)
  const [showEvidenceModal, setShowEvidenceModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceFile | null>(null)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingReports = mockReports.filter(r => r.status === "pending")

  const handleBanClick = (user: User) => {
    setUserToBan(user)
    setBanReason("")
    setShowBanModal(true)
  }

  const handleConfirmBan = () => {
    if (banReason.trim()) {
      // Handle ban logic here
      console.log(`Banning user ${userToBan?.name} for reason: ${banReason}`)
      setShowBanModal(false)
      setUserToBan(null)
      setBanReason("")
    }
  }

  const handleViewEvidence = (report: Report) => {
    setSelectedReport(report)
    setShowEvidenceModal(true)
  }

  const handleEvidenceClick = (evidence: EvidenceFile) => {
    if (evidence.type === "image") {
      setSelectedEvidence(evidence)
    } else {
      // For documents, open in new tab
      window.open(evidence.url, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          ユーザー管理
        </h1>
        <p className="text-muted-foreground mt-1">
          ユーザーアカウント管理と違反報告対応
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
            activeTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          すべてのユーザー
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2",
            activeTab === "reports"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          違反報告
          {pendingReports.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-destructive text-destructive-foreground">
              {pendingReports.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "all" ? (
        <>
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="ユーザーを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">すべての状態</option>
                <option value="active">有効</option>
                <option value="banned">停止</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ユーザー</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">国</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">状態</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">登録日</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">報告件数</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full font-medium",
                        user.country === "VN" ? "bg-red-100 text-red-700" : "bg-rose-100 text-rose-700"
                      )}>
                        {user.country === "VN" ? "ベトナム" : "日本"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full font-medium",
                        statusConfig[user.status].color
                      )}>
                        {statusConfig[user.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-4">
                      {user.reports > 0 ? (
                        <span className="flex items-center gap-1 text-sm text-amber-600">
                          <Flag className="w-4 h-4" />
                          {user.reports}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="詳細を見る"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {user.status !== "banned" && (
                          <button
                            onClick={() => handleBanClick(user)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="アカウント停止"
                          >
                            <Ban className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                        {user.status === "banned" && (
                          <button
                            className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="停止解除"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Reports List */}
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <Flag className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{report.reason}</h3>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full font-medium",
                          reportStatusConfig[report.status].color
                        )}>
                          {reportStatusConfig[report.status].label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          報告対象: <span className="font-medium text-foreground">{report.reportedUser.name}</span>
                        </span>
                        <span className="text-muted-foreground">
                          報告者: <span className="font-medium text-foreground">{report.reportedBy}</span>
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(report.date).toLocaleDateString("en-US")}
                        </span>
                      </div>
                      {/* Evidence Button */}
                      {report.evidence.length > 0 && (
                        <button
                          onClick={() => handleViewEvidence(report)}
                          className="mt-3 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <FileImage className="w-4 h-4" />
                          証拠を表示 ({report.evidence.length}件)
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "pending" && (
                      <>
                        <button 
                          onClick={() => handleBanClick(report.reportedUser)}
                          className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          アカウント停止
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                          却下
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">ユーザー詳細</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
                {selectedUser.avatar}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedUser.name}</h3>
                <p className="text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">国</span>
                <span className="font-medium">{selectedUser.country === "VN" ? "ベトナム" : "日本"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">状態</span>
                <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium", statusConfig[selectedUser.status].color)}>
                  {statusConfig[selectedUser.status].label}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">登録日</span>
                <span className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString("en-US")}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">報告回数</span>
                <span className="font-medium">{selectedUser.reports}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                閉じる
              </button>
              {selectedUser.status !== "banned" && (
                <button 
                  onClick={() => {
                    setSelectedUser(null)
                    handleBanClick(selectedUser)
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  アカウント停止
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ban Reason Modal */}
      {showBanModal && userToBan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">ユーザーアカウント停止</h2>
              <button
                onClick={() => {
                  setShowBanModal(false)
                  setUserToBan(null)
                  setBanReason("")
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-muted-foreground mb-4">
              <span className="font-medium text-foreground">{userToBan.name}</span> を停止しようとしています。
              この操作の理由を入力してください。
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                停止理由 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="このユーザーを停止する理由を入力してください..."
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBanModal(false)
                  setUserToBan(null)
                  setBanReason("")
                }}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirmBan}
                disabled={!banReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                停止を確定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Modal */}
      {showEvidenceModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">証拠ファイル</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  報告: {selectedReport.reason} - {selectedReport.reportedUser.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowEvidenceModal(false)
                  setSelectedReport(null)
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Evidence Grid */}
            <div className="grid grid-cols-2 gap-4">
              {selectedReport.evidence.map((evidence, index) => (
                <div 
                  key={index}
                  onClick={() => handleEvidenceClick(evidence)}
                  className="border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors group"
                >
                  {evidence.type === "image" ? (
                    <div className="relative aspect-video bg-muted">
                      <Image
                        src={evidence.url}
                        alt={evidence.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 300px"
                        className="object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted/50 flex flex-col items-center justify-center gap-2 group-hover:bg-muted transition-colors">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                      <Download className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="p-3 bg-card">
                    <p className="text-sm font-medium text-foreground truncate">{evidence.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{evidence.type}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowEvidenceModal(false)
                  setSelectedReport(null)
                }}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedEvidence && selectedEvidence.type === "image" && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
          onClick={() => setSelectedEvidence(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <button
              onClick={() => setSelectedEvidence(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedEvidence.url}
                alt={selectedEvidence.name}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
              />
            </div>
            <p className="text-center text-white mt-4">{selectedEvidence.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
