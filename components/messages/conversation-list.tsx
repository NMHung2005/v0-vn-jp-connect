"use client"

import { Plus, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Conversation, UserProfile } from "@/components/messages/types"

interface ConversationListProps {
  conversations: Conversation[]
  usersById: Record<string, UserProfile>
  selectedId: string | null
  onSelect: (id: string) => void
  onCreateGroup: () => void
}

export function ConversationList({
  conversations,
  usersById,
  selectedId,
  onSelect,
  onCreateGroup,
}: ConversationListProps) {
  const t = useTranslations("Messages")

  const getDisplayName = (conversation: Conversation) => {
    if (conversation.kind === "group") {
      return conversation.groupName || t("groupChat")
    }

    const participant = usersById[conversation.participantIds[0]]

    return participant ? t(`users.${participant.nameKey}`) : t("yourMessages")
  }

  const renderAvatar = (conversation: Conversation) => {
    if (conversation.kind === "group") {
      const participants = conversation.participantIds
        .slice(0, 3)
        .map((memberId) => usersById[memberId])
        .filter((participant): participant is UserProfile => Boolean(participant))

      return (
        <div className="relative h-12 w-12 flex-shrink-0">
          {participants.map((participant, index) => (
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
      )
    }

    const participant = usersById[conversation.participantIds[0]]

    return participant ? (
      <div className="relative flex-shrink-0">
        <img
          src={participant.avatar}
          alt={t(`users.${participant.nameKey}`)}
          className="w-12 h-12 rounded-full object-cover"
        />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" />
        )}
        <span
          className={cn(
            "absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white",
            participant.nationality === "JP" ? "bg-red-500" : "bg-yellow-500",
          )}
        >
          {participant.nationality}
        </span>
      </div>
    ) : null
  }

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          <button
            onClick={onCreateGroup}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-3.5 w-3.5" />
            {t("createGroup")}
          </button>
        </div>
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
          const name = getDisplayName(conversation)
          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left",
                selectedId === conversation.id && "bg-muted"
              )}
            >
              {renderAvatar(conversation)}

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
                {conversation.kind === "group" && (
                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {t("groupChat")}
                  </div>
                )}
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
