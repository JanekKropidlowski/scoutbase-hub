
import { useState, useEffect } from "react";
import { Message, Conversation } from "@/types/message";
import { db } from "@/services/database";
import { useToast } from "@/hooks/use-toast";
import { formatTimestamp } from "@/data/mockMessages";

export const useMessages = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await db.getConversations();
        setConversations(data);
        
        // Set first conversation as active by default if exists
        if (data.length > 0 && !activeConversation) {
          setActiveConversation(data[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load conversations:", error);
        toast({
          title: "Błąd",
          description: "Nie udało się załadować listy rozmów",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadConversations();
  }, []);
  
  // Load messages for active conversation
  useEffect(() => {
    if (!activeConversation) return;
    
    const loadMessages = async () => {
      try {
        // Mark messages as read
        await db.markAsRead(activeConversation);
        
        // Get updated conversations
        const updatedConversations = await db.getConversations();
        setConversations(updatedConversations);
        
        // Get messages for conversation
        const conversationMessages = await db.getMessages(activeConversation);
        setMessages(conversationMessages);
      } catch (error) {
        console.error("Failed to load messages:", error);
        toast({
          title: "Błąd",
          description: "Nie udało się załadować wiadomości",
          variant: "destructive",
        });
      }
    };
    
    loadMessages();
  }, [activeConversation]);
  
  // Send a message
  const sendMessage = async (messageText: string) => {
    if (!activeConversation || !messageText.trim()) return;
    
    try {
      // Send the message
      const newMessage: Omit<Message, "id"> = {
        conversationId: activeConversation,
        senderId: "user",
        content: messageText,
        timestamp: formatTimestamp(),
        read: false,
      };
      
      await db.sendMessage(newMessage);
      
      // Reload messages and conversations
      const updatedMessages = await db.getMessages(activeConversation);
      setMessages(updatedMessages);
      
      const updatedConversations = await db.getConversations();
      setConversations(updatedConversations);
      
      // Simulate reply after 2 seconds
      setTimeout(async () => {
        const isFirstConversation = activeConversation === "1";
        const replyContent = isFirstConversation 
          ? "Dziękuję za informację. Potwierdzam że koszt całkowity wyniesie 36,400 zł. Czy chcieliby Państwo zarezerwować ten termin?" 
          : "Dziękuję za wiadomość. Odpowiem najszybciej jak to możliwe.";
        
        const reply: Omit<Message, "id"> = {
          conversationId: activeConversation,
          senderId: "other",
          senderName: conversations.find(c => c.id === activeConversation)?.name,
          content: replyContent,
          timestamp: formatTimestamp(),
          read: true,
        };
        
        await db.sendMessage(reply);
        
        // Reload messages and conversations
        const latestMessages = await db.getMessages(activeConversation);
        setMessages(latestMessages);
        
        const latestConversations = await db.getConversations();
        setConversations(latestConversations);
        
        toast({
          title: "Nowa wiadomość",
          description: `${conversations.find(c => c.id === activeConversation)?.name}: ${replyContent.substring(0, 60)}${replyContent.length > 60 ? '...' : ''}`,
        });
      }, 2000);
      
      return true;
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać wiadomości",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return {
    activeConversation,
    setActiveConversation,
    conversations,
    messages,
    loading,
    sendMessage
  };
};
