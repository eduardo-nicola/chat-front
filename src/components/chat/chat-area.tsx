"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Smile, Mic, Send } from "lucide-react";
import { Conversation, Message } from "@/@types/chats-types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: Message[];
}

export function ChatArea({ conversation, messages }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center w-full justify-center bg-gray-100 text-gray-500">
        <div className="text-center max- p-6 space-y-2">
          <h3 className="text-2xl font-semibold text-gray-900">
            Welcome to Chat
          </h3>
          <p>
            Select a conversation from the sidebar to start chatting or create a
            new chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      <div className="flex items-center p-4 border-b border-gray-200">
        <Avatar className="h-9 w-9 mr-3">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-gray-900 text-white">
            {conversation.name}
          </h3>
          <p className="text-xs text-gray-500">
            {conversation.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex mb-4",
                message.sender === "me" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender !== "me" && (
                <Avatar className="h-8 w-8 mr-2 self-end mb-1">
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback>
                    {conversation.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={cn(
                    "max-w-xs px-4 py-2 rounded-lg",
                    message.sender === "me"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  )}
                >
                  {message.content}
                </div>
                {mounted && (
                  <div
                    className={cn(
                      "text-xs text-gray-500 mt-1",
                      message.sender === "me" ? "text-right" : "text-left"
                    )}
                  >
                    {format(new Date(message.timestamp), "p")}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center p-4 border-t border-gray-200 space-x-2 bg-neutral-900">
        <Input
          placeholder="Type a message"
          className="flex-1 max-w-2xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              setNewMessage("");
            }
          }}
        />
        <Button
          variant="default"
          size="icon"
          disabled={!newMessage.trim()}
          onClick={() => setNewMessage("")}
        >
          <Send className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
