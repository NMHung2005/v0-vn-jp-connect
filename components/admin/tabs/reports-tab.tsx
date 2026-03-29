"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Flag, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  Ban,
  MessageSquare,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Report {
  id: number
  reporter: {
    name: string
    avatar: string
  }
  reported: {
    name: string
    avatar: string
  }
  reason: string
  description: string
  status: "pending" | "reviewing" | "resolved" | "dismissed"
  createdAt: string
  type: "harassment" | "spam" | "fake_profile" | "inappropriate" | "other"
}

const reports: Report[] = [
  {
    id: 1,
    reporter: { name: "Nguyen Van A", avatar: "https://i.pravatar.cc/150?img=10" },
    reported: { name: "User XYZ", avatar: "https://i.pravatar.cc/150?img=11" },
    reason: "Harassment",
    description: "Sending inappropriate messages repeatedly after being asked to stop.",
    status: "pending",
    createdAt: "2024-03-15 14:30",
    type: "harassment",
  },
  {
    id: 2,
    reporter: { name: "Tanaka Yuki", avatar: "https://i.pravatar.cc/150?img=12" },
    reported: { name: "Spam Account", avatar: "https://i.pravatar.cc/150?img=13" },
    reason: "Spam",
    description: "Sending promotional links and advertisements in chat.",
    status: "reviewing",
    createdAt: "2024-03-15 12:15",
    type: "spam",
  },
  {
    id: 3,
    reporter: { name: "Le Thi B", avatar: "https://i.pravatar.cc/150?img=14" },
    reported: { name: "Fake Profile", avatar: "https://i.pravatar.cc/150?img=15" },
    reason: "Fake Profile",
    description: "Using someone else&apos;s photos. Reverse image search shows different person.",
    status: "resolved",
    createdAt: "2024-03-14 09:45",
    type: "fake_profile",
  },
  {
    id: 4,
    reporter: { name: "Sato Kenji", avatar: "https://i.pravatar.cc/150?img=16" },
    reported: { name: "User ABC", avatar: "https://i.pravatar.cc/150?img=17" },
    reason: "Inappropriate Content",
    description: "Sharing inappropriate images in profile.",
    status: "dismissed",
    createdAt: "2024-03-13 18:20",
    type: "inappropriate",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "text-amber-500", bg: "bg-amber-500/10", icon: Clock },
  reviewing: { label: "Reviewing", color: "text-blue-500", bg: "bg-blue-500/10", icon: Eye },
  resolved: { label: "Resolved", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle },
  dismissed: { label: "Dismissed", color: "text-muted-foreground", bg: "bg-muted", icon: CheckCircle },
}

const typeConfig = {
  harassment: { label: "Harassment", color: "text-red-500", bg: "bg-red-500/10" },
  spam: { label: "Spam", color: "text-amber-500", bg: "bg-amber-500/10" },
  fake_profile: { label: "Fake Profile", color: "text-purple-500", bg: "bg-purple-500/10" },
  inappropriate: { label: "Inappropriate", color: "text-pink-500", bg: "bg-pink-500/10" },
  other: { label: "Other", color: "text-muted-foreground", bg: "bg-muted" },
}

export function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const pendingCount = reports.filter(r => r.status === "pending").length
  const reviewingCount = reports.filter(r => r.status === "reviewing").length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-500/10">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{reviewingCount}</p>
              <p className="text-sm text-muted-foreground">Reviewing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Resolved (30d)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-sm text-muted-foreground">Users Banned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flag className="w-5 h-5 text-primary" />
                Recent Reports
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report) => {
              const status = statusConfig[report.status]
              const type = typeConfig[report.type]
              const StatusIcon = status.icon
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={cn(
                    "p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors",
                    selectedReport?.id === report.id && "bg-muted/50 border-primary"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={report.reported.avatar}
                          alt={report.reported.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                          <Flag className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.reported.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Reported by {report.reporter.name}
                        </p>
                      </div>
                    </div>
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      status.bg, status.color
                    )}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      type.bg, type.color
                    )}>
                      {type.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.createdAt}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Report Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedReport ? (
              <div className="space-y-6">
                {/* Reported User */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Reported User</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedReport.reported.avatar}
                      alt={selectedReport.reported.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{selectedReport.reported.name}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Reporter */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedReport.reporter.avatar}
                      alt={selectedReport.reporter.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-medium text-foreground">{selectedReport.reporter.name}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
                    {selectedReport.description}
                  </p>
                </div>

                {/* Actions */}
                {selectedReport.status === "pending" || selectedReport.status === "reviewing" ? (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <Button className="w-full gap-2" variant="destructive">
                      <Ban className="w-4 h-4" />
                      Ban User
                    </Button>
                    <Button className="w-full gap-2" variant="outline">
                      <MessageSquare className="w-4 h-4" />
                      Send Warning
                    </Button>
                    <Button className="w-full gap-2" variant="ghost">
                      <CheckCircle className="w-4 h-4" />
                      Dismiss Report
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      This report has been {selectedReport.status}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <User className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a report to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
