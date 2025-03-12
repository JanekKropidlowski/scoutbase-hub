
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for top bases
const TOP_BASES = [
  {
    id: '1',
    name: "Stanica Wodna Serwy",
    location: "Podlaskie",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2340&auto=format&fit=crop",
    rating: 4.9,
    reviews: 124
  },
  {
    id: '2',
    name: "Harcerska Baza Rogowo",
    location: "Zachodniopomorskie",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2340&auto=format&fit=crop",
    rating: 4.8,
    reviews: 87
  },
  {
    id: '3',
    name: "Ośrodek Nadrzecze",
    location: "Lubelskie",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2340&auto=format&fit=crop",
    rating: 4.7,
    reviews: 92
  }
];

const TopBases = () => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="font-medium text-lg">TOP Bazy harcerskie</h3>
          <p className="text-sm text-muted-foreground">Najwyżej oceniane przez użytkowników</p>
        </div>
        <Link to="/top" className="text-scout-500 hover:text-scout-600 transition-colors text-sm font-medium flex items-center gap-1">
          Zobacz wszystkie
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {TOP_BASES.map((base, index) => (
          <Link to={`/base/${base.id}`} key={base.id}>
            <div className="flex gap-4 p-2 hover:bg-scout-50/50 rounded-xl transition-colors">
              <div className="relative flex-shrink-0">
                <div className="h-16 w-16 rounded-lg overflow-hidden">
                  <img src={base.image} alt={base.name} className="h-full w-full object-cover" />
                </div>
                <div className="absolute -top-2 -left-2 bg-scout-500 text-white font-bold h-6 w-6 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium">{base.name}</h4>
                <p className="text-sm text-muted-foreground">{base.location}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-scout-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 font-medium">{base.rating}</span>
                  </div>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{base.reviews} opinii</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBases;
