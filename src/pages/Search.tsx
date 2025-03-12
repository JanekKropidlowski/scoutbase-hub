
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import SearchBar from "@/components/ui/SearchBar";
import { MapPin, Users, Calendar, Heart, ArrowDown, ArrowUp, FilterX } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_BASES = Array.from({ length: 8 }).map((_, index) => ({
  id: (index + 1).toString(),
  name: `Baza Harcerska ${["Leśna Polana", "Nad Jeziorem", "Górski Szlak", "Zielona Dolina", "Pod Sosnami", "Wędrowiec", "Stary Młyn", "Wilcze Uroczysko"][index]}`,
  location: `${["Mazury", "Pomorze", "Bieszczady", "Wielkopolska", "Małopolska", "Kaszuby", "Dolny Śląsk", "Świętokrzyskie"][index]}, ${["Mikołajki", "Gdańsk", "Ustrzyki Dolne", "Poznań", "Zakopane", "Kartuzy", "Wrocław", "Kielce"][index]}`,
  image: `https://images.unsplash.com/photo-${1500000000000 + index * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
  price: `${20 + index * 5} zł/os`,
  rating: (4 + (index % 2) * 0.5) / 5,
  reviewCount: 10 + index * 5,
  capacity: 50 + index * 10
}));

const Search = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"popularity" | "price" | "rating">("popularity");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Search header */}
        <div className="bg-scout-50/20 py-8">
          <div className="container px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Znajdź idealną bazę harcerską</h1>
            <SearchBar />
          </div>
        </div>
        
        {/* Filters and results */}
        <div className="container px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-700">Znaleziono <span className="font-medium">{MOCK_BASES.length}</span> wyników</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
              >
                <FilterX className="h-4 w-4" />
                <span>Filtry</span>
              </button>
              <div className="relative">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="appearance-none bg-gray-100 px-3 py-1.5 pr-8 rounded-lg text-sm font-medium cursor-pointer"
                >
                  <option value="popularity">Popularność</option>
                  <option value="price">Cena: od najniższej</option>
                  <option value="rating">Oceny: od najwyższej</option>
                </select>
                <ArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Filters panel */}
          {isFilterOpen && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h3 className="font-medium mb-2">Lokalizacja</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Mazury</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Pomorze</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Góry</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Typ bazy</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Stanica harcerska</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Pole namiotowe</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Ośrodek z budynkami</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Udogodnienia</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Dostęp do jeziora</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Pełne wyżywienie</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Sprzęt pionierski</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Liczba uczestników</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>do 50 osób</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>50-100 osób</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>powyżej 100 osób</span>
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-4 flex justify-end mt-2">
                <button className="bg-scout-500 text-white px-4 py-2 rounded-lg hover:bg-scout-600 transition-colors">
                  Zastosuj filtry
                </button>
              </div>
            </div>
          )}
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_BASES.map((base) => (
              <Link key={base.id} to={`/base/${base.id}`} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={base.image} 
                    alt={base.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-sm font-medium">
                    {base.price}
                  </div>
                  <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full">
                    <Heart className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{base.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {base.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < Math.round(base.rating * 5) ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({base.reviewCount})</span>
                    </div>
                    <span className="text-sm font-medium flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      max {base.capacity}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Search;
