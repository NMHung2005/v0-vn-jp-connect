export type Nationality = "VN" | "JP"

export interface UserProfile {
  id: string
  nameKey: string
  avatar: string
  online: boolean
  nationality: Nationality
}

export interface Message {
  id: string
  senderId: string
  text: string
  translatedText?: string
  time: string
  isOwn: boolean
}

export interface Conversation {
  id: string
  kind: "direct" | "group"
  participantIds: string[]
  groupName?: string
  messages: Message[]
  lastMessage: string
  time: string
  unread: number
  online: boolean
  nationality?: Nationality
}