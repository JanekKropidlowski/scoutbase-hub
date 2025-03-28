
import { Link, useLocation } from "react-router-dom";
import { Search, MapPin, Heart, MessageSquare, User } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg md:hidden z-40">
      <div className="flex justify-around">
        <Link 
          to="/search" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/search") 
              ? "text-scout-500 relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-scout-500 after:rounded-full" 
              : "text-gray-500"
          }`}
        >
          <Search className={`h-5 w-5 ${isActive("/search") ? "stroke-[2.5px]" : ""}`} />
          <span className="text-xs mt-1 font-medium">Szukaj</span>
        </Link>
        
        <Link 
          to="/map" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/map") 
              ? "text-scout-500 relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-scout-500 after:rounded-full" 
              : "text-gray-500"
          }`}
        >
          <MapPin className={`h-5 w-5 ${isActive("/map") ? "stroke-[2.5px]" : ""}`} />
          <span className="text-xs mt-1 font-medium">Mapa</span>
        </Link>
        
        <Link 
          to="/favorites" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/favorites") 
              ? "text-scout-500 relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-scout-500 after:rounded-full" 
              : "text-gray-500"
          }`}
        >
          <Heart className={`h-5 w-5 ${isActive("/favorites") ? "stroke-[2.5px]" : ""}`} />
          <span className="text-xs mt-1 font-medium">Ulubione</span>
        </Link>
        
        <Link 
          to="/messages" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/messages") 
              ? "text-scout-500 relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-scout-500 after:rounded-full" 
              : "text-gray-500"
          }`}
        >
          <MessageSquare className={`h-5 w-5 ${isActive("/messages") ? "stroke-[2.5px]" : ""}`} />
          <span className="text-xs mt-1 font-medium">Wiadomości</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center py-3 px-2 ${
            isActive("/profile") 
              ? "text-scout-500 relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-scout-500 after:rounded-full" 
              : "text-gray-500"
          }`}
        >
          <User className={`h-5 w-5 ${isActive("/profile") ? "stroke-[2.5px]" : ""}`} />
          <span className="text-xs mt-1 font-medium">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
