"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface Conversation {
  id: string
  nameKey: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  nationality: "VN" | "JP"
}

const conversations: Conversation[] = [
  {
    id: "1",
    nameKey: "yuki",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    lastMessage: "いいですね！喫茶店で会いましょう。",
    time: "2分",
    unread: 2,
    online: true,
    nationality: "JP",
  },
  {
    id: "2",
    nameKey: "minhanh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    lastMessage: "ありがとうございます！",
    time: "15分",
    unread: 0,
    online: true,
    nationality: "VN",
  },
  {
    id: "3",
    nameKey: "kenji",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "ベトナム語で「美味しい」はどう言いますか？",
    time: "1時間",
    unread: 0,
    online: false,
    nationality: "JP",
  },
  {
    id: "4",
    nameKey: "linh",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    lastMessage: "明日のイベントで会いましょう！",
    time: "3時間",
    unread: 0,
    online: false,
    nationality: "VN",
  },
  {
    id: "5",
    nameKey: "takeshi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Xin chao! はじめまして。",
    time: "1日",
    unread: 0,
    online: false,
    nationality: "JP",
  },
]

interface ConversationListProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const t = useTranslations("Messages")

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-foreground mb-3">{t("title")}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const name = t(`users.${conversation.nameKey}`)
          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left",
                selectedId === conversation.id && "bg-muted"
              )}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.avatar}
                  alt={name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" />
                )}
                <span className={cn(
                  "absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white",
                  conversation.nationality === "JP" ? "bg-red-500" : "bg-yellow-500"
                )}>
                  {conversation.nationality}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground truncate">
                    {name}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>

              {/* Unread badge */}
              {conversation.unread > 0 && (
                <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
