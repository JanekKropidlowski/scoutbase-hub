
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FeaturedBaseProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: string;
  capacity: number;
  featured?: boolean;
}

const FeaturedBase = ({
  id,
  name,
  location,
  image,
  rating,
  price,
  capacity,
  featured = false,
}: FeaturedBaseProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Link to={`/base/${id}`} className="group block">
      <div className="base-card relative overflow-hidden rounded-xl hover-lift transition-all duration-300 bg-white shadow-sm hover:shadow-md">
        <div className="relative overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img
              src={image}
              alt={name}
              className="base-image"
              loading="lazy"
            />
          </div>
          
          {featured && (
            <div className="absolute top-3 left-3 bg-scout-500 text-white text-xs px-2 py-1 rounded-full">
              Polecane
            </div>
          )}
          
          <button
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isFavorite 
                ? "bg-white/90 text-red-500" 
                : "bg-white/70 text-gray-600 hover:text-red-500"
            } transition-colors`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{name}</h3>
              <p className="text-muted-foreground">{location}</p>
            </div>
            <div className="bg-scout-50 text-scout-700 font-medium px-2 py-1 rounded text-sm">
              {rating}/5
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Pojemność</span>
              <p className="font-medium">{capacity} osób</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Cena od</span>
              <p className="font-medium">{price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBase;
