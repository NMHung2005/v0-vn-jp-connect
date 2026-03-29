"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Mail,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface User {
  id: number
  name: string
  email: string
  avatar: string
  nationality: "VN" | "JP"
  status: "active" | "pending" | "suspended"
  joinedAt: string
  lastActive: string
  connections: number
  messages: number
}

const users: User[] = [
  {
    id: 1,
    name: "Nguyen Van Minh",
    email: "minh.nguyen@email.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    nationality: "VN",
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2 hours ago",
    connections: 45,
    messages: 234,
  },
  {
    id: 2,
    name: "Tanaka Yuki",
    email: "yuki.tanaka@email.jp",
    avatar: "https://i.pravatar.cc/150?img=2",
    nationality: "JP",
    status: "active",
    joinedAt: "2024-02-20",
    lastActive: "5 minutes ago",
    connections: 32,
    messages: 189,
  },
  {
    id: 3,
    name: "Tran Thi Lan",
    email: "lan.tran@email.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    nationality: "VN",
    status: "pending",
    joinedAt: "2024-03-10",
    lastActive: "1 day ago",
    connections: 0,
    messages: 0,
  },
  {
    id: 4,
    name: "Suzuki Kenji",
    email: "kenji.suzuki@email.jp",
    avatar: "https://i.pravatar.cc/150?img=4",
    nationality: "JP",
    status: "suspended",
    joinedAt: "2023-11-05",
    lastActive: "2 weeks ago",
    connections: 67,
    messages: 432,
  },
  {
    id: 5,
    name: "Le Hoang Nam",
    email: "nam.le@email.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    nationality: "VN",
    status: "active",
    joinedAt: "2024-01-28",
    lastActive: "30 minutes ago",
    connections: 28,
    messages: 156,
  },
]

const statusConfig = {
  active: { label: "Active", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle },
  pending: { label: "Pending", color: "text-amber-500", bg: "bg-amber-500/10", icon: Clock },
  suspended: { label: "Suspended", color: "text-destructive", bg: "bg-destructive/10", icon: XCircle },
}

export function UsersTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <UserCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12,453</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-500/10">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">234</p>
              <p className="text-sm text-muted-foreground">Pending Verification</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-destructive/10">
              <UserX className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">160</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Users</CardTitle>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-64"
                />
              </div>
              
              {/* Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    {statusFilter === "all" ? "All Status" : statusConfig[statusFilter as keyof typeof statusConfig]?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>
                    Suspended
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Active</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Connections</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Messages</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const status = statusConfig[user.status]
                  const StatusIcon = status.icon
                  return (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">{user.name}</p>
                              <span className={cn(
                                "px-1.5 py-0.5 rounded text-[10px] font-bold text-white",
                                user.nationality === "JP" ? "bg-red-500" : "bg-yellow-500"
                              )}>
                                {user.nationality}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          status.bg, status.color
                        )}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{user.joinedAt}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{user.lastActive}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{user.connections}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{user.messages}</td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "suspended" ? (
                              <DropdownMenuItem className="text-emerald-500">
                                <UserCheck className="w-4 h-4 mr-2" />
                                Unsuspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-destructive">
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
