
export interface Conversation {
  id: string;
  name: string;
  baseId: string;
  baseName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isOwner: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName?: string;
  content: string;
  timestamp: string;
  read: boolean;
}
