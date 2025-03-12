
import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Conversation } from "@/types/message";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string | null;
  setActiveConversation: (id: string) => void;
}

const ConversationList = ({ 
  conversations, 
  activeConversation,
  setActiveConversation 
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      conv.baseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${activeConversation ? 'hidden md:block' : 'block'} w-full md:w-1/3 md:max-w-xs border-r border-gray-200`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-xl mb-4">Wiadomości</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Szukaj wiadomości..."
            className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-scout-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-5rem)]">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation === conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
            />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Nie znaleziono wiadomości</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
