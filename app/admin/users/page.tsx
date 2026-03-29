"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, AlertTriangle, Ban, CheckCircle, Eye, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

type UserStatus = "active" | "warned" | "banned"
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

interface Report {
  id: string
  reportedUser: User
  reportedBy: string
  reason: string
  description: string
  date: string
  status: "pending" | "resolved" | "dismissed"
}

const mockUsers: User[] = [
  { id: "1", name: "Nguyễn Văn An", email: "an.nguyen@email.com", avatar: "NA", country: "VN", status: "active", joinDate: "2024-01-15", reports: 0 },
  { id: "2", name: "田中 太郎", email: "tanaka@email.jp", avatar: "TT", country: "JP", status: "active", joinDate: "2024-02-20", reports: 1 },
  { id: "3", name: "Trần Thị Bình", email: "binh.tran@email.com", avatar: "TB", country: "VN", status: "warned", joinDate: "2024-01-10", reports: 2 },
  { id: "4", name: "佐藤 花子", email: "sato.hanako@email.jp", avatar: "SH", country: "JP", status: "active", joinDate: "2024-03-05", reports: 0 },
  { id: "5", name: "Lê Minh Châu", email: "chau.le@email.com", avatar: "LC", country: "VN", status: "banned", joinDate: "2023-12-01", reports: 5 },
  { id: "6", name: "山田 健一", email: "yamada@email.jp", avatar: "YK", country: "JP", status: "active", joinDate: "2024-02-28", reports: 0 },
  { id: "7", name: "Phạm Quốc Dũng", email: "dung.pham@email.com", avatar: "PD", country: "VN", status: "active", joinDate: "2024-03-10", reports: 0 },
  { id: "8", name: "鈴木 美咲", email: "suzuki@email.jp", avatar: "SM", country: "JP", status: "warned", joinDate: "2024-01-25", reports: 3 },
]

const mockReports: Report[] = [
  { id: "r1", reportedUser: mockUsers[2], reportedBy: "山田 健一", reason: "Spam", description: "Người dùng liên tục gửi tin nhắn quảng cáo", date: "2024-03-28", status: "pending" },
  { id: "r2", reportedUser: mockUsers[4], reportedBy: "Nguyễn Văn An", reason: "Ngôn ngữ không phù hợp", description: "Sử dụng ngôn từ xúc phạm trong bình luận", date: "2024-03-27", status: "pending" },
  { id: "r3", reportedUser: mockUsers[7], reportedBy: "佐藤 花子", reason: "Quấy rối", description: "Gửi tin nhắn quấy rối nhiều lần", date: "2024-03-26", status: "pending" },
  { id: "r4", reportedUser: mockUsers[1], reportedBy: "Trần Thị Bình", reason: "Nội dung giả mạo", description: "Đăng thông tin sai lệch về sự kiện", date: "2024-03-25", status: "resolved" },
]

const statusConfig = {
  active: { label: "Hoạt động", color: "bg-emerald-100 text-emerald-700" },
  warned: { label: "Đã cảnh cáo", color: "bg-amber-100 text-amber-700" },
  banned: { label: "Đã khóa", color: "bg-red-100 text-red-700" },
}

const reportStatusConfig = {
  pending: { label: "Chờ xử lý", color: "bg-amber-100 text-amber-700" },
  resolved: { label: "Đã xử lý", color: "bg-emerald-100 text-emerald-700" },
  dismissed: { label: "Từ chối", color: "bg-muted text-muted-foreground" },
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingReports = mockReports.filter(r => r.status === "pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Quản lý người dùng
        </h1>
        <p className="text-muted-foreground mt-1">
          Quản lý danh sách người dùng và xử lý các báo cáo vi phạm
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
          Tất cả người dùng
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
          Báo cáo vi phạm
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
                placeholder="Tìm kiếm người dùng..."
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
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="warned">Đã cảnh cáo</option>
                <option value="banned">Đã khóa</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Người dùng</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Quốc gia</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Ngày tham gia</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Báo cáo</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Hành động</th>
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
                        {user.country === "VN" ? "Việt Nam" : "Nhật Bản"}
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
                      {new Date(user.joinDate).toLocaleDateString("vi-VN")}
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
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {user.status !== "warned" && user.status !== "banned" && (
                          <button
                            className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                            title="Cảnh cáo"
                          >
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                          </button>
                        )}
                        {user.status !== "banned" && (
                          <button
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Khóa tài khoản"
                          >
                            <Ban className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                        {user.status === "banned" && (
                          <button
                            className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="Mở khóa"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          </button>
                        )}
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
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
                          Người bị báo cáo: <span className="font-medium text-foreground">{report.reportedUser.name}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Báo cáo bởi: <span className="font-medium text-foreground">{report.reportedBy}</span>
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(report.date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {report.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm font-medium bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors">
                        Cảnh cáo
                      </button>
                      <button className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                        Khóa tài khoản
                      </button>
                      <button className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                        Từ chối
                      </button>
                    </div>
                  )}
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
              <h2 className="text-xl font-semibold text-foreground">Chi tiết người dùng</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
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
                <span className="text-muted-foreground">Quốc gia</span>
                <span className="font-medium">{selectedUser.country === "VN" ? "Việt Nam" : "Nhật Bản"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Trạng thái</span>
                <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium", statusConfig[selectedUser.status].color)}>
                  {statusConfig[selectedUser.status].label}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Ngày tham gia</span>
                <span className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString("vi-VN")}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Số lần bị báo cáo</span>
                <span className="font-medium">{selectedUser.reports}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Đóng
              </button>
              {selectedUser.status !== "banned" && (
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Khóa tài khoản
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
