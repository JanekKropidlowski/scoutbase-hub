
import { Message } from "@/types/message";
import { Check, CheckCheck } from "lucide-react";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.senderId === "user";
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2.5`}
    >
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser 
          ? 'bg-scout-500 text-white rounded-br-none shadow-sm' 
          : 'bg-gray-100 text-gray-800 rounded-bl-none shadow-sm'
      }`}>
        {!isUser && message.senderName && (
          <p className="text-xs font-medium text-gray-600 mb-1">{message.senderName}</p>
        )}
        <p className="text-sm leading-tight">{message.content}</p>
        <div className={`text-[10px] mt-1 flex justify-end items-center gap-1 ${
          isUser ? 'text-scout-100' : 'text-gray-500'
        }`}>
          {message.timestamp}
          {isUser && (
            message.read ? 
              <CheckCheck className="h-3 w-3" /> : 
              <Check className="h-3 w-3" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
