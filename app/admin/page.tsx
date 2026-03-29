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
            System usage overview for VN-JP Connect platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={12847}
          change="+12.5%"
          changeType="positive"
          icon={Users}
          description="vs last month"
        />
        <StatsCard
          title="Vietnamese Users"
          value={6423}
          change="+8.2%"
          changeType="positive"
          icon={Globe}
          description="active users"
        />
        <StatsCard
          title="Japanese Users"
          value={6424}
          change="+15.1%"
          changeType="positive"
          icon={Globe}
          description="active users"
        />
        <StatsCard
          title="Total Events"
          value={128}
          change="+5.4%"
          changeType="positive"
          icon={Calendar}
          description="ongoing events"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="New Users Today"
          value={47}
          change="+23%"
          changeType="positive"
          icon={UserCheck}
          description="new registrations"
        />
        <StatsCard
          title="Locked Accounts"
          value={12}
          change="-5%"
          changeType="positive"
          icon={UserX}
          description="policy violations"
        />
        <StatsCard
          title="Growth Rate"
          value="18.5%"
          change="+3.2%"
          changeType="positive"
          icon={TrendingUp}
          description="this month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart />
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            User Distribution by Country
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Vietnam</span>
                <span className="text-sm font-medium text-foreground">50%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Japan</span>
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
              Event Statistics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">83</p>
                <p className="text-sm text-muted-foreground">Completed Events</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Partner Organizations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
