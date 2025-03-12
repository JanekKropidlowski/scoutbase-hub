
import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, Heart, MessageSquare, User } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
      <div className="flex justify-around">
        <Link 
          to="/search" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/search") ? "text-scout-500" : "text-gray-500"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Szukaj</span>
        </Link>
        
        <Link 
          to="/map" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/map") ? "text-scout-500" : "text-gray-500"
          }`}
        >
          <MapPin className="h-6 w-6" />
          <span className="text-xs mt-1">Mapa</span>
        </Link>
        
        <Link 
          to="/favorites" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/favorites") ? "text-scout-500" : "text-gray-500"
          }`}
        >
          <Heart className="h-6 w-6" />
          <span className="text-xs mt-1">Ulubione</span>
        </Link>
        
        <Link 
          to="/messages" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/messages") ? "text-scout-500" : "text-gray-500"
          }`}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs mt-1">Wiadomości</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/profile") ? "text-scout-500" : "text-gray-500"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
