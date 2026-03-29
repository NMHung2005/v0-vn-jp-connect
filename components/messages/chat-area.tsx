"use client"

import { useState, useEffect } from "react"
import { 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Languages,
  Lightbulb,
  ChevronDown,
  CheckCircle2,
  Copy,
  Volume2,
  User,
  Heart,
  X,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
  user: { id: number; name: string; avatar: string; online: boolean; nationality: "VN" | "JP" }
  messages: Message[]
}> = {
  "1": {
    user: {
      id: 1,
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      online: true,
      nationality: "JP",
    },
    messages: [
      {
        id: "1",
        senderId: "yuki",
        text: "こんにちは！はじめまして。",
        translatedText: "Hello! Nice to meet you.",
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
        translatedText: "I am studying Vietnamese. Can you help me?",
        time: "10:33 AM",
        isOwn: false,
      },
      {
        id: "4",
        senderId: "me",
        text: "Of course! I can help you practice Vietnamese. And you can help me with Japanese!",
        time: "10:35 AM",
        isOwn: true,
      },
      {
        id: "5",
        senderId: "yuki",
        text: "That sounds great! Let's meet at the coffee shop.",
        time: "10:36 AM",
        isOwn: false,
      },
    ],
  },
}

const topicSuggestions = [
  { icon: "🎌", text: "Ask about Japanese culture" },
  { icon: "🍜", text: "Discuss favorite foods" },
  { icon: "📚", text: "Share language learning tips" },
  { icon: "🎬", text: "Talk about movies or anime" },
  { icon: "✈️", text: "Ask about travel experiences" },
  { icon: "🎵", text: "Discuss music preferences" },
]

export function ChatArea({ conversationId }: ChatAreaProps) {
  const [message, setMessage] = useState("")
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({})
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false)
  const [translateMode, setTranslateMode] = useState<"vi-jp" | "jp-vi">("vi-jp")
  const [showTranslatePanel, setShowTranslatePanel] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedResult, setTranslatedResult] = useState("")

  if (!conversationId || !conversationData[conversationId]) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Your Messages</h3>
          <p className="text-sm text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      </div>
    )
  }

  const { user, messages } = conversationData[conversationId]

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
    setMessage(topic)
    setShowTopicSuggestions(false)
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {user.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-foreground">{user.name}</h2>
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-bold text-white",
                user.nationality === "JP" ? "bg-red-500" : "bg-yellow-500"
              )}>
                {user.nationality}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {user.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/home/user/${user.id}`}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium text-foreground transition-colors"
          >
            <User className="w-4 h-4" />
            <span>View Profile</span>
          </Link>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Phone className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Video className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
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
                    {showTranslation[msg.id] ? "Hide" : "Translate"}
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
              Topic Suggestions
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
              Translation Helper
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
              Vietnamese to Japanese
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
              Japanese to Vietnamese
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {translateMode === "vi-jp" ? "Vietnamese" : "Japanese"}
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
                {translateMode === "vi-jp" ? "Japanese" : "Vietnamese"}
              </label>
              <div className="w-full h-24 p-3 bg-muted/50 rounded-lg text-sm text-foreground overflow-y-auto">
                {translatedResult || (
                  <span className="text-muted-foreground italic">Translation will appear here...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handleTranslate}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Translate
            </button>
            {translatedResult && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMessage(prev => prev + " " + translatedResult)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Use in message
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
            Topic Ideas
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
            Translate
          </button>
        </div>

        {/* Message input */}
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 bg-muted rounded-2xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 max-h-32"
              style={{ minHeight: "44px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  // Handle send
                }
              }}
            />
          </div>
          <button className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            className={cn(
              "p-3 rounded-full transition-colors flex-shrink-0",
              message.trim() 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
