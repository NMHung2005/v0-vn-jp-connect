import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  country: "vietnam" | "japan"
  status: "active" | "pending" | "inactive"
  joinedAt: string
}

const recentUsers: User[] = [
  {
    id: "1",
    name: "Nguyen Van Anh",
    email: "anh.nguyen@email.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    country: "vietnam",
    status: "active",
    joinedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Tanaka Yuki",
    email: "yuki.tanaka@email.jp",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    country: "japan",
    status: "active",
    joinedAt: "5 hours ago",
  },
  {
    id: "3",
    name: "Tran Minh Duc",
    email: "duc.tran@email.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    country: "vietnam",
    status: "pending",
    joinedAt: "1 day ago",
  },
  {
    id: "4",
    name: "Sato Hana",
    email: "hana.sato@email.jp",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    country: "japan",
    status: "active",
    joinedAt: "2 days ago",
  },
  {
    id: "5",
    name: "Le Thi Mai",
    email: "mai.le@email.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    country: "vietnam",
    status: "inactive",
    joinedAt: "3 days ago",
  },
]

const statusStyles = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  inactive: "bg-slate-100 text-slate-600 border-slate-200",
}

const countryFlags = {
  vietnam: "VN",
  japan: "JP",
}

export function RecentUsers() {
  return (
    <div className="bg-card border border-border rounded-xl">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              Recent Users
            </h3>
            <p className="text-sm text-muted-foreground">
              New registrations this week
            </p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            View all
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {recentUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {user.name}
                </p>
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {countryFlags[user.country]}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <div className="text-right">
              <Badge
                variant="outline"
                className={statusStyles[user.status]}
              >
                {user.status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {user.joinedAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
