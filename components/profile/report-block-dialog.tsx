"use client"

import { useState } from "react"
import { AlertTriangle, Flag, ShieldOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReportBlockDialogProps {
  isOpen: boolean
  onClose: () => void
  type: "report" | "block"
  userName: string
}

const reportReasons = [
  { id: "spam", label: "Spam or scam" },
  { id: "harassment", label: "Harassment or bullying" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "fake", label: "Fake profile" },
  { id: "offensive", label: "Offensive behavior" },
  { id: "other", label: "Other" },
]

export function ReportBlockDialog({ isOpen, onClose, type, userName }: ReportBlockDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Close after showing success
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setSelectedReason("")
      setAdditionalInfo("")
    }, 2000)
  }

  const handleClose = () => {
    onClose()
    setSelectedReason("")
    setAdditionalInfo("")
    setIsSubmitted(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div className="relative w-full max-w-md mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={cn(
          "flex items-center gap-3 px-6 py-4",
          type === "report" ? "bg-amber-500/10" : "bg-destructive/10"
        )}>
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            type === "report" ? "bg-amber-500/20 text-amber-600" : "bg-destructive/20 text-destructive"
          )}>
            {type === "report" ? (
              <Flag className="w-5 h-5" />
            ) : (
              <ShieldOff className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">
              {type === "report" ? "Report User" : "Block User"}
            </h2>
            <p className="text-sm text-muted-foreground">{userName}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {type === "report" ? "Report Submitted" : "User Blocked"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {type === "report" 
                  ? "Thank you for helping keep our community safe."
                  : `You will no longer see ${userName} or receive messages from them.`
                }
              </p>
            </div>
          ) : type === "block" ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    Are you sure you want to block {userName}?
                  </p>
                  <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                    <li>They won&apos;t be able to see your profile</li>
                    <li>They won&apos;t be able to message you</li>
                    <li>You won&apos;t see them in your feed</li>
                    <li>You can unblock them later in settings</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please select a reason for reporting this user:
              </p>
              
              <div className="space-y-2">
                {reportReasons.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border transition-colors",
                      selectedReason === reason.id
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-muted-foreground/30 text-foreground"
                    )}
                  >
                    {reason.label}
                  </button>
                ))}
              </div>

              {selectedReason && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Additional details (optional)
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Provide more context about this report..."
                    className="w-full h-24 px-3 py-2 text-sm bg-muted/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="flex items-center gap-3 px-6 py-4 border-t border-border bg-muted/30">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant={type === "block" ? "destructive" : "default"}
              className={cn(
                "flex-1",
                type === "report" && "bg-amber-500 hover:bg-amber-600 text-white"
              )}
              onClick={handleSubmit}
              disabled={type === "report" && !selectedReason || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : type === "block" ? (
                "Block User"
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
