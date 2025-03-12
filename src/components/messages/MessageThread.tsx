
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Conversation, Message } from "@/types/message";
import MessageItem from "./MessageItem";
import MessageComposer from "./MessageComposer";

interface MessageThreadProps {
  activeConversation: string;
  messages: Message[];
  conversations: Conversation[];
  onSendMessage: (text: string) => void;
  onBackClick: () => void;
}

const MessageThread = ({
  activeConversation,
  messages,
  conversations,
  onSendMessage,
  onBackClick
}: MessageThreadProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentConversation = conversations.find(c => c.id === activeConversation);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  if (!currentConversation) return null;
  
  return (
    <div className="flex-grow flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button 
          className="md:hidden mr-2"
          onClick={onBackClick}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div>
          <h3 className="font-bold">
            {currentConversation.name}
          </h3>
          <p className="text-sm text-gray-500">
            {currentConversation.baseName}
          </p>
        </div>
        
        <Link to={`/base/${currentConversation.baseId}`} className="text-scout-500 text-sm font-medium">
          Zobacz bazę
        </Link>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageComposer onSendMessage={onSendMessage} />
    </div>
  );
};

export default MessageThread;
