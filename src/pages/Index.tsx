import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy, 
  Users, 
  Target, 
  Timer, 
  ArrowRight, 
  CheckCircle,
  Calendar,
  MapPin,
  Medal,
  BarChart3,
  FileText,
  Zap
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sports-500 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">ScoutBase Hub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/events" className="text-gray-600 hover:text-gray-900 transition-colors">
                Wydarzenia
              </Link>
              <Link to="/events/1/results" className="text-gray-600 hover:text-gray-900 transition-colors">
                Wyniki na żywo
              </Link>
              <Button asChild className="bg-sports-500 hover:bg-sports-600">
                <Link to="/events">
                  Panel organizatora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-sports-50 text-sports-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              System Zawodów Sportowych w Czasie Rzeczywistym
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Kompleksowy system zarządzania 
              <span className="text-sports-500"> zawodami sportowymi</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Od zgłoszeń drużyn przez wprowadzanie wyników w czasie rzeczywistym 
              po automatyczne generowanie klasyfikacji i dokumentów. 
              Wszystko w jednej platformie dla Pomorskiego Zrzeszenia LZS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-sports-500 hover:bg-sports-600 text-lg px-8 py-4">
                <Link to="/events">
                  <Trophy className="h-5 w-5 mr-2" />
                  Rozpocznij zarządzanie wydarzeniem
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/events/1/results">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Zobacz wyniki na żywo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wszystko czego potrzebujesz w jednym miejscu
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              System obsługuje pełny cykl zawodów sportowych - od pierwszych zgłoszeń 
              po finalne protokoły i dyplomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Registration */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sports-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-sports-600" />
                </div>
                <CardTitle>Rejestracja drużyn</CardTitle>
                <CardDescription>
                  Prosty formularz zgłoszeniowy z walidacją danych zawodników
                  i automatyczną weryfikacją dokumentów zgodnie z regulaminem.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Judge Panel */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sports-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-sports-600" />
                </div>
                <CardTitle>Panel sędziego</CardTitle>
                <CardDescription>
                  Szybkie wprowadzanie wyników na tablecie z obsługą QR kodów
                  i trybem offline dla stabilnej pracy w terenie.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Live Results */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sports-100 rounded-lg flex items-center justify-center mb-4">
                  <Timer className="h-6 w-6 text-sports-600" />
                </div>
                <CardTitle>Wyniki na żywo</CardTitle>
                <CardDescription>
                  Automatyczne obliczanie klasyfikacji indywidualnych i drużynowych
                  z publikacją wyników w czasie rzeczywistym.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Office Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sports-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-sports-600" />
                </div>
                <CardTitle>Biuro zawodów</CardTitle>
                <CardDescription>
                  Centralne miejsce do zarządzania zgłoszeniami, generowania
                  list startowych i publikacji oficjalnych wyników.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Document Generation */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sports-100 rounded-lg flex items-center justify-center mb-4">
                  <Medal className="h-6 w-6 text-sports-600" />
                </div>
                <CardTitle>Dokumenty i dyplomy</CardTitle>
                <CardDescription>
                  Automatyczne generowanie protokołów zawodów, dyplomów,
                  list startowych i raportów frekwencji.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Multi-Event Support */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-sports-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-sports-600" />
                </div>
                <CardTitle>Wiele wydarzeń</CardTitle>
                <CardDescription>
                  Obsługa wielu zawodów jednocześnie z możliwością 
                  klonowania ustawień dla przyszłych wydarzeń.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Aktualne wydarzenia
            </h2>
            <p className="text-xl text-gray-600">
              Zobacz co się dzieje w Pomorskim Zrzeszeniu LZS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Live Event */}
            <Card className="border-sports-200 bg-gradient-to-br from-sports-50 to-white">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Zap className="h-3 w-3 mr-1" />
                    Na żywo
                  </div>
                  <span className="text-sm text-gray-500">Dziś</span>
                </div>
                <CardTitle>Mistrzostwa LZS w Strzelectwie</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Kłanino, woj. pomorskie
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Drużyny:</span>
                    <span className="font-medium">24/30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Zawodnicy:</span>
                    <span className="font-medium">144</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Konkurencje:</span>
                    <span className="font-medium">2/4 ukończone</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-sports-500 hover:bg-sports-600">
                  <Link to="/events/1/results">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Zobacz wyniki
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Event */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Zapisy otwarte
                  </div>
                  <span className="text-sm text-gray-500">20 wrz</span>
                </div>
                <CardTitle>Biegi Przełajowe LZS</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Starżyno, woj. pomorskie
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Zapisy do:</span>
                    <span className="font-medium">15 wrz</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Drużyny:</span>
                    <span className="font-medium">12/25</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/events/2/register">
                    <Users className="h-4 w-4 mr-2" />
                    Zgłoś drużynę
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Draft Event */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    Projekt
                  </div>
                  <span className="text-sm text-gray-500">5 paź</span>
                </div>
                <CardTitle>Zawody Wieloboju LZS</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Gdańsk, woj. pomorskie
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="font-medium">W przygotowaniu</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Konkurencje:</span>
                    <span className="font-medium">4 planowane</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/events/3">
                    <Calendar className="h-4 w-4 mr-2" />
                    Szczegóły
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sports-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gotowy na rozpoczęcie?
          </h2>
          <p className="text-xl text-sports-100 mb-8 max-w-2xl mx-auto">
            Stwórz swoje pierwsze wydarzenie sportowe i zobacz jak system 
            może uprościć organizację zawodów.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Link to="/events">
                <Trophy className="h-5 w-5 mr-2" />
                Panel organizatora
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-sports-500">
              <Link to="/events/1/results">
                Zobacz demo wyników
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-sports-500 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">ScoutBase Hub</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Nowoczesny system zarządzania zawodami sportowymi 
                dla Pomorskiego Zrzeszenia LZS. Wszystko w jednym miejscu.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 ScoutBase Hub. Wszystkie prawa zastrzeżone.
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">System</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/events" className="block hover:text-white transition-colors">
                  Panel organizatora
                </Link>
                <Link to="/events/1/results" className="block hover:text-white transition-colors">
                  Wyniki na żywo
                </Link>
                <div className="block">Dokumentacja</div>
                <div className="block">Pomoc techniczna</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Organizator</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Pomorskie Zrzeszenie LZS</div>
                <div>ul. Sportowa 1</div>
                <div>80-001 Gdańsk</div>
                <div>tel. +48 58 123 456</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;