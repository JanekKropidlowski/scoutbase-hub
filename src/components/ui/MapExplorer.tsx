
import { useState, useEffect, useRef } from "react";
import { MapPin, Filter, List, Map as MapIcon, Plus, Minus, Navigation } from "lucide-react";

// Mock data for marker points
const MOCK_POINTS = [
  { id: '1', lat: 52.1, lng: 21.3, name: "Stanica Harcerska Biały Las", type: "stanica" },
  { id: '2', lat: 52.3, lng: 20.9, name: "Ośrodek Szkoleniowy Nadwiślańskie Wzgórze", type: "osrodek" },
  { id: '3', lat: 51.9, lng: 21.1, name: "Baza Obozowa Leśny Zakątek", type: "baza" },
  { id: '4', lat: 52.2, lng: 21.2, name: "Centrum Szkoleniowe Harcerska Dolina", type: "centrum" },
];

const MapExplorer = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [zoom, setZoom] = useState(5);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [filteredPoints, setFilteredPoints] = useState(MOCK_POINTS);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Get user location
  useEffect(() => {
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

  // Apply filters
  useEffect(() => {
    if (filter) {
      setFilteredPoints(MOCK_POINTS.filter(point => point.type === filter));
    } else {
      setFilteredPoints(MOCK_POINTS);
    }
  }, [filter]);
  
  const increaseZoom = () => {
    setZoom(prev => Math.min(prev + 1, 10));
  };
  
  const decreaseZoom = () => {
    setZoom(prev => Math.max(prev - 1, 1));
  };

  const handlePointClick = (id: string) => {
    setSelectedPoint(id === selectedPoint ? null : id);
  };

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    // Simple distance calculation for demonstration
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium">Interaktywna mapa baz</h3>
        <div className="flex items-center gap-2">
          <button 
            className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-scout-50 text-scout-500' : 'hover:bg-muted/50'}`}
            onClick={() => setViewMode('map')}
            aria-label="Widok mapy"
          >
            <MapIcon className="h-5 w-5" />
          </button>
          <button 
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-scout-50 text-scout-500' : 'hover:bg-muted/50'}`}
            onClick={() => setViewMode('list')}
            aria-label="Widok listy"
          >
            <List className="h-5 w-5" />
          </button>
          <div className="relative">
            <button className="p-1.5 rounded hover:bg-muted/50" aria-label="Filtry">
              <Filter className="h-5 w-5" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg p-2 z-10 hidden group-hover:block">
              <div className="flex flex-col space-y-1 min-w-[150px]">
                <button 
                  className={`px-3 py-1 text-sm rounded ${filter === null ? 'bg-scout-50 text-scout-500' : ''}`}
                  onClick={() => setFilter(null)}
                >
                  Wszystkie
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded ${filter === 'stanica' ? 'bg-scout-50 text-scout-500' : ''}`}
                  onClick={() => setFilter('stanica')}
                >
                  Stanice
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded ${filter === 'osrodek' ? 'bg-scout-50 text-scout-500' : ''}`}
                  onClick={() => setFilter('osrodek')}
                >
                  Ośrodki
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded ${filter === 'baza' ? 'bg-scout-50 text-scout-500' : ''}`}
                  onClick={() => setFilter('baza')}
                >
                  Bazy obozowe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {viewMode === 'map' ? (
        <div className="relative">
          <div 
            ref={mapRef}
            className="aspect-[16/9] bg-scout-50 flex items-center justify-center"
          >
            {/* Interactive map visualization */}
            <div className="relative w-full h-full overflow-hidden">
              {/* Map backdrop */}
              <div className="absolute inset-0 bg-scout-50/30"></div>
              
              {/* Simulated map grid lines */}
              <div className="absolute inset-0">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-scout-200/20"></div>
                  ))}
                </div>
              </div>
              
              {/* Map markers */}
              {filteredPoints.map((point) => (
                <div 
                  key={point.id}
                  className={`absolute cursor-pointer transition-all duration-300 transform ${
                    selectedPoint === point.id ? 'scale-125 z-20' : 'z-10'
                  }`}
                  style={{ 
                    left: `${((point.lng - 20) / 2) * 100}%`, 
                    top: `${((53 - point.lat) / 2) * 100}%` 
                  }}
                  onClick={() => handlePointClick(point.id)}
                >
                  <div className={`relative ${selectedPoint === point.id ? 'animate-pulse' : ''}`}>
                    <MapPin className={`h-6 w-6 ${
                      selectedPoint === point.id ? 'text-scout-600' : 'text-scout-500'
                    }`} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border-2 border-scout-500"></span>
                  </div>
                  
                  {selectedPoint === point.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded-lg shadow-lg p-2 z-30 w-40">
                      <p className="font-medium text-xs">{point.name}</p>
                      <p className="text-[10px] text-gray-500">
                        {point.lat.toFixed(2)}°N, {point.lng.toFixed(2)}°E
                      </p>
                      {userLocation && (
                        <p className="text-[10px] text-scout-500 mt-1">
                          {getDistance(userLocation.lat, userLocation.lng, point.lat, point.lng)} km od Ciebie
                        </p>
                      )}
                      <button className="w-full mt-1 text-[10px] bg-scout-50 text-scout-500 py-1 rounded font-medium">
                        Zobacz szczegóły
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* User location marker */}
              {userLocation && (
                <div 
                  className="absolute z-20"
                  style={{ 
                    left: `${((userLocation.lng - 20) / 2) * 100}%`, 
                    top: `${((53 - userLocation.lat) / 2) * 100}%` 
                  }}
                >
                  <div className="relative">
                    <div className="h-4 w-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                    <div className="h-4 w-4 bg-blue-500 rounded-full relative z-10 border-2 border-white"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-md">
            <button 
              className="p-2 border-b border-gray-100 hover:bg-scout-50 transition-colors"
              onClick={increaseZoom}
              aria-label="Przybliż"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button 
              className="p-2 hover:bg-scout-50 transition-colors"
              onClick={decreaseZoom}
              aria-label="Oddal"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
          
          {/* User location button */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md">
            <button 
              className="p-2 hover:bg-scout-50 transition-colors"
              onClick={() => {
                // Center map on user's location
                if (userLocation) {
                  // In a real implementation, this would center the map
                  console.log("Centering on user location", userLocation);
                }
              }}
              aria-label="Moja lokalizacja"
            >
              <Navigation className="h-5 w-5" />
            </button>
          </div>
          
          {/* Bottom explorer */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-scout-200">
            <h4 className="font-medium mb-2">Bazy w okolicy</h4>
            <div className="space-y-2">
              {filteredPoints.map(point => (
                <div 
                  key={point.id} 
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedPoint === point.id ? 'bg-scout-50' : 'hover:bg-scout-50/50'
                  }`}
                  onClick={() => handlePointClick(point.id)}
                >
                  <MapPin className={`h-5 w-5 ${
                    selectedPoint === point.id ? 'text-scout-600' : 'text-scout-500'
                  } flex-shrink-0`} />
                  <div>
                    <p className="font-medium text-sm">{point.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {point.lat.toFixed(2)}°N, {point.lng.toFixed(2)}°E
                    </p>
                    {userLocation && (
                      <p className="text-xs text-scout-500">
                        {getDistance(userLocation.lat, userLocation.lng, point.lat, point.lng)} km od Ciebie
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filteredPoints.map(point => (
            <div key={point.id} className="p-4 hover:bg-muted/20 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="bg-scout-50 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-scout-500" />
                </div>
                <div>
                  <h4 className="font-medium">{point.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {point.lat.toFixed(2)}°N, {point.lng.toFixed(2)}°E
                  </p>
                  {userLocation && (
                    <p className="text-sm text-scout-500 mt-0.5">
                      {getDistance(userLocation.lat, userLocation.lng, point.lat, point.lng)} km od Ciebie
                    </p>
                  )}
                  <div className="mt-2">
                    <button className="text-sm text-scout-500 font-medium">
                      Zobacz szczegóły
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapExplorer;
