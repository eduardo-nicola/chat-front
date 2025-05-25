export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online: boolean
}

export interface Message {
  id: string
  conversationId: string
  sender: "me" | "other"
  content: string
  timestamp: string
  read: boolean
}