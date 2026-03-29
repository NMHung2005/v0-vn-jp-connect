"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  MessageSquare, 
  Heart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe
} from "lucide-react"
import { StatsChart } from "../charts/stats-chart"
import { RecentActivityList } from "../recent-activity-list"
import { TopUsersTable } from "../top-users-table"

interface OverviewTabProps {
  timeRange: string
}

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Conversations",
    value: "3,429",
    change: "+8.2%",
    trend: "up",
    icon: MessageSquare,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Total Matches",
    value: "8,562",
    change: "+23.1%",
    trend: "up",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "Engagement Rate",
    value: "67.4%",
    change: "-2.3%",
    trend: "down",
    icon: TrendingUp,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

const userDistribution = [
  { country: "Vietnam", users: 7234, percentage: 56.3 },
  { country: "Japan", users: 5613, percentage: 43.7 },
]

export function OverviewTab({ timeRange }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-500" : "text-destructive"
                  }`}>
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsChart 
          title="User Growth"
          description="New user registrations over time"
          timeRange={timeRange}
          type="area"
        />
        <StatsChart 
          title="Daily Active Users"
          description="Users active in the last 24 hours"
          timeRange={timeRange}
          type="bar"
        />
      </div>

      {/* User Distribution & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">User Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userDistribution.map((item) => (
              <div key={item.country} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.country}</span>
                  <span className="text-muted-foreground">{item.users.toLocaleString()} users</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.country === "Vietnam" ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">{item.percentage}%</p>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active Now</span>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-foreground">1,247</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
        </Card>
      </div>

      {/* Top Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <TopUsersTable />
        </CardContent>
      </Card>
    </div>
  )
}
