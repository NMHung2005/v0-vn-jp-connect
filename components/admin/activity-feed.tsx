import { cn } from "@/lib/utils"
import {
  UserPlus,
  FileText,
  MessageSquare,
  Calendar,
  Flag,
  CheckCircle2,
} from "lucide-react"

interface Activity {
  id: string
  type: "user" | "post" | "message" | "event" | "report" | "approval"
  title: string
  description: string
  time: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "user",
    title: "New user registered",
    description: "Nguyen Van Anh from Vietnam joined the platform",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "post",
    title: "New post created",
    description: "Language Exchange in Tokyo - Looking for partners",
    time: "15 minutes ago",
  },
  {
    id: "3",
    type: "report",
    title: "Content flagged",
    description: "A post has been reported for review",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "event",
    title: "Event created",
    description: "VN-JP Cultural Festival 2026 published",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "approval",
    title: "User verified",
    description: "Tanaka Yuki profile verification completed",
    time: "3 hours ago",
  },
  {
    id: "6",
    type: "message",
    title: "Support ticket",
    description: "New support request from user Le Minh",
    time: "5 hours ago",
  },
]

const activityIcons = {
  user: UserPlus,
  post: FileText,
  message: MessageSquare,
  event: Calendar,
  report: Flag,
  approval: CheckCircle2,
}

const activityColors = {
  user: "bg-blue-100 text-blue-600",
  post: "bg-emerald-100 text-emerald-600",
  message: "bg-purple-100 text-purple-600",
  event: "bg-amber-100 text-amber-600",
  report: "bg-red-100 text-red-600",
  approval: "bg-teal-100 text-teal-600",
}

export function ActivityFeed() {
  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              Activity Feed
            </h3>
            <p className="text-sm text-muted-foreground">
              Recent platform activities
            </p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            View all
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type]
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    activityColors[activity.type]
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {index < activities.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-card-foreground">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
