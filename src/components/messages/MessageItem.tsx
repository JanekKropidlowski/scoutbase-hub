
import { Message } from "@/types/message";
import { Check, CheckCheck } from "lucide-react";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.senderId === "user";
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
        isUser 
          ? 'bg-scout-500 text-white rounded-tr-none' 
          : 'bg-gray-100 text-gray-800 rounded-tl-none'
      }`}>
        <p>{message.content}</p>
        <div className={`text-xs mt-1 flex justify-end items-center gap-1 ${
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
