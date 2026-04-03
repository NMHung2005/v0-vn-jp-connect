"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ConversationList } from "@/components/messages/conversation-list"
import { ChatArea } from "@/components/messages/chat-area"
import {
  Conversation,
  Message,
  UserProfile,
} from "@/components/messages/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslations } from "next-intl"

const CURRENT_USER_ID = "me"

const matchedUsers: UserProfile[] = [
  {
    id: "yuki",
    nameKey: "yuki",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    online: true,
    nationality: "JP",
  },
  {
    id: "minhanh",
    nameKey: "minhanh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    online: true,
    nationality: "VN",
  },
  {
    id: "kenji",
    nameKey: "kenji",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    online: false,
    nationality: "JP",
  },
  {
    id: "linh",
    nameKey: "linh",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    online: false,
    nationality: "VN",
  },
  {
    id: "takeshi",
    nameKey: "takeshi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    online: false,
    nationality: "JP",
  },
]

const initialConversations: Conversation[] = [
  {
    id: "1",
    kind: "direct",
    participantIds: ["yuki"],
    messages: [
      {
        id: "1-1",
        senderId: "yuki",
        text: "こんにちは！はじめまして。",
        translatedText: "Xin chào! Rất vui được gặp bạn.",
        time: "10:30 AM",
        isOwn: false,
      },
      {
        id: "1-2",
        senderId: "me",
        text: "Xin chào! Rất vui được gặp bạn.",
        translatedText: "こんにちは！お会いできて嬉しいです。",
        time: "10:32 AM",
        isOwn: true,
      },
      {
        id: "1-3",
        senderId: "yuki",
        text: "ベトナム語を勉強しています。手伝ってもらえますか？",
        translatedText: "Tôi đang học tiếng Việt. Bạn có thể giúp tôi không?",
        time: "10:33 AM",
        isOwn: false,
      },
      {
        id: "1-4",
        senderId: "me",
        text: "もちろん！ベトナム語の練習を手伝いますよ。日本語を教えてくれませんか？",
        time: "10:35 AM",
        isOwn: true,
      },
      {
        id: "1-5",
        senderId: "yuki",
        text: "いいですね！喫茶店で会いましょう。",
        time: "10:36 AM",
        isOwn: false,
      },
    ],
    lastMessage: "いいですね！喫茶店で会いましょう。",
    time: "2分",
    unread: 2,
    online: true,
    nationality: "JP",
  },
  {
    id: "2",
    kind: "direct",
    participantIds: ["minhanh"],
    messages: [
      {
        id: "2-1",
        senderId: "minhanh",
        text: "Bạn có đi sự kiện cuối tuần này không?",
        translatedText: "今週末のイベントに行きますか？",
        time: "09:15 AM",
        isOwn: false,
      },
      {
        id: "2-2",
        senderId: "me",
        text: "Có, mình sẽ ghé qua sau giờ làm.",
        translatedText: "はい、仕事のあとに寄ります。",
        time: "09:18 AM",
        isOwn: true,
      },
    ],
    lastMessage: "ありがとうございます！",
    time: "15分",
    unread: 0,
    online: true,
    nationality: "VN",
  },
  {
    id: "3",
    kind: "direct",
    participantIds: ["kenji"],
    messages: [
      {
        id: "3-1",
        senderId: "kenji",
        text: "ベトナム語で「美味しい」はどう言いますか？",
        translatedText: "Trong tiếng Việt, ‘ngon’ nói thế nào?",
        time: "08:20 AM",
        isOwn: false,
      },
      {
        id: "3-2",
        senderId: "me",
        text: "『ngon』です。発音も一緒に練習しましょう。",
        translatedText: "それは「ngon」です。",
        time: "08:23 AM",
        isOwn: true,
      },
    ],
    lastMessage: "ベトナム語で「美味しい」はどう言いますか？",
    time: "1時間",
    unread: 0,
    online: false,
    nationality: "JP",
  },
  {
    id: "4",
    kind: "direct",
    participantIds: ["linh"],
    messages: [
      {
        id: "4-1",
        senderId: "linh",
        text: "明日のイベントで会いましょう！",
        translatedText: "Hẹn gặp bạn ở sự kiện ngày mai nhé!",
        time: "Yesterday",
        isOwn: false,
      },
      {
        id: "4-2",
        senderId: "me",
        text: "了解、楽しみにしています。",
        translatedText: "Rõ rồi, mình rất mong chờ.",
        time: "Yesterday",
        isOwn: true,
      },
    ],
    lastMessage: "明日のイベントで会いましょう！",
    time: "3時間",
    unread: 0,
    online: false,
    nationality: "VN",
  },
  {
    id: "5",
    kind: "direct",
    participantIds: ["takeshi"],
    messages: [
      {
        id: "5-1",
        senderId: "takeshi",
        text: "Xin chao! はじめまして。",
        translatedText: "Xin chào! Rất vui được gặp bạn.",
        time: "Monday",
        isOwn: false,
      },
      {
        id: "5-2",
        senderId: "me",
        text: "こんにちは、よろしくお願いします。",
        translatedText: "Xin chào, rất mong được làm quen.",
        time: "Monday",
        isOwn: true,
      },
    ],
    lastMessage: "Xin chao! はじめまして。",
    time: "1日",
    unread: 0,
    online: false,
    nationality: "JP",
  },
]

