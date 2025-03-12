
import { Conversation } from "@/types/message";
import { User, CheckCheck } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, isActive, onClick }: ConversationItemProps) => {
  return (
    <button
      key={conversation.id}
      onClick={onClick}
      className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex ${
        isActive ? 'bg-scout-50/30' : ''
      }`}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 mr-3 flex items-center justify-center ${
        conversation.isOwner ? 'bg-scout-100 text-scout-500' : 'bg-blue-100 text-blue-500'
      }`}>
        <User className="h-6 w-6" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium truncate">{conversation.name}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.timestamp}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{conversation.baseName}</p>
        <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unread && (
        <div className="w-2 h-2 bg-scout-500 rounded-full self-center ml-2"></div>
      )}
    </button>
  );
};

export default ConversationItem;
