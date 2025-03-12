
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { MapPin, Search, List, ArrowLeft } from "lucide-react";
import MapExplorer from "@/components/ui/MapExplorer";

const Map = () => {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header with search and filters */}
        <div className="sticky top-16 bg-white z-30 border-b border-gray-200">
          <div className="container px-4 py-3 flex items-center justify-between">
            <button className="md:hidden p-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Bazy harcerskie w Polsce</h1>
          </div>
          
          <div className="container px-4 pb-3">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-2 bg-white">
                <Search className="h-5 w-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Szukaj bazy, regionu, miasta..."
                  className="flex-grow bg-transparent border-none focus:outline-none px-2"
                />
              </div>
            </div>
            
            <div className="flex mt-3 space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="whitespace-nowrap px-3 py-1 bg-scout-50 text-scout-700 rounded-full text-sm font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Mazury
              </button>
              <button className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                Nad jeziorem
              </button>
              <button className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                Nad morzem
              </button>
              <button className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                W górach
              </button>
              <button className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                Stanice
              </button>
              <button className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                Ośrodki z wyżywieniem
              </button>
            </div>
          </div>
          
          <div className="container px-4 pb-3 flex space-x-2">
            <button 
              className={`flex-1 py-2 rounded-lg flex justify-center items-center ${
                viewMode === "map" ? "bg-scout-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-4 w-4 mr-1" />
              Mapa
            </button>
            <button 
              className={`flex-1 py-2 rounded-lg flex justify-center items-center ${
                viewMode === "list" ? "bg-scout-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </button>
          </div>
        </div>
        
        {/* Map or list content */}
        <div className="flex-grow">
          {viewMode === "map" ? (
            <div className="h-[calc(100vh-250px)] md:h-[calc(100vh-200px)]">
              <MapExplorer />
            </div>
          ) : (
            <div className="container px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 bg-gray-200">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + index * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
                        alt="Baza harcerska"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-sm font-medium">
                        Od 25 zł/os
                      </div>
                      <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">Baza Harcerska {index + 1}</h3>
                      <p className="text-gray-500 text-sm mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Mazury, okolice Mikołajek
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★★★★☆</span>
                          <span className="text-sm text-gray-500 ml-1">(24)</span>
                        </div>
                        <span className="text-sm font-medium">max 120 osób</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Map;