const usersById = matchedUsers.reduce<Record<string, UserProfile>>((accumulator, user) => {
  accumulator[user.id] = user
  return accumulator
}, {})
export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [groupDialogMode, setGroupDialogMode] = useState<"create" | "add">("create")
  const [groupDialogConversationId, setGroupDialogConversationId] = useState<string | null>(null)
  const [groupName, setGroupName] = useState("")
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])

  const t = useTranslations("Messages")

  const selectedConversationData = conversations.find((conversation) => conversation.id === selectedConversation) ?? null

  const openCreateGroupDialog = () => {
    const preselectedMembers =
      selectedConversationData?.participantIds.filter((memberId) => usersById[memberId]) ?? []

    setGroupDialogMode("create")
    setGroupDialogConversationId(null)
    setGroupName("")
    setSelectedMemberIds(preselectedMembers)
    setGroupDialogOpen(true)
  }

  const openAddMembersDialog = () => {
    if (!selectedConversationData || selectedConversationData.kind !== "group") {
      return
    }

    setGroupDialogMode("add")
    setGroupDialogConversationId(selectedConversationData.id)
    setGroupName("")
    setSelectedMemberIds([])
    setGroupDialogOpen(true)
  }

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMemberIds((currentSelection) =>
      currentSelection.includes(memberId)
        ? currentSelection.filter((value) => value !== memberId)
        : [...currentSelection, memberId],
    )
  }

  const submitMemberDialog = () => {
    if (!selectedMemberIds.length) {
      return
    }

    if (groupDialogMode === "create") {
      const selectedUsers = selectedMemberIds
        .map((memberId) => usersById[memberId])
        .filter((user): user is UserProfile => Boolean(user))
      const resolvedGroupName =
        groupName.trim() || selectedUsers.map((user) => t(`users.${user.nameKey}`)).join(" + ")

      const createdConversation: Conversation = {
        id: `group-${Date.now()}`,
        kind: "group",
        participantIds: selectedMemberIds,
        groupName: resolvedGroupName,
        messages: [
          {
            id: `${Date.now()}-1`,
            senderId: CURRENT_USER_ID,
            text: t("groupCreatedMessage"),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isOwn: true,
          },
        ],
        lastMessage: t("groupCreatedMessage"),
        time: t("now"),
        unread: 0,
        online: true,
      }

      setConversations((currentConversations) => [createdConversation, ...currentConversations])
      setSelectedConversation(createdConversation.id)
    }

    if (groupDialogMode === "add" && groupDialogConversationId) {
      setConversations((currentConversations) =>
        currentConversations.map((conversation) => {
          if (conversation.id !== groupDialogConversationId) {
            return conversation
          }

          const newParticipants = Array.from(new Set([...conversation.participantIds, ...selectedMemberIds]))

          return {
            ...conversation,
            participantIds: newParticipants,
            messages: [
              ...conversation.messages,
              {
                id: `${Date.now()}-added`,
                senderId: CURRENT_USER_ID,
                text: t("membersAddedMessage", { count: selectedMemberIds.length }),
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                isOwn: true,
              },
            ],
            lastMessage: t("membersAddedMessage", { count: selectedMemberIds.length }),
            time: t("now"),
          }
        }),
      )
    }

    setGroupDialogOpen(false)
    setSelectedMemberIds([])
    setGroupName("")
    setGroupDialogConversationId(null)
  }

  const handleSendMessage = (conversationId: string, text: string) => {
    const messageTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setConversations((currentConversations) =>
      currentConversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation
        }

        const newMessage: Message = {
          id: `${Date.now()}-${conversationId}`,
          senderId: CURRENT_USER_ID,
          text,
          time: messageTime,
          isOwn: true,
        }

        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessage: text,
          time: t("now"),
        }
      }),
    )
  }

  const availableMembers =
    groupDialogMode === "add" && groupDialogConversationId
      ? matchedUsers.filter((user) => {
          const targetConversation = conversations.find((conversation) => conversation.id === groupDialogConversationId)
          return !targetConversation?.participantIds.includes(user.id)
        })
      : matchedUsers

  const selectedConversationItem =
    conversations.find((conversation) => conversation.id === selectedConversation) ?? null

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Messages Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List */}
        <ConversationList
          conversations={conversations}
          usersById={usersById}
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
          onCreateGroup={openCreateGroupDialog}
        />

        {/* Chat Area */}
        <ChatArea
          conversation={selectedConversationItem}
          usersById={usersById}
          onSendMessage={handleSendMessage}
          onAddMembers={openAddMembersDialog}
        />
      </div>

      <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {groupDialogMode === "create" ? t("newGroupTitle") : t("addMembers")}
            </DialogTitle>
            <DialogDescription>
              {groupDialogMode === "create"
                ? t("newGroupDescription")
                : t("addMembersDescription")}
            </DialogDescription>
          </DialogHeader>

          {groupDialogMode === "create" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("groupName")}</label>
              <input
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder={t("groupNamePlaceholder")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">{t("matchedMembers")}</h4>
              <span className="text-xs text-muted-foreground">
                {t("selectedMembers", { count: selectedMemberIds.length })}
              </span>
            </div>

            <div className="space-y-2">
              {availableMembers.map((member) => {
                const memberName = t(`users.${member.nameKey}`)
                const isSelected = selectedMemberIds.includes(member.id)

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMemberSelection(member.id)}
                    className="flex w-full items-center gap-3 rounded-xl border border-border px-3 py-3 text-left transition-colors hover:bg-muted/60"
                  >
                    <Checkbox checked={isSelected} />
                    <div className="relative flex-shrink-0">
                      <img
                        src={member.avatar}
                        alt={memberName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span
                        className={
                          `absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${member.nationality === "JP" ? "bg-red-500" : "bg-yellow-500"}`
                        }
                      >
                        {member.nationality}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium text-foreground">{memberName}</span>
                        {member.online && (
                          <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                            {t("online")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {member.nationality === "JP" ? "日本語" : "ベトナム語"}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setGroupDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={submitMemberDialog} disabled={!selectedMemberIds.length}>
              {groupDialogMode === "create" ? t("create") : t("addToGroup")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
