export interface Chat {
  id: string;
  clientId: string;
  fromPhone: string;
  fromName: string | null;
  avatar: string | null;
  wpId: string;
}

export interface Message {
  message: string;
  id: string;
  clientId: string;
  chatId: string;
  fromPhone: string;
  senderIsMy: boolean;
}
