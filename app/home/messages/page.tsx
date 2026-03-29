"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ConversationList } from "@/components/messages/conversation-list"
import { ChatArea } from "@/components/messages/chat-area"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Messages Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List */}
        <ConversationList
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
        />

        {/* Chat Area */}
        <ChatArea conversationId={selectedConversation} />
      </div>
    </div>
  )
}
