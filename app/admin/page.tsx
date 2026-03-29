import { Users, Calendar, TrendingUp, UserCheck, UserX, Globe } from "lucide-react"
import { StatsCard } from "@/components/admin/stats-card"
import { OverviewChart } from "@/components/admin/overview-chart"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Tổng quan tình hình sử dụng hệ thống VN-JP Connect
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="7d">7 ngày gần đây</option>
            <option value="30d">30 ngày gần đây</option>
            <option value="90d">90 ngày gần đây</option>
            <option value="1y">1 năm gần đây</option>
          </select>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Tổng người dùng"
          value={12847}
          change="+12.5%"
          changeType="positive"
          icon={Users}
          description="so với tháng trước"
        />
        <StatsCard
          title="Người dùng Việt Nam"
          value={6423}
          change="+8.2%"
          changeType="positive"
          icon={Globe}
          description="đang hoạt động"
        />
        <StatsCard
          title="Người dùng Nhật Bản"
          value={6424}
          change="+15.1%"
          changeType="positive"
          icon={Globe}
          description="đang hoạt động"
        />
        <StatsCard
          title="Tổng sự kiện"
          value={128}
          change="+5.4%"
          changeType="positive"
          icon={Calendar}
          description="đang diễn ra"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Người dùng mới hôm nay"
          value={47}
          change="+23%"
          changeType="positive"
          icon={UserCheck}
          description="đăng ký mới"
        />
        <StatsCard
          title="Tài khoản bị khóa"
          value={12}
          change="-5%"
          changeType="positive"
          icon={UserX}
          description="vi phạm cộng đồng"
        />
        <StatsCard
          title="Tỷ lệ tăng trưởng"
          value="18.5%"
          change="+3.2%"
          changeType="positive"
          icon={TrendingUp}
          description="tháng này"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart />
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Phân bố người dùng theo quốc gia
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Việt Nam</span>
                <span className="text-sm font-medium text-foreground">50%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Nhật Bản</span>
                <span className="text-sm font-medium text-foreground">50%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-rose-400 h-3 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
          </div>

          {/* Event Stats */}
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-lg font-semibold text-card-foreground mb-4">
              Thống kê sự kiện
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-sm text-muted-foreground">Sự kiện đang chờ duyệt</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">83</p>
                <p className="text-sm text-muted-foreground">Sự kiện đã hoàn thành</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-sm text-muted-foreground">Lượt tham gia</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Tổ chức hợp tác</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
