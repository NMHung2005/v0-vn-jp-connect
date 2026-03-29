"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", vietnam: 186, japan: 145 },
  { month: "Feb", vietnam: 220, japan: 180 },
  { month: "Mar", vietnam: 305, japan: 250 },
  { month: "Apr", vietnam: 280, japan: 290 },
  { month: "May", vietnam: 390, japan: 320 },
  { month: "Jun", vietnam: 420, japan: 380 },
]

const COLORS = {
  vietnam: "#ef4444",
  japan: "#f472b6",
}

export function OverviewChart() {
  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              User Growth
            </h3>
            <p className="text-sm text-muted-foreground">
              New registrations by country
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Vietnam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-400" />
              <span className="text-sm text-muted-foreground">Japan</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Bar
                dataKey="vietnam"
                fill={COLORS.vietnam}
                radius={[4, 4, 0, 0]}
                name="Vietnam"
              />
              <Bar
                dataKey="japan"
                fill={COLORS.japan}
                radius={[4, 4, 0, 0]}
                name="Japan"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
