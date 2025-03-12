
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { MessageSquare, Search, Send, AlertCircle, PaperclipIcon, User, Check, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MOCK_CONVERSATIONS = [
  {
    id: "1",
    name: "Jan Kowalski",
    baseId: "1",
    baseName: "Stanica Harcerska Biały Las",
    lastMessage: "Dzień dobry, czy baza jest dostępna w terminie 15-29 lipca?",
    timestamp: "10:23",
    unread: true,
    isOwner: true
  },
  {
    id: "2",
    name: "Anna Nowak",
    baseId: "3",
    baseName: "Centrum Szkoleniowe Harcerska Dolina",
    lastMessage: "Potwierdzam rezerwację w podanym terminie. Proszę o wpłatę zaliczki.",
    timestamp: "Wczoraj",
    unread: false,
    isOwner: true
  },
  {
    id: "3",
    name: "Piotr Wiśniewski",
    baseId: "4",
    baseName: "Ośrodek Szkoleniowy Nadwiślańskie Wzgórze",
    lastMessage: "Dziękuję za informacje. Czy mógłbym prosić o przesłanie regulaminu ośrodka?",
    timestamp: "23.03",
    unread: false,
    isOwner: false
  }
];

const INITIAL_MESSAGES = [
  {
    id: "1",
    conversationId: "1",
    senderId: "user",
    content: "Dzień dobry, czy baza jest dostępna w terminie 15-29 lipca? Szukamy miejsca dla grupy 40 osób.",
    timestamp: "10:23",
    read: true
  },
  {
    id: "2",
    conversationId: "1",
    senderId: "other",
    content: "Dzień dobry, tak, mamy jeszcze miejsca w tym terminie. Czy interesuje Państwa pełne wyżywienie czy tylko nocleg?",
    timestamp: "10:45",
    read: true
  },
  {
    id: "3",
    conversationId: "1",
    senderId: "user",
    content: "Szukamy opcji z pełnym wyżywieniem. Jaki byłby koszt pobytu dla 40 osób przez 14 dni?",
    timestamp: "11:30",
    read: true
  },
  {
    id: "4",
    conversationId: "1",
    senderId: "other",
    content: "Koszt wynosi 65 zł od osoby za dobę z pełnym wyżywieniem. Dla grup powyżej 30 osób oferujemy 5% zniżki. Mogę przesłać pełną ofertę na maila.",
    timestamp: "12:05",
    read: false
  },
  {
    id: "5",
    conversationId: "2",
    senderId: "user",
    content: "Witam, chciałbym dokonać rezerwacji na termin 10-22 sierpnia.",
    timestamp: "Wczoraj",
    read: true
  },
  {
    id: "6",
    conversationId: "2",
    senderId: "other",
    content: "Potwierdzam rezerwację w podanym terminie. Proszę o wpłatę zaliczki.",
    timestamp: "Wczoraj",
    read: true
  },
  {
    id: "7",
    conversationId: "3",
    senderId: "user",
    content: "Dzień dobry, czy mógłbym prosić o więcej informacji na temat wyposażenia bazy?",
    timestamp: "23.03",
    read: true
  },
  {
    id: "8",
    conversationId: "3",
    senderId: "other",
    content: "Dziękuję za informacje. Czy mógłbym prosić o przesłanie regulaminu ośrodka?",
    timestamp: "23.03",
    read: true
  }
];

const formatTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(MOCK_CONVERSATIONS[0].id);
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAttaching, setIsAttaching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      conv.baseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get messages for the active conversation
  const activeMessages = messages.filter(
    (message) => message.conversationId === activeConversation
  );
  
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
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;
    
    const newMessage = {
      id: (messages.length + 1).toString(),
      conversationId: activeConversation,
      senderId: "user",
      content: messageText.trim(),
      timestamp: formatTimestamp(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    
    // Update last message in conversation list
    setConversations(currentConversations => 
      currentConversations.map(conv => 
        conv.id === activeConversation 
          ? { ...conv, lastMessage: messageText.trim(), timestamp: "Teraz" } 
          : conv
      )
    );
    
    setMessageText("");
    
    // Simulate reply after 2 seconds
    setTimeout(() => {
      const isFirstConversation = activeConversation === "1";
      const replyContent = isFirstConversation 
        ? "Dziękuję za informację. Potwierdzam że koszt całkowity wyniesie 36,400 zł. Czy chcieliby Państwo zarezerwować ten termin?" 
        : "Dziękuję za wiadomość. Odpowiem najszybciej jak to możliwe.";
      
      const reply = {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-0 md:px-4 py-0 md:py-8 h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)]">
          <div className="bg-white md:rounded-xl border md:shadow-sm h-full flex flex-col md:flex-row overflow-hidden">
            {/* Conversations list */}
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
                    <button
                      key={conversation.id}
                      onClick={() => setActiveConversation(conversation.id)}
                      className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex ${
                        activeConversation === conversation.id ? 'bg-scout-50/30' : ''
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
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>Nie znaleziono wiadomości</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message thread */}
            {activeConversation ? (
              <div className={`${activeConversation ? 'block' : 'hidden md:block'} flex-grow flex flex-col h-full`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <button 
                    className="md:hidden mr-2"
                    onClick={() => setActiveConversation(null)}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div>
                    <h3 className="font-bold">
                      {conversations.find(c => c.id === activeConversation)?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {conversations.find(c => c.id === activeConversation)?.baseName}
                    </p>
                  </div>
                  
                  <Link to={`/base/${conversations.find(c => c.id === activeConversation)?.baseId}`} className="text-scout-500 text-sm font-medium">
                    Zobacz bazę
                  </Link>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {activeMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.senderId === 'user' 
                          ? 'bg-scout-500 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}>
                        <p>{message.content}</p>
                        <div className={`text-xs mt-1 flex justify-end items-center gap-1 ${
                          message.senderId === 'user' ? 'text-scout-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                          {message.senderId === 'user' && (
                            message.read ? 
                              <CheckCheck className="h-3 w-3" /> : 
                              <Check className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
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
              </div>
            ) : (
              <div className="hidden md:flex flex-col flex-grow items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-scout-50 rounded-full flex items-center justify-center text-scout-500 mb-4">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Wybierz rozmowę</h3>
                <p className="text-gray-500 max-w-sm">
                  Zaznacz rozmowę z listy po lewej stronie lub rozpocznij nową, kontaktując się z właścicielem bazy.
                </p>
              </div>
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
