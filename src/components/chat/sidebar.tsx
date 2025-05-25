"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Menu, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Conversation } from "@/@types/chats-types";
import { cn } from "@/lib/utils";
import { ConnectButton } from "./connect-button";
import { LogoutButton } from "./logout-button";
import { formatDistanceToNow } from "date-fns";

interface SidebarProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export function Sidebar({
  conversations,
  activeConversation,
  onSelectConversation,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
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

      <div className="p-3 border-r">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border-r">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No conversations found
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center cursor-pointer p-3 rounded-md hover:bg-gray-900",
                activeConversation?.id === conversation.id
                  ? "bg-gray-900/85"
                  : ""
              )}
              onClick={() => onSelectConversation(conversation)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={conversation.avatar}
                  alt={conversation.name}
                />
                <AvatarFallback>
                  {conversation.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate text-gray-900 dark:text-gray-100">
                    {conversation.name}
                  </h3>
                  {mounted && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(
                        new Date(conversation.lastMessageTime),
                        { addSuffix: true }
                      )}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 border-r mt-auto">
        <Button className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
    </div>
  );
}
