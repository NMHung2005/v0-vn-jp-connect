import { Users, FileText, Calendar, MessageSquare, TrendingUp, Globe } from "lucide-react"
import { StatsCard } from "@/components/admin/stats-card"
import { RecentUsers } from "@/components/admin/recent-users"
import { ActivityFeed } from "@/components/admin/activity-feed"
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
            Welcome back! Here&apos;s what&apos;s happening on VN-JP Connect.
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Users"
          value={12847}
          change="+12.5%"
          changeType="positive"
          icon={Users}
          description="vs last month"
        />
        <StatsCard
          title="Vietnamese"
          value={6423}
          change="+8.2%"
          changeType="positive"
          icon={Globe}
          description="active users"
        />
        <StatsCard
          title="Japanese"
          value={6424}
          change="+15.1%"
          changeType="positive"
          icon={Globe}
          description="active users"
        />
        <StatsCard
          title="Total Posts"
          value={3256}
          change="+5.4%"
          changeType="positive"
          icon={FileText}
          description="this month"
        />
        <StatsCard
          title="Events"
          value={128}
          change="-2.1%"
          changeType="negative"
          icon={Calendar}
          description="active events"
        />
        <StatsCard
          title="Messages"
          value="45.2K"
          change="+23.8%"
          changeType="positive"
          icon={MessageSquare}
          description="this week"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Recent Users and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentUsers />
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Users className="w-5 h-5" />
              <span className="font-medium">Manage Users</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Review Posts</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Create Event</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">View Analytics</span>
            </button>
          </div>

          {/* Platform Status */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-card-foreground mb-4">
              Platform Status
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Server</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">CDN</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-600">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
