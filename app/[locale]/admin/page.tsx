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
            ダッシュボード
          </h1>
          <p className="text-muted-foreground mt-1">
            VN-JP Connectプラットフォームの利用状況概要
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="7d">過去7日間</option>
            <option value="30d">過去30日間</option>
            <option value="90d">過去90日間</option>
            <option value="1y">過去1年間</option>
          </select>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="総ユーザー数"
          value={12847}
          change="+12.5%"
          changeType="positive"
          icon={Users}
          description="先月比"
        />
        <StatsCard
          title="ベトナムユーザー"
          value={6423}
          change="+8.2%"
          changeType="positive"
          icon={Globe}
          description="アクティブユーザー"
        />
        <StatsCard
          title="日本ユーザー"
          value={6424}
          change="+15.1%"
          changeType="positive"
          icon={Globe}
          description="アクティブユーザー"
        />
        <StatsCard
          title="総イベント数"
          value={128}
          change="+5.4%"
          changeType="positive"
          icon={Calendar}
          description="開催中イベント"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="本日の新規ユーザー"
          value={47}
          change="+23%"
          changeType="positive"
          icon={UserCheck}
          description="新規登録"
        />
        <StatsCard
          title="凍結アカウント"
          value={12}
          change="-5%"
          changeType="positive"
          icon={UserX}
          description="ポリシー違反"
        />
        <StatsCard
          title="成長率"
          value="18.5%"
          change="+3.2%"
          changeType="positive"
          icon={TrendingUp}
          description="今月"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart />
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            国別ユーザー分布
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">ベトナム</span>
                <span className="text-sm font-medium text-foreground">50%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">日本</span>
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
              イベント統計
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">128</p>
                <p className="text-sm text-muted-foreground">総イベント数</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">1,247</p>
                <p className="text-sm text-muted-foreground">興味ありユーザー</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
