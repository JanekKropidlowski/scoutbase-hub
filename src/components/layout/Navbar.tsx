
import { Link } from "react-router-dom";
import { SearchIcon, Menu, User, MapPin, Heart, MessageSquare, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // This would normally be determined by auth state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 press-effect">
          <div className="relative h-9 w-9 flex items-center justify-center bg-scout-500 rounded-full overflow-hidden">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
              <path d="M20 5L26 12L20 19L14 12L20 5Z" fill="white" />
              <path d="M20 21L26 28L20 35L14 28L20 21Z" fill="white" />
              <path d="M5 13L11 20L5 27L5 13Z" fill="white" />
              <path d="M35 13L29 20L35 27L35 13Z" fill="white" />
            </svg>
          </div>
          <span className="sr-only md:not-sr-only md:text-lg font-semibold text-scout-500">
            BazyHarcerskie.pl
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5">
            <Link to="/map" className="text-foreground/80 hover:text-scout-500 transition-colors">
              Mapa
            </Link>
            <Link to="/search" className="text-foreground/80 hover:text-scout-500 transition-colors">
              Szukaj bazy
            </Link>
            <Link to="/favorites" className="text-foreground/80 hover:text-scout-500 transition-colors">
              Ulubione
            </Link>
            <Link to="/posts" className="text-foreground/80 hover:text-scout-500 transition-colors">
              Ogłoszenia
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-scout-500 transition-colors flex items-center gap-1">
                <LayoutDashboard className="h-4 w-4" />
                <span>CMS</span>
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 rounded-full hover:bg-scout-50 transition-colors">
              Zaloguj
            </Link>
            <Link to="/register" className="bg-scout-500 text-white px-4 py-2 rounded-full hover:bg-scout-600 transition-colors">
              Rejestracja
            </Link>
          </div>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden flex items-center justify-center press-effect" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] pt-12 px-4">
            <nav className="flex flex-col p-2 space-y-1">
              <Link to="/map" className="py-3 px-3 rounded-xl hover:bg-scout-50 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-scout-500" />
                <span className="font-medium">Mapa</span>
              </Link>
              <Link to="/search" className="py-3 px-3 rounded-xl hover:bg-scout-50 flex items-center gap-3">
                <SearchIcon className="h-5 w-5 text-scout-500" />
                <span className="font-medium">Szukaj bazy</span>
              </Link>
              <Link to="/favorites" className="py-3 px-3 rounded-xl hover:bg-scout-50 flex items-center gap-3">
                <Heart className="h-5 w-5 text-scout-500" />
                <span className="font-medium">Ulubione</span>
              </Link>
              <Link to="/messages" className="py-3 px-3 rounded-xl hover:bg-scout-50 flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-scout-500" />
                <span className="font-medium">Wiadomości</span>
              </Link>
              <Link to="/profile" className="py-3 px-3 rounded-xl hover:bg-scout-50 flex items-center gap-3">
                <User className="h-5 w-5 text-scout-500" />
                <span className="font-medium">Profil</span>
              </Link>
              {isAdmin && (
                <Link to="/admin" className="py-3 px-3 rounded-xl hover:bg-scout-50 flex items-center gap-3">
                  <LayoutDashboard className="h-5 w-5 text-scout-500" />
                  <span className="font-medium">Panel CMS</span>
                </Link>
              )}
            </nav>
            <div className="flex flex-col gap-3 mt-6 px-2">
              <Link to="/login" className="w-full text-center py-2.5 border border-scout-500 text-scout-500 rounded-xl font-medium">
                Zaloguj
              </Link>
              <Link to="/register" className="w-full text-center bg-scout-500 text-white py-2.5 rounded-xl font-medium">
                Rejestracja
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
