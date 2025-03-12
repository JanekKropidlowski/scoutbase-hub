
import { useState } from "react";
import { MapPin, Filter, List, Map as MapIcon, Plus, Minus } from "lucide-react";

// Mock data for marker points
const MOCK_POINTS = [
  { id: '1', lat: 52.1, lng: 21.3, name: "Stanica Harcerska Biały Las" },
  { id: '2', lat: 52.3, lng: 20.9, name: "Ośrodek Szkoleniowy Nadwiślańskie Wzgórze" },
  { id: '3', lat: 51.9, lng: 21.1, name: "Baza Obozowa Leśny Zakątek" },
  { id: '4', lat: 52.2, lng: 21.2, name: "Centrum Szkoleniowe Harcerska Dolina" },
];

const MapExplorer = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [zoom, setZoom] = useState(5);
  
  const increaseZoom = () => {
    setZoom(prev => Math.min(prev + 1, 10));
  };
  
  const decreaseZoom = () => {
    setZoom(prev => Math.max(prev - 1, 1));
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
          <button className="p-1.5 rounded hover:bg-muted/50" aria-label="Filtry">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {viewMode === 'map' ? (
        <div className="relative">
          <div className="aspect-[16/9] bg-scout-50 flex items-center justify-center">
            <div className="text-scout-500 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="font-medium">Interaktywna mapa</p>
              <p className="text-sm text-muted-foreground">Znajdź bazę harcerską w okolicy</p>
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
          
          {/* Bottom explorer */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-scout-200">
            <h4 className="font-medium mb-2">Bazy w okolicy</h4>
            <div className="space-y-2">
              {MOCK_POINTS.map(point => (
                <div key={point.id} className="flex items-center gap-2 p-2 hover:bg-scout-50 rounded-lg cursor-pointer transition-colors">
                  <MapPin className="h-5 w-5 text-scout-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{point.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {point.lat.toFixed(2)}°N, {point.lng.toFixed(2)}°E
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {MOCK_POINTS.map(point => (
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
