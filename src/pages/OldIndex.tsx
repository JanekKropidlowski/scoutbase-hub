
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import SearchBar from "@/components/ui/SearchBar";
import FeaturedBase from "@/components/ui/FeaturedBase";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedBases } from "@/services/bases";
import MapExplorer from "@/components/ui/MapExplorer";
import RecentSearches from "@/components/ui/RecentSearches";
import TopBases from "@/components/ui/TopBases";
import { ArrowRight, Users, Map, MapPin, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: featuredBases = [], isLoading } = useQuery({
    queryKey: ["featured-bases"],
    queryFn: () => fetchFeaturedBases(8),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-scout-50/30 to-white/0 pointer-events-none"></div>
        <div className="container px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-block bg-scout-50 text-scout-600 font-medium px-3 py-1 rounded-full text-sm mb-4">
              Ogólnopolska baza harcerskich noclegów
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Znajdź <span className="text-scout-500">idealną bazę</span> na swój obóz harcerski
            </h1>
            <p className="text-xl text-muted-foreground">
              Przeglądaj stanice, ośrodki obozowe i pola namiotowe w całej Polsce. 
              Porównuj, rezerwuj i ciesz się udanym obozem.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <SearchBar />
          </div>
        </div>
      </section>
      
      {/* Featured Bases Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Polecane bazy</h2>
            <Link to="/search" className="text-scout-500 hover:text-scout-600 transition-colors font-medium flex items-center gap-1">
              Zobacz wszystkie
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading && <div className="text-sm text-muted-foreground">Ładowanie...</div>}
            {!isLoading && featuredBases.map((base, idx) => (
              <div key={base.id} className="animate-fade-up" style={{ animationDelay: `${0.1 + (idx + 1) * 0.1}s` }}>
                <FeaturedBase {...base} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map & Recent Searches Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-scout-50/20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MapExplorer />
            </div>
            <div className="space-y-8">
              <RecentSearches />
              <TopBases />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Wszystko, czego potrzebujesz do organizacji obozu
            </h2>
            <p className="text-lg text-muted-foreground">
              Nasza platforma zapewnia kompleksowe narzędzia do znalezienia i rezerwacji idealnej bazy harcerskiej
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-scout-50 p-3 rounded-xl inline-block mb-4">
                <Map className="h-6 w-6 text-scout-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interaktywna mapa</h3>
              <p className="text-muted-foreground mb-4">
                Przeglądaj bazy harcerskie na mapie i łatwo odnajduj miejsca w preferowanej przez Ciebie okolicy.
              </p>
              <Link to="/map" className="text-scout-500 hover:text-scout-600 font-medium flex items-center gap-1">
                Sprawdź mapę
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-scout-50 p-3 rounded-xl inline-block mb-4">
                <Calendar className="h-6 w-6 text-scout-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Terminy i dostępność</h3>
              <p className="text-muted-foreground mb-4">
                Sprawdzaj dostępne terminy, rezerwuj online i zarządzaj swoimi rezerwacjami w jednym miejscu.
              </p>
              <Link to="/search" className="text-scout-500 hover:text-scout-600 font-medium flex items-center gap-1">
                Szukaj terminów
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-scout-50 p-3 rounded-xl inline-block mb-4">
                <Users className="h-6 w-6 text-scout-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dostosowane do Twoich potrzeb</h3>
              <p className="text-muted-foreground mb-4">
                Filtruj bazy wg liczby uczestników, wyposażenia, infrastruktury i atrakcji w okolicy.
              </p>
              <Link to="/search" className="text-scout-500 hover:text-scout-600 font-medium flex items-center gap-1">
                Filtruj bazy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-scout-500 text-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Jesteś właścicielem bazy harcerskiej?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Dołącz do nas i zaprezentuj swoją bazę tysiącom harcerzy i instruktorów z całej Polski. 
              To proste i całkowicie bezpłatne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/add-base" className="bg-white text-scout-500 font-medium px-6 py-3 rounded-xl hover:bg-scout-50 transition-colors">
                Dodaj swoją bazę
              </Link>
              <Link to="/owner-info" className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Dowiedz się więcej
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Co mówią o nas użytkownicy
            </h2>
            <p className="text-lg text-muted-foreground">
              Setki drużynowych i tysące harcerzy korzysta już z naszej platformy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 gap-2">
                <div className="h-10 w-10 rounded-full bg-scout-100 flex items-center justify-center font-medium text-scout-500">
                  JK
                </div>
                <div>
                  <h4 className="font-medium">Jan Kowalski</h4>
                  <p className="text-sm text-muted-foreground">Drużynowy, Warszawa</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Nareszcie wszystkie bazy harcerskie w jednym miejscu! Zaoszczędziłem mnóstwo czasu na poszukiwaniach idealnego miejsca na obóz dla mojej drużyny."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 gap-2">
                <div className="h-10 w-10 rounded-full bg-scout-100 flex items-center justify-center font-medium text-scout-500">
                  AN
                </div>
                <div>
                  <h4 className="font-medium">Anna Nowak</h4>
                  <p className="text-sm text-muted-foreground">Komendantka hufca, Kraków</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Dzięki tej platformie znaleźliśmy fantastyczną bazę dla naszego obozu hufca. Właściciel bazy szybko odpowiadał na nasze pytania przez wbudowany komunikator."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 gap-2">
                <div className="h-10 w-10 rounded-full bg-scout-100 flex items-center justify-center font-medium text-scout-500">
                  PW
                </div>
                <div>
                  <h4 className="font-medium">Piotr Wiśniewski</h4>
                  <p className="text-sm text-muted-foreground">Właściciel bazy, Mazury</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Odkąd dodałem naszą stanicę do katalogu, liczba rezerwacji wzrosła o 40%! Szczególnie doceniam funkcję zarządzania terminami i obsługi zapytań."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Posts Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-scout-50/30">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Ogłoszenia "Szukam bazy"</h2>
              <p className="text-muted-foreground">Najnowsze zapytania od drużyn i hufców</p>
            </div>
            <Link to="/posts" className="text-scout-500 hover:text-scout-600 transition-colors font-medium flex items-center gap-1">
              Zobacz wszystkie
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-scout-100">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-scout-50 text-scout-700 text-sm font-medium px-3 py-1 rounded-full">
                  Pilne
                </div>
                <p className="text-sm text-muted-foreground">Dodano 2 dni temu</p>
              </div>
              <h3 className="text-xl font-bold mb-2">Poszukujemy bazy nad jeziorem</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-scout-500" />
                  <span>Mazury lub Warmia</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 text-scout-500" />
                  <span>60-80 osób</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-scout-500" />
                  <span>15-29 lipca 2023</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                Poszukujemy bazy z dostępem do jeziora, pomostem i możliwością uprawiania sportów wodnych. Potrzebny własny sprzęt pionierski.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-scout-50 text-scout-700 font-medium py-2 rounded-lg hover:bg-scout-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Odpowiedz</span>
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-scout-100">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-scout-50 text-scout-700 text-sm font-medium px-3 py-1 rounded-full">
                  Nowe
                </div>
                <p className="text-sm text-muted-foreground">Dodano 5 dni temu</p>
              </div>
              <h3 className="text-xl font-bold mb-2">Baza w górach dla 40 osób</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-scout-500" />
                  <span>Beskidy lub Bieszczady</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 text-scout-500" />
                  <span>30-40 osób</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-scout-500" />
                  <span>1-15 sierpnia 2023</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                Szukamy bazy z zapleczem kuchennym i sanitarnym. Mile widziane szlaki turystyczne w okolicy oraz dostęp do sklepu.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-scout-50 text-scout-700 font-medium py-2 rounded-lg hover:bg-scout-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Odpowiedz</span>
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-scout-100">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-scout-50 text-scout-700 text-sm font-medium px-3 py-1 rounded-full">
                  Popularne
                </div>
                <p className="text-sm text-muted-foreground">Dodano tydzień temu</p>
              </div>
              <h3 className="text-xl font-bold mb-2">Stanica dla szczepu - 120 osób</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-scout-500" />
                  <span>Dowolny region Polski</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 text-scout-500" />
                  <span>100-120 osób</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-scout-500" />
                  <span>Lipiec 2023 (3 tygodnie)</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                Poszukujemy dużej stanicy lub ośrodka z pełnym wyżywieniem. Potrzebne miejsca noclegowe w budynkach i pole namiotowe.
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-scout-50 text-scout-700 font-medium py-2 rounded-lg hover:bg-scout-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Odpowiedz</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Index;
