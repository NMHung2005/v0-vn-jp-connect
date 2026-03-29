"use client"

import { useState } from "react"
import { Search, Filter, CheckCircle, XCircle, Eye, Building2, FileText, Calendar, Clock, X, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

type ApplicationStatus = "pending" | "approved" | "rejected"
type TabType = "applications" | "grant-role"

interface OrganizerApplication {
  id: string
  organizationName: string
  representativeName: string
  email: string
  phone: string
  country: "VN" | "JP"
  organizationType: string
  description: string
  documents: string[]
  submittedDate: string
  status: ApplicationStatus
  eventsPlanned: number
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
  country: "VN" | "JP"
  role: "user" | "organizer"
  joinDate: string
}

const mockApplications: OrganizerApplication[] = [
  {
    id: "org1",
    organizationName: "Japan-Vietnam Cultural Exchange Association",
    representativeName: "Tanaka Taro",
    email: "tanaka@jvcea.org",
    phone: "+81-90-1234-5678",
    country: "JP",
    organizationType: "Non-profit Organization",
    description: "Organization specializing in Japan-Vietnam cultural exchange, active since 2015",
    documents: ["Business Registration", "Organization Charter", "2023 Activity Report"],
    submittedDate: "2024-03-25",
    status: "pending",
    eventsPlanned: 5,
  },
  {
    id: "org2",
    organizationName: "VN-JP Youth Association HCMC",
    representativeName: "Nguyen Thi Mai",
    email: "mai.nguyen@vjyouth.vn",
    phone: "+84-90-123-4567",
    country: "VN",
    organizationType: "Youth Association",
    description: "Youth association connecting VN-JP communities in HCMC, established in 2018",
    documents: ["Establishment Decision", "Executive Board List"],
    submittedDate: "2024-03-24",
    status: "pending",
    eventsPlanned: 3,
  },
  {
    id: "org3",
    organizationName: "Tokyo Vietnamese Community",
    representativeName: "Le Van Hung",
    email: "hung.le@tvc.jp",
    phone: "+81-80-9876-5432",
    country: "JP",
    organizationType: "Community",
    description: "Vietnamese community in Tokyo, supporting students and workers from Vietnam",
    documents: ["Activity Permit", "Member List"],
    submittedDate: "2024-03-22",
    status: "approved",
    eventsPlanned: 8,
  },
  {
    id: "org4",
    organizationName: "Sakura Education Center",
    representativeName: "Sato Misaki",
    email: "sato@sakura-edu.jp",
    phone: "+81-90-5555-1234",
    country: "JP",
    organizationType: "Education Center",
    description: "Vietnamese language teaching center and cultural exchange activities",
    documents: ["Education License", "Training Program"],
    submittedDate: "2024-03-20",
    status: "rejected",
    eventsPlanned: 2,
  },
  {
    id: "org5",
    organizationName: "Vietnam-Japan Business Network",
    representativeName: "Pham Quoc Bao",
    email: "bao.pham@vjbn.vn",
    phone: "+84-28-1234-5678",
    country: "VN",
    organizationType: "Business Association",
    description: "Network connecting VN-JP businesses, supporting investment and trade",
    documents: ["Business Registration", "Member List", "Activity Plan"],
    submittedDate: "2024-03-18",
    status: "pending",
    eventsPlanned: 4,
  },
]

const mockUsers: User[] = [
  { id: "u1", name: "Nguyen Van An", email: "an.nguyen@email.com", avatar: "NA", country: "VN", role: "user", joinDate: "2024-01-15" },
  { id: "u2", name: "Tanaka Taro", email: "tanaka@email.jp", avatar: "TT", country: "JP", role: "user", joinDate: "2024-02-20" },
  { id: "u3", name: "Tran Thi Binh", email: "binh.tran@email.com", avatar: "TB", country: "VN", role: "organizer", joinDate: "2024-01-10" },
  { id: "u4", name: "Sato Hanako", email: "sato.hanako@email.jp", avatar: "SH", country: "JP", role: "user", joinDate: "2024-03-05" },
  { id: "u5", name: "Le Minh Chau", email: "chau.le@email.com", avatar: "LC", country: "VN", role: "user", joinDate: "2023-12-01" },
  { id: "u6", name: "Yamada Kenichi", email: "yamada@email.jp", avatar: "YK", country: "JP", role: "organizer", joinDate: "2024-02-28" },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
}

const roleConfig = {
  user: { label: "User", color: "bg-muted text-muted-foreground" },
  organizer: { label: "Event Organizer", color: "bg-primary/10 text-primary" },
}

export default function OrganizersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("applications")
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<OrganizerApplication | null>(null)
  const [showGrantModal, setShowGrantModal] = useState(false)
  const [selectedUserForGrant, setSelectedUserForGrant] = useState<User | null>(null)
  const [userSearchQuery, setUserSearchQuery] = useState("")

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.representativeName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
    return matchesSearch
  })

  const pendingCount = mockApplications.filter(a => a.status === "pending").length
  const approvedCount = mockApplications.filter(a => a.status === "approved").length
  const organizerCount = mockUsers.filter(u => u.role === "organizer").length

  const handleGrantRole = (user: User) => {
    setSelectedUserForGrant(user)
    setShowGrantModal(true)
  }

  const confirmGrantRole = () => {
    console.log(`Granting organizer role to ${selectedUserForGrant?.name}`)
    setShowGrantModal(false)
    setSelectedUserForGrant(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Event Organizer Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Review organization applications and grant Event Organizer role (Role 3)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("applications")}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
            activeTab === "applications"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Organization Applications
          {pendingCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("grant-role")}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2",
            activeTab === "grant-role"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <UserPlus className="w-4 h-4" />
          Grant Role
        </button>
      </div>

      {activeTab === "applications" ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Applications</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Approved Organizations</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockApplications.reduce((sum, a) => sum + a.eventsPlanned, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Planned Events</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div key={application.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{application.organizationName}</h3>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full font-medium",
                          statusConfig[application.status].color
                        )}>
                          {statusConfig[application.status].label}
                        </span>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full font-medium",
                          application.country === "VN" ? "bg-red-100 text-red-700" : "bg-rose-100 text-rose-700"
                        )}>
                          {application.country === "VN" ? "Vietnam" : "Japan"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{application.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Representative: <span className="font-medium text-foreground">{application.representativeName}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Type: <span className="font-medium text-foreground">{application.organizationType}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Submitted: <span className="font-medium text-foreground">{new Date(application.submittedDate).toLocaleDateString("en-US")}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {application.documents.length} attached documents
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    </button>
                    {application.status === "pending" && (
                      <>
                        <button className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Grant Role Tab */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Grant Event Organizer Role</h3>
                <p className="text-sm text-muted-foreground">
                  Search for users and grant them Event Organizer (Role 3) permissions
                </p>
              </div>
            </div>

            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Users with Event Organizer role can create and manage events on the platform. 
                Currently there are <span className="font-semibold">{organizerCount}</span> users with this role.
              </p>
            </div>

            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Users Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Country</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Current Role</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Join Date</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-full font-medium",
                          user.country === "VN" ? "bg-red-100 text-red-700" : "bg-rose-100 text-rose-700"
                        )}>
                          {user.country === "VN" ? "Vietnam" : "Japan"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-full font-medium",
                          roleConfig[user.role].color
                        )}>
                          {roleConfig[user.role].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(user.joinDate).toLocaleDateString("en-US")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          {user.role === "user" ? (
                            <button
                              onClick={() => handleGrantRole(user)}
                              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                            >
                              <UserPlus className="w-4 h-4" />
                              Grant Role
                            </button>
                          ) : (
                            <button
                              className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                            >
                              Revoke Role
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Organization Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Organization Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Organization Name</p>
                    <p className="font-medium text-foreground">{selectedApplication.organizationName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground">{selectedApplication.organizationType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium text-foreground">
                      {selectedApplication.country === "VN" ? "Vietnam" : "Japan"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className={cn(
                      "inline-block px-2 py-0.5 text-xs rounded-full font-medium",
                      statusConfig[selectedApplication.status].color
                    )}>
                      {statusConfig[selectedApplication.status].label}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-foreground">{selectedApplication.description}</p>
                </div>
              </div>

              {/* Representative Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Representative</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-foreground">{selectedApplication.representativeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedApplication.submittedDate).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Attached Documents</h3>
                <div className="space-y-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc}</span>
                      <button className="ml-auto text-sm text-primary hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Info (if approved) */}
              {selectedApplication.status === "approved" && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-2">Granted Account Information</h4>
                  <p className="text-sm text-emerald-700">
                    Event Organizer account (Role 3) has been granted to: {selectedApplication.email}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            {selectedApplication.status === "pending" && (
              <div className="p-6 border-t border-border flex gap-3">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  Reject
                </button>
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Approve & Grant Account
                </button>
              </div>
            )}
            {selectedApplication.status !== "pending" && (
              <div className="p-6 border-t border-border">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grant Role Confirmation Modal */}
      {showGrantModal && selectedUserForGrant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Grant Event Organizer Role</h2>
              <button
                onClick={() => {
                  setShowGrantModal(false)
                  setSelectedUserForGrant(null)
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
                {selectedUserForGrant.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground">{selectedUserForGrant.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUserForGrant.email}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to grant <span className="font-medium text-foreground">Event Organizer (Role 3)</span> permissions to this user? 
              They will be able to create and manage events on the platform.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowGrantModal(false)
                  setSelectedUserForGrant(null)
                }}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmGrantRole}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Confirm Grant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
