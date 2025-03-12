
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/message";
import { MOCK_CONVERSATIONS, INITIAL_MESSAGES, formatTimestamp } from "@/data/mockMessages";
import ConversationList from "@/components/messages/ConversationList";
import MessageThread from "@/components/messages/MessageThread";
import EmptyState from "@/components/messages/EmptyState";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(MOCK_CONVERSATIONS[0].id);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const { toast } = useToast();
  
  // Get messages for the active conversation
  const activeMessages = activeConversation 
    ? messages.filter(message => message.conversationId === activeConversation)
    : [];
  
  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (activeConversation) {
      setMessages(currentMessages => 
        currentMessages.map(message => 
          message.conversationId === activeConversation ? { ...message, read: true } : message
        )
      );
      
      setConversations(currentConversations => 
        currentConversations.map(conv => 
          conv.id === activeConversation ? { ...conv, unread: false } : conv
        )
      );
    }
  }, [activeConversation]);
  
  const handleSendMessage = (messageText: string) => {
    if (!activeConversation) return;
    
    const newMessage = {
      id: (messages.length + 1).toString(),
      conversationId: activeConversation,
      senderId: "user",
      content: messageText,
      timestamp: formatTimestamp(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    
    // Update last message in conversation list
    setConversations(currentConversations => 
      currentConversations.map(conv => 
        conv.id === activeConversation 
          ? { ...conv, lastMessage: messageText, timestamp: "Teraz" } 
          : conv
      )
    );
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
      const isFirstConversation = activeConversation === "1";
      const replyContent = isFirstConversation 
        ? "Dziękuję za informację. Potwierdzam że koszt całkowity wyniesie 36,400 zł. Czy chcieliby Państwo zarezerwować ten termin?" 
        : "Dziękuję za wiadomość. Odpowiem najszybciej jak to możliwe.";
      
      const reply: Message = {
        id: (messages.length + 2).toString(),
        conversationId: activeConversation,
        senderId: "other",
        content: replyContent,
        timestamp: formatTimestamp(),
        read: true
      };
      
      setMessages(currentMessages => [...currentMessages, reply]);
      
      // Update last message in conversations
      setConversations(currentConversations => 
        currentConversations.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, lastMessage: replyContent, timestamp: "Teraz" } 
            : conv
        )
      );
      
      toast({
        title: "Nowa wiadomość",
        description: `${conversations.find(c => c.id === activeConversation)?.name}: ${replyContent.substring(0, 60)}${replyContent.length > 60 ? '...' : ''}`,
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-0 md:px-4 py-0 md:py-8 h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)]">
          <div className="bg-white md:rounded-xl border md:shadow-sm h-full flex flex-col md:flex-row overflow-hidden">
            {/* Conversations list */}
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              setActiveConversation={(id) => setActiveConversation(id)}
            />
            
            {/* Message thread or empty state */}
            {activeConversation ? (
              <MessageThread
                activeConversation={activeConversation}
                messages={activeMessages}
                conversations={conversations}
                onSendMessage={handleSendMessage}
                onBackClick={() => setActiveConversation(null)}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Messages;
