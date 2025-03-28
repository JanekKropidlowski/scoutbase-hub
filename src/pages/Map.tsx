
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { MapPin, Search, List, ArrowLeft, Filter, Navigation, MapPinCheck, Heart } from "lucide-react";
import MapExplorer from "@/components/ui/MapExplorer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const REGIONS = [
  "Wszystkie regiony",
  "Mazury",
  "Pomorze",
  "Góry",
  "Wielkopolska",
  "Małopolska",
  "Mazowsze",
  "Śląsk",
  "Podlasie",
];

const FEATURES = [
  { id: "water", label: "Nad wodą" },
  { id: "forest", label: "W lesie" },
  { id: "mountain", label: "W górach" },
  { id: "food", label: "Z wyżywieniem" },
  { id: "buildings", label: "Z budynkami" },
  { id: "electricity", label: "Z prądem" },
];

const Map = () => {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Error getting location", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId) 
        : [...prev, featureId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header with search and filters */}
        <div className="sticky top-16 bg-white z-30 border-b border-gray-200 shadow-sm">
          <div className="container px-4 py-3 flex items-center justify-between">
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Bazy harcerskie w Polsce</h1>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              {selectedFeatures.length > 0 && (
                <span className="absolute top-0 right-0 bg-scout-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  {selectedFeatures.length}
                </span>
              )}
            </button>
          </div>
          
          <div className="container px-4 pb-3">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-2 bg-white">
                <Search className="h-5 w-5 text-gray-400 ml-2" />
                <Input
                  type="text"
                  placeholder="Szukaj bazy, regionu, miasta..."
                  className="flex-grow bg-transparent border-none focus:outline-none px-2 h-8 shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {showFilters && (
              <Card className="mt-3 border-none shadow-md animate-in slide-in-from-top-5 duration-200">
                <CardContent className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Region</p>
                      <Select 
                        value={selectedRegion} 
                        onValueChange={setSelectedRegion}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Wybierz region" />
                        </SelectTrigger>
                        <SelectContent>
                          {REGIONS.map(region => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Cechy</p>
                      <div className="flex flex-wrap gap-2">
                        {FEATURES.map(feature => (
                          <button
                            key={feature.id}
                            className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1 transition-colors ${
                              selectedFeatures.includes(feature.id)
                                ? 'bg-scout-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => toggleFeature(feature.id)}
                          >
                            {selectedFeatures.includes(feature.id) && (
                              <MapPinCheck className="h-3.5 w-3.5" />
                            )}
                            {feature.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {userLocation && (
                    <div className="mt-3 flex items-center">
                      <button 
                        className="flex items-center gap-1.5 text-sm text-scout-500 font-medium"
                        onClick={() => {
                          // In a real implementation, this would center the map and sort by distance
                          console.log("Finding nearest locations");
                        }}
                      >
                        <Navigation className="h-4 w-4" />
                        Pokaż najbliższe bazy
                      </button>
                      <span className="text-xs text-gray-500 ml-2">
                        (Twoja lokalizacja: {userLocation.lat.toFixed(2)}°N, {userLocation.lng.toFixed(2)}°E)
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            <div className="flex mt-3 space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium flex items-center transition-colors ${
                  selectedRegion === "Mazury"
                    ? "bg-scout-50 text-scout-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedRegion("Mazury")}
              >
                <MapPin className="h-4 w-4 mr-1" />
                Mazury
              </button>
              <button 
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFeatures.includes("water")
                    ? "bg-scout-50 text-scout-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => toggleFeature("water")}
              >
                Nad wodą
              </button>
              <button 
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFeatures.includes("mountain")
                    ? "bg-scout-50 text-scout-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => toggleFeature("mountain")}
              >
                W górach
              </button>
              <button 
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFeatures.includes("buildings")
                    ? "bg-scout-50 text-scout-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => toggleFeature("buildings")}
              >
                Z budynkami
              </button>
              <button 
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFeatures.includes("food")
                    ? "bg-scout-50 text-scout-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => toggleFeature("food")}
              >
                Z wyżywieniem
              </button>
            </div>
          </div>
          
          <div className="container px-4 pb-3 flex space-x-2">
            <button 
              className={`flex-1 py-2 rounded-lg flex justify-center items-center transition-colors ${
                viewMode === "map" ? "bg-scout-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-4 w-4 mr-1" />
              Mapa
            </button>
            <button 
              className={`flex-1 py-2 rounded-lg flex justify-center items-center transition-colors ${
                viewMode === "list" ? "bg-scout-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white touch-effect">
                    <div className="relative h-48 bg-gray-200">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + index * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
                        alt="Baza harcerska"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-sm font-medium">
                        Od 25 zł/os
                      </div>
                      <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full active:bg-scout-50 transition-colors">
                        <Heart className="w-5 h-5 text-gray-500" />
                      </button>
                      {selectedFeatures.includes("water") && (
                        <div className="absolute bottom-3 left-3 bg-blue-500 bg-opacity-90 text-white px-2 py-0.5 rounded-full text-xs">
                          Nad wodą
                        </div>
                      )}
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
                      {userLocation && (
                        <p className="text-xs text-scout-500 mt-2">
                          <Navigation className="h-3.5 w-3.5 inline mr-1" />
                          {(Math.random() * 100 + 50).toFixed(1)} km od Ciebie
                        </p>
                      )}
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
