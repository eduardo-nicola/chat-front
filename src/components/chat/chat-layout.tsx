"use client";

import { useState } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { ChatArea } from "@/components/chat/chat-area";
import { mockConversations, mockMessages } from "@/lib/mock-data";
import { Conversation } from "@/@types/chats-types";

export function ChatLayout() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };

  return (
    <div className="flex h-dvh bg-gray-50">
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
      />
      <ChatArea
        conversation={activeConversation}
        messages={
          activeConversation
            ? messages.filter((m) => m.conversationId === activeConversation.id)
            : []
        }
      />
    </div>
  );
}
