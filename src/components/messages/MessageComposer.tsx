
import { useState } from "react";
import { PaperclipIcon, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageComposerProps {
  onSendMessage: (text: string) => void;
}

const MessageComposer = ({ onSendMessage }: MessageComposerProps) => {
  const [messageText, setMessageText] = useState("");
  const [isAttaching, setIsAttaching] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    onSendMessage(messageText.trim());
    setMessageText("");
  };
  
  const handleAttachFile = () => {
    setIsAttaching(true);
    toast({
      title: "Funkcja w przygotowaniu",
      description: "Załączanie plików będzie dostępne wkrótce.",
    });
    setTimeout(() => setIsAttaching(false), 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex">
        <button 
          className={`text-gray-400 hover:text-gray-600 mr-2 ${isAttaching ? 'animate-pulse' : ''}`}
          onClick={handleAttachFile}
        >
          <PaperclipIcon className="h-6 w-6" />
        </button>
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-scout-500"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className={`bg-scout-500 text-white px-4 py-2 rounded-r-lg transition-colors ${
            messageText.trim() ? 'hover:bg-scout-600' : 'opacity-70 cursor-not-allowed'
          }`}
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageComposer;
