"use client"

import { useState } from "react"
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
import { cn } from "@/lib/utils"
import { Sparkles, MessageSquareHeart } from "lucide-react"

interface FeedbackDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (feedback: { reaction: string; comment?: string }) => void
  userName: string
  messageCount: number
}

const reactions = [
  { emoji: "😊", label: "Happy", color: "hover:bg-amber-100 hover:border-amber-300" },
  { emoji: "🤩", label: "Amazing", color: "hover:bg-pink-100 hover:border-pink-300" },
  { emoji: "😄", label: "Fun", color: "hover:bg-green-100 hover:border-green-300" },
  { emoji: "🥰", label: "Friendly", color: "hover:bg-rose-100 hover:border-rose-300" },
  { emoji: "🤔", label: "Interesting", color: "hover:bg-blue-100 hover:border-blue-300" },
  { emoji: "😐", label: "Neutral", color: "hover:bg-gray-100 hover:border-gray-300" },
]

export function FeedbackDialog({
  isOpen,
  onClose,
  onSubmit,
  userName,
  messageCount,
}: FeedbackDialogProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedReaction) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    onSubmit({
      reaction: selectedReaction,
      comment: comment.trim() || undefined,
    })

    // Reset state
    setSelectedReaction(null)
    setComment("")
    setIsSubmitting(false)
    onClose()
  }

  const handleSkip = () => {
    setSelectedReaction(null)
    setComment("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <MessageSquareHeart className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">How was your conversation?</DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve exchanged <span className="font-semibold text-primary">{messageCount} messages</span> with{" "}
            <span className="font-semibold">{userName}</span>. Share your experience!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Reaction Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              How do you feel about this conversation?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {reactions.map((reaction) => (
                <button
                  key={reaction.emoji}
                  onClick={() => setSelectedReaction(reaction.emoji)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                    selectedReaction === reaction.emoji
                      ? "border-primary bg-primary/5 scale-105 shadow-md"
                      : "border-border bg-card",
                    reaction.color
                  )}
                >
                  <span className="text-3xl">{reaction.emoji}</span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {reaction.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Comment */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Any comments? <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this conversation..."
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full sm:w-auto"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedReaction || isSubmitting}
            className="w-full sm:w-auto gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MessageSquareHeart className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
