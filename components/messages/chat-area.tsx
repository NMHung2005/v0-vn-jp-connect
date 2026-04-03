"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle2,
  ChevronDown,
  Copy,
  Languages,
  Lightbulb,
  Paperclip,
  Phone,
  Send,
  Smile,
  User,
  Users,
  Video,
  Volume2,
} from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Conversation, UserProfile } from "@/components/messages/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ChatAreaProps {
  conversation: Conversation | null
  usersById: Record<string, UserProfile>
  onSendMessage: (conversationId: string, text: string) => void
  onAddMembers: () => void
}

const topicSuggestions = [
  { icon: "🎌", text: "日本の文化について聞く" },
  { icon: "🍜", text: "好きな食べ物について話す" },
  { icon: "📚", text: "語学学習のコツを共有する" },
  { icon: "🎬", text: "映画やアニメについて話す" },
  { icon: "✈️", text: "旅行の経験について聞く" },
  { icon: "🎵", text: "好きな音楽について話し合う" },
]

export function ChatArea({ conversation, usersById, onSendMessage, onAddMembers }: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState("")
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({})
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false)
  const [translateMode, setTranslateMode] = useState<"vi-jp" | "jp-vi">("vi-jp")
  const [showTranslatePanel, setShowTranslatePanel] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedResult, setTranslatedResult] = useState("")
  const [showLikePopup, setShowLikePopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  const t = useTranslations("Messages")
  const locale = useLocale()

  useEffect(() => {
    setMessageInput("")
    setShowTranslation({})
    setShowTopicSuggestions(false)
    setShowTranslatePanel(false)
    setTextToTranslate("")
    setTranslatedResult("")
    setShowLikePopup(false)
    setHasShownPopup(false)
  }, [conversation?.id])

  useEffect(() => {
    if (conversation?.kind === "direct" && conversation.messages.length >= 10 && !hasShownPopup) {
      setShowLikePopup(true)
      setHasShownPopup(true)
    }
  }, [conversation?.kind, conversation?.messages.length, hasShownPopup])

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{t("yourMessages")}</h3>
          <p className="text-sm text-muted-foreground">{t("selectToChat")}</p>
        </div>
      </div>
    )
  }

  const participants = conversation.participantIds
    .map((memberId) => usersById[memberId])
    .filter((participant): participant is UserProfile => Boolean(participant))
  const primaryParticipant = participants[0]
  const isGroupConversation = conversation.kind === "group"
  const conversationTitle =
    isGroupConversation
      ? conversation.groupName || t("groupChat")
      : primaryParticipant
        ? t(`users.${primaryParticipant.nameKey}`)
        : t("yourMessages")

  const handleToggleTranslation = (messageId: string) => {
    setShowTranslation((currentState) => ({
      ...currentState,
      [messageId]: !currentState[messageId],
    }))
  }

  const handleTranslate = () => {
    if (translateMode === "vi-jp") {
      setTranslatedResult("これは翻訳されたテキストです。")
    } else {
      setTranslatedResult("Đây là văn bản đã được dịch.")
    }
  }

  const handleTopicClick = (topic: string) => {
    setMessageInput(topic)
    setShowTopicSuggestions(false)
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) {
      return
    }

    onSendMessage(conversation.id, messageInput.trim())
    setMessageInput("")
  }

  return (
    <div className="flex-1 flex flex-col bg-background relative">
      {/* Chat Header */}
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 min-w-0">
          {isGroupConversation ? (
            <div className="relative h-11 w-11 flex-shrink-0">
              {participants.slice(0, 3).map((participant, index) => (
                <img
                  key={participant.id}
                  src={participant.avatar}
                  alt={t(`users.${participant.nameKey}`)}
                  className={cn(
                    "absolute h-8 w-8 rounded-full border-2 border-card object-cover",
                    index === 0 && "left-0 top-2",
                    index === 1 && "right-0 top-0",
                    index === 2 && "left-4 bottom-0",
                  )}
                />
              ))}
            </div>
          ) : primaryParticipant ? (
            <div className="relative">
              <img
                src={primaryParticipant.avatar}
                alt={conversationTitle}
                className="w-10 h-10 rounded-full object-cover"
              />
              {primaryParticipant.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
              )}
            </div>
          ) : null}

          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="font-semibold text-foreground truncate">{conversationTitle}</h2>
              {primaryParticipant && !isGroupConversation && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold text-white",
                    primaryParticipant.nationality === "JP" ? "bg-red-500" : "bg-yellow-500",
                  )}
                >
                  {primaryParticipant.nationality}
                </span>
              )}
              {isGroupConversation && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground inline-flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {t("groupChat")}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {isGroupConversation
                ? t("memberCount", { count: conversation.participantIds.length + 1 })
                : primaryParticipant && primaryParticipant.online
                  ? t("online")
                  : t("offline")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/${locale}/home/user/${primaryParticipant?.id ?? ""}`}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-colors",
              !primaryParticipant && "pointer-events-none opacity-50",
            )}
          >
            <User className="w-4 h-4" />
            <span>{t("viewProfile")}</span>
          </Link>
          {isGroupConversation && (
            <button
              onClick={onAddMembers}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/15 rounded-full text-sm font-medium text-primary transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>{t("addMembers")}</span>
            </button>
          )}
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Phone className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Video className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.messages.map((message) => {
          const sender = usersById[message.senderId]
          const senderName = sender ? t(`users.${sender.nameKey}`) : message.senderId

          return (
            <div
              key={message.id}
              className={cn("flex", message.isOwn ? "justify-end" : "justify-start")}
            >
              <div className={cn("max-w-[72%] group", message.isOwn ? "order-1" : "order-2")}> 
                {!message.isOwn && isGroupConversation && (
                  <p className="mb-1 px-1 text-xs font-medium text-muted-foreground">{senderName}</p>
                )}
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl",
                    message.isOwn
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>

                  {showTranslation[message.id] && message.translatedText && (
                    <div
                      className={cn(
                        "mt-2 pt-2 border-t text-sm italic",
                        message.isOwn
                          ? "border-primary-foreground/20 text-primary-foreground/80"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {message.translatedText}
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    "flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
                    message.isOwn ? "justify-end" : "justify-start",
                  )}
                >
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                  {message.translatedText && (
                    <button
                      onClick={() => handleToggleTranslation(message.id)}
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Languages className="w-3 h-3" />
                      {showTranslation[message.id] ? t("hide") : t("translate")}
                    </button>
                  )}
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Volume2 className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Copy className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Topic Suggestions Panel */}
      {showTopicSuggestions && (
        <div className="px-6 py-3 border-t border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Lightbulb className="w-4 h-4 text-primary" />
              {t("topicSuggestions")} 
            </div>
            <button
              onClick={() => setShowTopicSuggestions(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {topicSuggestions.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic.text)}
                className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm text-foreground transition-colors"
              >
                <span>{topic.icon}</span>
                <span>{topic.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Translation Panel */}
      {showTranslatePanel && (
        <div className="px-6 py-4 border-t border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Languages className="w-4 h-4 text-primary" />
              {t("translationHelper")}
            </div>
            <button
              onClick={() => setShowTranslatePanel(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setTranslateMode("vi-jp")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                translateMode === "vi-jp"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {t("vietnameseToJapanese")}
            </button>
            <button
              onClick={() => setTranslateMode("jp-vi")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                translateMode === "jp-vi"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {t("japaneseToVietnamese")}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {translateMode === "vi-jp" ? t("vietnamese") : t("japanese")}
              </label>
              <textarea
                value={textToTranslate}
                onChange={(event) => setTextToTranslate(event.target.value)}
                placeholder={translateMode === "vi-jp" ? "Nhập tiếng Việt..." : "日本語を入力..."}
                className="w-full h-24 p-3 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {translateMode === "vi-jp" ? t("japanese") : t("vietnamese")}
              </label>
              <div className="w-full h-24 p-3 bg-muted/50 rounded-lg text-sm text-foreground overflow-y-auto">
                {translatedResult || (
                  <span className="text-muted-foreground italic">{t("translationWillAppearHere")}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handleTranslate}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t("translateButton")}
            </button>
            {translatedResult && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessageInput((currentValue) => `${currentValue} ${translatedResult}`.trim())}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t("useInMessage")}
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="border-t border-border bg-card px-6 py-4">
        <div className="flex items-end gap-3">
          <button
            onClick={() => setShowTopicSuggestions((currentValue) => !currentValue)}
            className="p-2.5 rounded-full hover:bg-muted transition-colors"
          >
            <Lightbulb className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => setShowTranslatePanel((currentValue) => !currentValue)}
            className="p-2.5 rounded-full hover:bg-muted transition-colors"
          >
            <Languages className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              placeholder={t("typeMessage")}
              rows={1}
              className="w-full min-h-[52px] max-h-32 resize-none rounded-2xl border border-border bg-background px-4 py-3 pr-24 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <button className="rounded-full p-2 hover:bg-muted transition-colors">
                <Smile className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="rounded-full p-2 hover:bg-muted transition-colors">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Dialog open={showLikePopup} onOpenChange={setShowLikePopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("likePopupTitle")}</DialogTitle>
            <DialogDescription>
              {primaryParticipant
                ? t("likePopupDescription", {
                    name: t(`users.${primaryParticipant.nameKey}`),
                    count: conversation.messages.length,
                  })
                : t("likePopupDescription", { name: conversationTitle, count: conversation.messages.length })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setShowLikePopup(false)}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {t("maybeLater")}
            </button>
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {t("likeButton")}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}