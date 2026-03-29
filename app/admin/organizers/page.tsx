"use client"

import { useState } from "react"
import { Search, Filter, CheckCircle, XCircle, Eye, Building2, FileText, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type ApplicationStatus = "pending" | "approved" | "rejected"

interface OrganizerApplication {
  id: string
  organizationName: string
  representativeName: string
  email: string
  phone: string
  country: "VN" | "JP"
  organizationType: string
  description: string
  documents: string[]
  submittedDate: string
  status: ApplicationStatus
  eventsPlanned: number
}

const mockApplications: OrganizerApplication[] = [
  {
    id: "org1",
    organizationName: "Japan-Vietnam Cultural Exchange Association",
    representativeName: "田中 太郎",
    email: "tanaka@jvcea.org",
    phone: "+81-90-1234-5678",
    country: "JP",
    organizationType: "Tổ chức phi lợi nhuận",
    description: "Tổ chức chuyên về giao lưu văn hóa Nhật-Việt, đã hoạt động từ năm 2015",
    documents: ["Giấy đăng ký hoạt động", "Điều lệ tổ chức", "Báo cáo hoạt động năm 2023"],
    submittedDate: "2024-03-25",
    status: "pending",
    eventsPlanned: 5,
  },
  {
    id: "org2",
    organizationName: "Hội Thanh niên Việt-Nhật TP.HCM",
    representativeName: "Nguyễn Thị Mai",
    email: "mai.nguyen@vjyouth.vn",
    phone: "+84-90-123-4567",
    country: "VN",
    organizationType: "Hội đoàn",
    description: "Hội thanh niên kết nối cộng đồng Việt-Nhật tại TP.HCM, thành lập năm 2018",
    documents: ["Quyết định thành lập", "Danh sách ban chấp hành"],
    submittedDate: "2024-03-24",
    status: "pending",
    eventsPlanned: 3,
  },
  {
    id: "org3",
    organizationName: "Tokyo Vietnamese Community",
    representativeName: "Lê Văn Hùng",
    email: "hung.le@tvc.jp",
    phone: "+81-80-9876-5432",
    country: "JP",
    organizationType: "Cộng đồng",
    description: "Cộng đồng người Việt tại Tokyo, hỗ trợ sinh viên và lao động Việt Nam",
    documents: ["Giấy phép hoạt động", "Danh sách thành viên"],
    submittedDate: "2024-03-22",
    status: "approved",
    eventsPlanned: 8,
  },
  {
    id: "org4",
    organizationName: "Sakura Education Center",
    representativeName: "佐藤 美咲",
    email: "sato@sakura-edu.jp",
    phone: "+81-90-5555-1234",
    country: "JP",
    organizationType: "Trung tâm giáo dục",
    description: "Trung tâm dạy tiếng Việt và tổ chức các hoạt động giao lưu văn hóa",
    documents: ["Giấy phép giáo dục", "Chương trình đào tạo"],
    submittedDate: "2024-03-20",
    status: "rejected",
    eventsPlanned: 2,
  },
  {
    id: "org5",
    organizationName: "Vietnam-Japan Business Network",
    representativeName: "Phạm Quốc Bảo",
    email: "bao.pham@vjbn.vn",
    phone: "+84-28-1234-5678",
    country: "VN",
    organizationType: "Hiệp hội doanh nghiệp",
    description: "Mạng lưới kết nối doanh nghiệp Việt-Nhật, hỗ trợ đầu tư và thương mại",
    documents: ["Giấy đăng ký kinh doanh", "Danh sách thành viên", "Kế hoạch hoạt động"],
    submittedDate: "2024-03-18",
    status: "pending",
    eventsPlanned: 4,
  },
]

const statusConfig = {
  pending: { label: "Chờ duyệt", color: "bg-amber-100 text-amber-700" },
  approved: { label: "Đã duyệt", color: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Từ chối", color: "bg-red-100 text-red-700" },
}

export default function OrganizersPage() {
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<OrganizerApplication | null>(null)

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.representativeName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingCount = mockApplications.filter(a => a.status === "pending").length
  const approvedCount = mockApplications.filter(a => a.status === "approved").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Cấp quyền quản lý sự kiện
        </h1>
        <p className="text-muted-foreground mt-1">
          Duyệt hồ sơ tổ chức và cấp tài khoản quản lý sự kiện (Role 3)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Hồ sơ chờ duyệt</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Tổ chức đã duyệt</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockApplications.reduce((sum, a) => sum + a.eventsPlanned, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Sự kiện đã lên kế hoạch</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm tổ chức..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{application.organizationName}</h3>
                    <span className={cn(
                      "px-2 py-0.5 text-xs rounded-full font-medium",
                      statusConfig[application.status].color
                    )}>
                      {statusConfig[application.status].label}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 text-xs rounded-full font-medium",
                      application.country === "VN" ? "bg-red-100 text-red-700" : "bg-rose-100 text-rose-700"
                    )}>
                      {application.country === "VN" ? "Việt Nam" : "Nhật Bản"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{application.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Đại diện: <span className="font-medium text-foreground">{application.representativeName}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Loại hình: <span className="font-medium text-foreground">{application.organizationType}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Nộp ngày: <span className="font-medium text-foreground">{new Date(application.submittedDate).toLocaleDateString("vi-VN")}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {application.documents.length} tài liệu đính kèm
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Xem chi tiết"
                >
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
                {application.status === "pending" && (
                  <>
                    <button className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Duyệt
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Từ chối
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Chi tiết hồ sơ</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Organization Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Thông tin tổ chức
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tên tổ chức</p>
                    <p className="font-medium text-foreground">{selectedApplication.organizationName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loại hình</p>
                    <p className="font-medium text-foreground">{selectedApplication.organizationType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quốc gia</p>
                    <p className="font-medium text-foreground">
                      {selectedApplication.country === "VN" ? "Việt Nam" : "Nhật Bản"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <span className={cn(
                      "inline-block px-2 py-0.5 text-xs rounded-full font-medium",
                      statusConfig[selectedApplication.status].color
                    )}>
                      {statusConfig[selectedApplication.status].label}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Mô tả</p>
                  <p className="text-foreground">{selectedApplication.description}</p>
                </div>
              </div>

              {/* Representative Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Người đại diện</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Họ tên</p>
                    <p className="font-medium text-foreground">{selectedApplication.representativeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p className="font-medium text-foreground">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày nộp hồ sơ</p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedApplication.submittedDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Tài liệu đính kèm</h3>
                <div className="space-y-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc}</span>
                      <button className="ml-auto text-sm text-primary hover:underline">Xem</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Info (if approved) */}
              {selectedApplication.status === "approved" && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-2">Thông tin tài khoản đã cấp</h4>
                  <p className="text-sm text-emerald-700">
                    Tài khoản quản lý sự kiện (Role 3) đã được cấp cho email: {selectedApplication.email}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            {selectedApplication.status === "pending" && (
              <div className="p-6 border-t border-border flex gap-3">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Đóng
                </button>
                <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  Từ chối
                </button>
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Duyệt và cấp tài khoản
                </button>
              </div>
            )}
            {selectedApplication.status !== "pending" && (
              <div className="p-6 border-t border-border">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
