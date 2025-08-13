
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTopBases } from "@/services/bases";

const TopBases = () => {
  const { data: bases = [], isLoading } = useQuery({
    queryKey: ["top-bases"],
    queryFn: () => fetchTopBases(3),
  });

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
        {isLoading && (
          <div className="text-sm text-muted-foreground">Ładowanie...</div>
        )}
        {!isLoading && bases.map((base, index) => (
          <Link to={`/base/${base.id}`} key={base.id}>
            <div className="flex gap-4 p-2 hover:bg-scout-50/50 rounded-xl transition-colors">
              <div className="relative flex-shrink-0">
                <div className="h-16 w-16 rounded-lg overflow-hidden">
                  <img src={base.image ?? ''} alt={base.name} className="h-full w-full object-cover" />
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
                    <span className="ml-1 font-medium">{Number(base.rating).toFixed(1)}</span>
                  </div>
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
