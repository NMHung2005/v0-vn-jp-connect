"use client"

import { useState } from "react"
import { 
  X, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Heart,
  MessageCircle,
  UserPlus,
  Flag,
  Ban,
  MoreHorizontal,
  ThumbsUp,
  Languages,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface UserProfile {
  id: string
  name: string
  avatar: string
  coverImage: string
  online: boolean
  nationality: "VN" | "JP"
  age: number
  location: string
  joinedDate: string
  occupation: string
  education: string
  bio: string
  interests: string[]
  languages: { name: string; level: string; proficiency: number }[]
  stats: {
    connections: number
    likesReceived: number
    likeRatio: number
    exchanges: number
  }
}

interface ChatProfilePanelProps {
  isOpen: boolean
  onClose: () => void
  user: {
    name: string
    avatar: string
    online: boolean
    nationality: "VN" | "JP"
  }
}

// Mock detailed user data
const getUserProfile = (user: ChatProfilePanelProps["user"]): UserProfile => ({
  id: "1",
  name: user.name,
  avatar: user.avatar,
  coverImage: "/images/profile-cover.jpg",
  online: user.online,
  nationality: user.nationality,
  age: 25,
  location: user.nationality === "JP" ? "Tokyo, Japan" : "Ho Chi Minh City, Vietnam",
  joinedDate: "March 2024",
  occupation: user.nationality === "JP" ? "Software Engineer" : "Business Analyst",
  education: user.nationality === "JP" ? "Tokyo University" : "HCMC University",
  bio: user.nationality === "JP" 
    ? "I love learning Vietnamese and want to make friends from Vietnam. I can help you with Japanese!"
    : "Passionate about Japanese culture and language. Looking for language exchange partners.",
  interests: user.nationality === "JP" 
    ? ["Anime", "Cooking", "Travel", "Music", "Photography"]
    : ["J-Pop", "Manga", "Cooking", "Movies", "Travel"],
  languages: user.nationality === "JP"
    ? [
        { name: "Japanese", level: "Native", proficiency: 100 },
        { name: "Vietnamese", level: "Intermediate", proficiency: 50 },
        { name: "English", level: "Advanced", proficiency: 85 },
      ]
    : [
        { name: "Vietnamese", level: "Native", proficiency: 100 },
        { name: "Japanese", level: "N3", proficiency: 60 },
        { name: "English", level: "Advanced", proficiency: 80 },
      ],
  stats: {
    connections: 156,
    likesReceived: 234,
    likeRatio: 92,
    exchanges: 45,
  },
})

const reportReasons = [
  "Inappropriate content",
  "Spam or scam",
  "Harassment or bullying",
  "Fake profile",
  "Other",
]

export function ChatProfilePanel({ isOpen, onClose, user }: ChatProfilePanelProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")

  const profile = getUserProfile(user)

  const getProgressColor = (proficiency: number) => {
    if (proficiency >= 80) return "bg-emerald-500"
    if (proficiency >= 50) return "bg-sky-500"
    return "bg-amber-500"
  }

  const handleReport = () => {
    // Handle report submission
    setShowReportDialog(false)
    setReportReason("")
    setReportDetails("")
  }

  const handleBlock = () => {
    // Handle block
    setShowBlockDialog(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="w-80 border-l border-border bg-card flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Profile</h3>
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href={`/home/user/${profile.id}`} className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Full Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setShowReportDialog(true)}
                  className="text-amber-600"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report User
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowBlockDialog(true)}
                  className="text-destructive"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Block User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Cover & Avatar */}
          <div className="relative">
            <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/10">
              <img 
                src={profile.coverImage} 
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 left-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full border-4 border-card object-cover"
                />
                {profile.online && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full" />
                )}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-12 px-4 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-lg text-foreground">{profile.name}</h4>
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-bold text-white",
                profile.nationality === "JP" ? "bg-red-500" : "bg-yellow-500"
              )}>
                {profile.nationality}
              </span>
              <span className="text-muted-foreground text-sm">{profile.age}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location}</span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-foreground">{profile.stats.connections}</div>
                <div className="text-xs text-muted-foreground">Connections</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="text-lg font-bold text-foreground">{profile.stats.exchanges}</div>
                <div className="text-xs text-muted-foreground">Exchanges</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-lg font-bold text-foreground">{profile.stats.likeRatio}%</span>
                </div>
                <div className="text-xs text-muted-foreground">Like Ratio</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
                  isLiked 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                {isLiked ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => setIsConnected(!isConnected)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
                  isConnected 
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30" 
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                <UserPlus className="w-4 h-4" />
                {isConnected ? "Connected" : "Connect"}
              </button>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-foreground mb-2">About</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
            </div>

            {/* Interests */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-foreground mb-2">Interests</h5>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <span 
                    key={interest}
                    className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="w-4 h-4 text-primary" />
                <h5 className="text-sm font-semibold text-foreground">Languages</h5>
              </div>
              <div className="space-y-3">
                {profile.languages.map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all", getProgressColor(lang.proficiency))}
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{profile.occupation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{profile.education}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined {profile.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report {profile.name}</DialogTitle>
            <DialogDescription>
              Please select a reason for reporting this user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={reportReason} onValueChange={setReportReason}>
              {reportReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason} id={reason} />
                  <Label htmlFor={reason}>{reason}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="details">Additional details (optional)</Label>
              <Textarea
                id="details"
                placeholder="Provide more information..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReport}
              disabled={!reportReason}
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block {profile.name}?</DialogTitle>
            <DialogDescription>
              This user will no longer be able to message you or see your profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlock}>
              Block User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
