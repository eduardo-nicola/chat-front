"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { ChatArea } from "@/components/chat/chat-area";
import { Chat, Message } from "@/@types/chats-types";
import api from "@/services/api";

export function ChatLayout() {
  const [session, setSession] = useState(false);
  const [chatsLoadding, setChatsLoadding] = useState(true);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const [messagesFromChat, setMessages] = useState<Message[] | []>([]);

  useEffect(() => {
    startSession();
    getChats();
  }, []);

  const startSession = async () => {
    const { status } = await api.post("/whatsapp/register");
    if (status === 201) {
      setSession(true);
    }
  };
  const getChats = async () => {
    const { data } = await api.get("/chats");

    if (data) {
      setChats(data);
      setChatsLoadding(false);
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat);
  };

  return (
    <div className="flex h-dvh bg-gray-50">
      <Sidebar
        chats={chats}
        fetchChts={getChats}
        isLoading={chatsLoadding}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
      />
      <ChatArea
        activeChat={activeChat}
        messages={messagesFromChat}
        setMessages={(value: Message[]) => setMessages(value)}
      />
    </div>
  );
}
