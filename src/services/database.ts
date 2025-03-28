
// This is a simulated database service
// In a real application, this would connect to a backend API or Supabase/Firebase

import { Conversation, Message } from "@/types/message";
import { MOCK_CONVERSATIONS, INITIAL_MESSAGES, formatTimestamp } from "@/data/mockMessages";

// In-memory database simulation
let conversations = [...MOCK_CONVERSATIONS];
let messages = [...INITIAL_MESSAGES];

// Simulate delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  // Conversations
  getConversations: async (): Promise<Conversation[]> => {
    await delay(300); // Simulate network delay
    return [...conversations];
  },

  getConversation: async (id: string): Promise<Conversation | undefined> => {
    await delay(200);
    return conversations.find(conv => conv.id === id);
  },

  updateConversation: async (id: string, data: Partial<Conversation>): Promise<Conversation> => {
    await delay(200);
    conversations = conversations.map(conv => 
      conv.id === id ? { ...conv, ...data } : conv
    );
    return conversations.find(conv => conv.id === id) as Conversation;
  },

  // Messages
  getMessages: async (conversationId: string): Promise<Message[]> => {
    await delay(300);
    return messages.filter(msg => msg.conversationId === conversationId);
  },

  sendMessage: async (data: Omit<Message, "id">): Promise<Message> => {
    await delay(200);
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      ...data
    };
    messages = [...messages, newMessage];
    
    // Update last message in conversation
    if (data.conversationId) {
      conversations = conversations.map(conv => 
        conv.id === data.conversationId 
          ? { ...conv, lastMessage: data.content, timestamp: "Teraz" } 
          : conv
      );
    }
    
    return newMessage;
  },

  markAsRead: async (conversationId: string): Promise<void> => {
    await delay(100);
    // Mark messages as read
    messages = messages.map(message => 
      message.conversationId === conversationId ? { ...message, read: true } : message
    );
    
    // Mark conversation as not unread
    conversations = conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unread: false } : conv
    );
  }
};
