
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { MapPin, Users, Heart, Trash2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for favorites
const MOCK_FAVORITES = [
  {
    id: "1",
    name: "Stanica Harcerska Biały Las",
    location: "Warmińsko-mazurskie, Mazury",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "25 zł/os",
    capacity: 120,
    notes: "Idealna baza na letni obóz dla drużyny"
  },
  {
    id: "3",
    name: "Centrum Szkoleniowe Harcerska Dolina",
    location: "Dolnośląskie, Sudety",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "35 zł/os",
    capacity: 150,
    notes: null
  }
];

const Favorites = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Ulubione bazy</h1>
          <p className="text-gray-500 mb-8">Twoje zapisane bazy harcerskie</p>
          
          {MOCK_FAVORITES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_FAVORITES.map((base) => (
                <div key={base.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <img 
                      src={base.image} 
                      alt={base.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-sm font-medium">
                      {base.price}
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full text-red-500">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/base/${base.id}`}>
                      <h3 className="font-bold text-lg mb-1 hover:text-scout-500 transition-colors">{base.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {base.location}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        max {base.capacity} osób
                      </span>
                      <span className="text-sm text-gray-500">Dodano 12.03.2023</span>
                    </div>
                    
                    {base.notes && (
                      <div className="bg-scout-50/40 p-3 rounded-lg text-sm">
                        <p className="font-medium mb-1">Twoje notatki:</p>
                        <p>{base.notes}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-between">
                      <button className="text-scout-500 flex items-center text-sm font-medium">
                        <Heart className="h-4 w-4 mr-1" />
                        Edytuj notatkę
                      </button>
                      <button className="text-red-500 flex items-center text-sm font-medium">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scout-50 text-scout-500 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold mb-2">Nie masz żadnych ulubionych baz</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Przeglądaj bazy harcerskie i dodawaj je do ulubionych, aby mieć do nich szybki dostęp
              </p>
              <Link 
                to="/search" 
                className="bg-scout-500 text-white px-4 py-2 rounded-lg hover:bg-scout-600 transition-colors"
              >
                Znajdź bazę
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Favorites;
