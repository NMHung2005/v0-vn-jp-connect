"use client"

import { useState, useEffect } from "react"
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video,
  Languages,
  Lightbulb,
  ChevronDown,
  CheckCircle2,
  Copy,
  Volume2,
  User,
  ThumbsUp,
  Heart,
  X,
  ThumbsDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface Message {
  id: string
  senderId: string
  text: string
  translatedText?: string
  time: string
  isOwn: boolean
}

interface ChatAreaProps {
  conversationId: string | null
}

const conversationData: Record<string, {
  user: { id: number; nameKey: string; avatar: string; online: boolean; nationality: "VN" | "JP" }
  messages: Message[]
}> = {
  "1": {
    user: {
      id: 1,
      nameKey: "yuki",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      online: true,
      nationality: "JP",
    },
    messages: [
      {
        id: "1",
        senderId: "yuki",
        text: "こんにちは！はじめまして。",
        translatedText: "Xin chào! Rất vui được gặp bạn.",
        time: "10:30 AM",
        isOwn: false,
      },
      {
        id: "2",
        senderId: "me",
        text: "Xin chào! Rất vui được gặp bạn.",
        translatedText: "こんにちは！お会いできて嬉しいです。",
        time: "10:32 AM",
        isOwn: true,
      },
      {
        id: "3",
        senderId: "yuki",
        text: "ベトナム語を勉強しています。手伝ってもらえますか？",
        translatedText: "Tôi đang học tiếng Việt. Bạn có thể giúp tôi không?",
        time: "10:33 AM",
        isOwn: false,
      },
      {
        id: "4",
        senderId: "me",
        text: "もちろん！ベトナム語の練習を手伝いますよ。日本語を教えてくれませんか？",
        time: "10:35 AM",
        isOwn: true,
      },
      {
        id: "5",
        senderId: "yuki",
        text: "いいですね！喫茶店で会いましょう。",
        time: "10:36 AM",
        isOwn: false,
      },
    ],
  },
}

const topicSuggestions = [
  { icon: "🎌", text: "日本の文化について聞く" },
  { icon: "🍜", text: "好きな食べ物について話す" },
  { icon: "📚", text: "語学学習のコツを共有する" },
  { icon: "🎬", text: "映画やアニメについて話す" },
  { icon: "✈️", text: "旅行の経験について聞く" },
  { icon: "🎵", text: "好きな音楽について話し合う" },
]

export function ChatArea({ conversationId }: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({})
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false)
  const [translateMode, setTranslateMode] = useState<"vi-jp" | "jp-vi">("vi-jp")
  const [showTranslatePanel, setShowTranslatePanel] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedResult, setTranslatedResult] = useState("")
  
  const [showLikePopup, setShowLikePopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  useEffect(() => {
    if (conversationId && conversationData[conversationId]) {
      setMessages(conversationData[conversationId].messages)
      setHasShownPopup(false)
    } else {
      setMessages([])
    }
  }, [conversationId])

  const t = useTranslations("Messages")

  if (!conversationId || !conversationData[conversationId]) {
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

  const { user } = conversationData[conversationId]
  const userName = t(`users.${user.nameKey}`)

  const toggleTranslation = (messageId: string) => {
    setShowTranslation(prev => ({ ...prev, [messageId]: !prev[messageId] }))
  }

  const handleTranslate = () => {
    // Simulated translation
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

  const locale = useLocale()

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setMessageInput("")

    // Check for 10 messages
    if (updatedMessages.length >= 10 && !hasShownPopup) {
      setShowLikePopup(true)
      setHasShownPopup(true)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background relative">
      {/* Chat Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {user.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-foreground">{userName}</h2>
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-bold text-white",
                user.nationality === "JP" ? "bg-red-500" : "bg-yellow-500"
              )}>
                {user.nationality}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {user.online ? t("online") : t("offline")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/home/user/${user.id}`}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{t("viewProfile")}</span>
          </Link>
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
          >
            <div className={cn("max-w-[70%] group", msg.isOwn ? "order-1" : "order-2")}>
              <div
                className={cn(
                  "px-4 py-3 rounded-2xl",
                  msg.isOwn
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {/* Show translation */}
                {showTranslation[msg.id] && msg.translatedText && (
                  <div className={cn(
                    "mt-2 pt-2 border-t text-sm italic",
                    msg.isOwn ? "border-primary-foreground/20 text-primary-foreground/80" : "border-border text-muted-foreground"
                  )}>
                    {msg.translatedText}
                  </div>
                )}
              </div>
              
              {/* Message actions */}
              <div className={cn(
                "flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
                msg.isOwn ? "justify-end" : "justify-start"
              )}>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
                {msg.translatedText && (
                  <button
                    onClick={() => toggleTranslation(msg.id)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Languages className="w-3 h-3" />
                    {showTranslation[msg.id] ? t("hide") : t("translate")}
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
        ))}
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
          
          {/* Language toggle */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setTranslateMode("vi-jp")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                translateMode === "vi-jp" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:text-foreground"
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
                  : "bg-muted text-muted-foreground hover:text-foreground"
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
                onChange={(e) => setTextToTranslate(e.target.value)}
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
                  onClick={() => setMessageInput(prev => prev + " " + translatedResult)}
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

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-border bg-card">
        {/* Quick action buttons */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => {
              setShowTopicSuggestions(!showTopicSuggestions)
              setShowTranslatePanel(false)
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              showTopicSuggestions 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Lightbulb className="w-4 h-4" />
            {t("topicIdeas")}
          </button>
          <button
            onClick={() => {
              setShowTranslatePanel(!showTranslatePanel)
              setShowTopicSuggestions(false)
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              showTranslatePanel 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Languages className="w-4 h-4" />
            {t("translate")}
          </button>
        </div>

        {/* Message input */}
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t("typeMessage")}
              rows={1}
              className="w-full px-4 py-3 bg-muted rounded-2xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 max-h-32"
              style={{ minHeight: "44px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
          </div>
          <button className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className={cn(
              "p-3 rounded-full transition-colors flex-shrink-0",
              messageInput.trim() 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Dialog open={showLikePopup} onOpenChange={setShowLikePopup}>
        <DialogContent className="sm:max-w-[400px] text-center p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center animate-bounce">
              <ThumbsUp className="w-10 h-10 text-blue-600 fill-blue-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">{t("likePopupTitle")}</DialogTitle>
              <DialogDescription className="text-base pt-2 text-center">
                {t("likePopupDescription", { name: userName, count: messages.length })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 w-full pt-4">
              <DialogClose asChild>
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                  <ThumbsUp className="w-5 h-5 fill-white" />
                  {t("likeButton")}
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button className="flex-1 px-4 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all active:scale-95">
                  {t("maybeLater")}
                </button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
