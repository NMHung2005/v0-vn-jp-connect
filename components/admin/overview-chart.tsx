"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", vietnam: 186, japan: 145 },
  { month: "Feb", vietnam: 220, japan: 180 },
  { month: "Mar", vietnam: 305, japan: 250 },
  { month: "Apr", vietnam: 280, japan: 290 },
  { month: "May", vietnam: 390, japan: 320 },
  { month: "Jun", vietnam: 420, japan: 380 },
]

const chartConfig = {
  vietnam: {
    label: "Vietnam",
    color: "oklch(0.60 0.15 25)",
  },
  japan: {
    label: "Japan",
    color: "oklch(0.60 0.15 145)",
  },
} satisfies ChartConfig

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
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.60 0.15 25)" }} />
              <span className="text-sm text-muted-foreground">Vietnam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "oklch(0.60 0.15 145)" }} />
              <span className="text-sm text-muted-foreground">Japan</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full aspect-auto">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-muted-foreground"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="vietnam"
              fill="var(--color-vietnam)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="japan"
              fill="var(--color-japan)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
