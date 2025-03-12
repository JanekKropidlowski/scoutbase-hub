
import { Link } from "react-router-dom";
import { SearchIcon, Menu, User, MapPin, Heart, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/478ea31a-4a6f-4670-a860-6ffbed7ae3e9.png" 
            alt="BazyHarcerskie.pl Logo" 
            className="h-10 w-auto" 
          />
          <span className="sr-only md:not-sr-only md:text-xl font-medium text-scout-500">
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
        
        <button className="md:hidden flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <nav className="flex flex-col p-4">
            <Link to="/map" className="py-3 border-b border-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <MapPin className="h-5 w-5 text-scout-500" />
              <span>Mapa</span>
            </Link>
            <Link to="/search" className="py-3 border-b border-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <SearchIcon className="h-5 w-5 text-scout-500" />
              <span>Szukaj bazy</span>
            </Link>
            <Link to="/favorites" className="py-3 border-b border-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Heart className="h-5 w-5 text-scout-500" />
              <span>Ulubione</span>
            </Link>
            <Link to="/messages" className="py-3 border-b border-gray-100 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <MessageSquare className="h-5 w-5 text-scout-500" />
              <span>Wiadomości</span>
            </Link>
            <Link to="/profile" className="py-3 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <User className="h-5 w-5 text-scout-500" />
              <span>Profil</span>
            </Link>
          </nav>
          <div className="flex items-center gap-2 p-4 pt-0">
            <Link to="/login" className="flex-1 text-center py-2 border border-scout-500 text-scout-500 rounded-full" onClick={() => setMenuOpen(false)}>
              Zaloguj
            </Link>
            <Link to="/register" className="flex-1 text-center bg-scout-500 text-white py-2 rounded-full" onClick={() => setMenuOpen(false)}>
              Rejestracja
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
