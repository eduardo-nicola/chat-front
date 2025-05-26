"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chat } from "@/@types/chats-types";
import { cn } from "@/lib/utils";
import { ConnectButton } from "./connect-button";
import { LogoutButton } from "./logout-button";
import { ChatSkeleton } from "./chat-skeleton";
import { SendMessage } from "./send-message";
import { defaultSrc } from "@/hooks/default-src";
interface SidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  fetchChts: () => Promise<void>;
  isLoading: boolean;
}

export function Sidebar({
  chats,
  activeChat,
  fetchChts,
  onSelectChat,
  isLoading,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(
    (chat) =>
      chat.fromName?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      chat.fromPhone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-[35%]  bg-neutral-900">
      <div className="flex items-center justify-between p-4 border-b border-r border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Chats
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <ConnectButton />
          <LogoutButton />
        </div>
      </div>

      <div className="p-3 border-r flex gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Pesquizar conversa..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="default" size="icon" onClick={() => fetchChts()}>
          <RefreshCcw className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto border-r">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ChatSkeleton key={i} />
            ))}
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Nenhuma conversa encontrada
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex items-center cursor-pointer p-3 rounded-md hover:bg-gray-900",
                activeChat?.id === chat.id ? "bg-gray-900/85" : ""
              )}
              onClick={() => onSelectChat(chat)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={chat.avatar ?? defaultSrc} />
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate text-gray-900 dark:text-gray-100">
                    {chat.fromName ?? chat.fromPhone}
                  </h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 border-r mt-auto">
        <SendMessage />
      </div>
    </div>
  );
}
