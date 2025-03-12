
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-scout-50 border-t border-scout-100">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/478ea31a-4a6f-4670-a860-6ffbed7ae3e9.png" 
                alt="BazyHarcerskie.pl Logo" 
                className="h-12 w-auto" 
              />
              <span className="text-xl font-medium text-scout-500">
                BazyHarcerskie.pl
              </span>
            </div>
            <p className="text-scout-700/80 mb-4">
              Ogólnopolska baza harcerskich noclegów. Znajdź idealną bazę na swój obóz lub biwak.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-scout-500 hover:text-scout-600 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-scout-500 hover:text-scout-600 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-scout-500 hover:text-scout-600 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-scout-700">Szybkie linki</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Szukaj bazy
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Interaktywna mapa
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Ulubione
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Ogłoszenia "Szukam bazy"
                </Link>
              </li>
              <li>
                <Link to="/top" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  TOP Bazy harcerskie
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-scout-700">Dla właścicieli</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/add-base" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Dodaj swoją bazę
                </Link>
              </li>
              <li>
                <Link to="/owner-panel" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Panel właściciela
                </Link>
              </li>
              <li>
                <Link to="/stats" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Statystyki
                </Link>
              </li>
              <li>
                <Link to="/promotion" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  Promowanie bazy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-scout-700">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-scout-500 mt-0.5 flex-shrink-0" />
                <span className="text-scout-700/80">
                  00-000 Warszawa, ul. Przykładowa 123
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-scout-500 flex-shrink-0" />
                <a href="tel:+48123456789" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-scout-500 flex-shrink-0" />
                <a href="mailto:kontakt@bazyharcerskie.pl" className="text-scout-700/80 hover:text-scout-500 transition-colors">
                  kontakt@bazyharcerskie.pl
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-scout-100 mt-8 pt-8 text-center text-scout-700/70">
          <p>© {new Date().getFullYear()} BazyHarcerskie.pl - Wszystkie prawa zastrzeżone</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
