
import { useState } from "react";
import { Search, MapPin, Calendar, Users, Filter } from "lucide-react";

const SearchBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`glass-card rounded-2xl transition-all duration-300 ${
      expanded ? "p-6" : "p-4"
    }`}>
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="bg-scout-50 p-2 rounded-lg">
          <Search className="h-5 w-5 text-scout-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Szukaj bazy harcerskiej</h3>
          <p className="text-sm text-muted-foreground">Znajdź idealne miejsce na obóz</p>
        </div>
        <div className="bg-scout-500 text-white p-2 rounded-lg">
          <Search className="h-5 w-5" />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Lokalizacja</label>
            <div className="flex items-center border border-input rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-scout-500">
              <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Województwo, powiat..." 
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Data</label>
            <div className="flex items-center border border-input rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-scout-500">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Wybierz termin..." 
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Liczba uczestników</label>
            <div className="flex items-center border border-input rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-scout-500">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <input 
                type="number" 
                placeholder="Ile osób?" 
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Filtry</label>
            <div className="flex items-center border border-input rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-scout-500">
              <Filter className="h-4 w-4 text-muted-foreground mr-2" />
              <select className="w-full bg-transparent outline-none appearance-none cursor-pointer">
                <option>Wszystkie typy baz</option>
                <option>Stanica harcerska</option>
                <option>Ośrodek obozowy</option>
                <option>Pole namiotowe</option>
              </select>
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-4 mt-2">
            <button className="w-full bg-scout-500 hover:bg-scout-600 text-white font-medium py-2.5 rounded-lg transition-colors">
              Szukaj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
