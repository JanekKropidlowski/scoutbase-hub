
import { Clock, MapPin, Users, ArrowRight } from "lucide-react";

// Mock data for recent searches
const RECENT_SEARCHES = [
  {
    id: '1',
    location: "Mazury, Warmińsko-mazurskie",
    date: "20-30 lip 2023",
    participants: 30
  },
  {
    id: '2',
    location: "Góry Świętokrzyskie",
    date: "5-15 sie 2023",
    participants: 45
  },
  {
    id: '3',
    location: "Pojezierze Drawskie",
    date: "1-10 lip 2023",
    participants: 25
  }
];

const RecentSearches = () => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Twoje ostatnie wyszukiwania</h3>
        <button className="text-scout-500 hover:text-scout-600 transition-colors text-sm font-medium flex items-center gap-1">
          Zobacz wszystkie
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {RECENT_SEARCHES.map(search => (
          <div key={search.id} className="p-3 border border-border rounded-xl hover:border-scout-200 cursor-pointer transition-all bg-white hover:bg-scout-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-scout-500" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-scout-400 mr-1" />
                    <span>{search.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-scout-400 mr-1" />
                    <span>{search.participants} osób</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{search.date}</p>
              </div>
              
              <button className="rounded-full bg-white p-1.5 shadow-sm hover:shadow-md transition-shadow">
                <ArrowRight className="h-4 w-4 text-scout-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
