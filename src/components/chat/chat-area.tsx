"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Chat, Message } from "@/@types/chats-types";
import { cn } from "@/lib/utils";
import { defaultSrc } from "@/hooks/default-src";
import api from "@/services/api";
import { onSendMessage, SendMessageFormData } from "@/hooks/send-message";
import { toast } from "@/hooks/use-toast";

interface ChatAreaProps {
  activeChat: Chat | null;
  messages: Message[];
  setMessages: (value: Message[]) => void;
}

export function ChatArea({ activeChat, messages, setMessages }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (activeChat?.id) {
      getMessageChat();
    }
  }, [activeChat]);

  const getMessageChat = async () => {
    const { data } = await api.get<Message[]>(`/message/${activeChat?.id}`);
    setMessages(data);
  };

  const onSubmit = () => {
    if (!activeChat?.fromPhone) {
      toast({
        title: "Envio de mensagem",
        description: "É necessario um telefone",
        variant: "info",
      });
      return;
    }

    const bodySubmit: SendMessageFormData = {
      message: newMessage,
      phone: activeChat.fromPhone,
    };

    onSendMessage(bodySubmit);
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center w-full justify-center bg-neutral-900 text-gray-500">
        <div className="text-center max- p-6 space-y-2">
          <h3 className="text-2xl font-semibold text-white">
            Bem-vindo ao Chat
          </h3>
          <p className=" text-white">
            Selecione uma conversa na barra lateral para começar a conversar ou
            crie um novo chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-neutral-900">
      <div className="flex items-center p-4 border-b border-gray-200">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={activeChat.avatar ?? defaultSrc} />
        </Avatar>
        <div>
          <h3 className="font-medium text-white">{activeChat.fromName}</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Nenhuma mensagem ainda. Comece a conversa!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex mb-4",
                message.senderIsMy ? "justify-end" : "justify-start"
              )}
            >
              {!message.senderIsMy && (
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={activeChat.avatar ?? defaultSrc} />
                </Avatar>
              )}
              <div>
                <div
                  className={cn(
                    "max-w-xs px-4 py-2 rounded-lg",
                    message.senderIsMy
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  )}
                >
                  {message.message}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center p-4 border-t border-gray-200 space-x-2 bg-neutral-900">
        <Input
          placeholder="Digite uma mensagem"
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
          onClick={() => onSubmit()}
        >
          <Send className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
