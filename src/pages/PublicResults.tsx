import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Search, 
  Filter, 
  Share2, 
  Download,
  Calendar,
  MapPin,
  Users,
  Target,
  Clock,
  Zap,
  CheckCircle
} from "lucide-react";
import { useParams } from "react-router-dom";

// Mock event data
const mockEvent = {
  id: "1",
  name: "Mistrzostwa Pomorskiego LZS w Strzelectwie",
  description: "Zawody sportowe dla szkół podstawowych i ponadpodstawowych",
  location: "Kłanino, woj. pomorskie", 
  startDate: "2024-08-15",
  endDate: "2024-08-16",
  status: "in_progress" as const,
  organizer: "Pomorskie Zrzeszenie LZS",
  branding: {
    primaryColor: "#1F9347",
    logo: null
  }
};

// Mock results data
const mockIndividualResults = [
  {
    position: 1,
    athlete: { firstName: "Anna", lastName: "Kowalska", birthYear: 2008, gender: "female" as const },
    team: { name: "SP nr 5 Gdańsk", startNumber: 1 },
    totalPoints: 285,
    results: [
      { competitionName: "Strzelectwo broń krótka", value: 95, points: 15 },
      { competitionName: "Strzelectwo broń długa", value: 88, points: 13 },
      { competitionName: "Rzut granatem", value: 3, points: 15 }
    ]
  },
  {
    position: 2,
    athlete: { firstName: "Piotr", lastName: "Nowak", birthYear: 2009, gender: "male" as const },
    team: { name: "SP nr 12 Sopot", startNumber: 2 },
    totalPoints: 270,
    results: [
      { competitionName: "Strzelectwo broń krótka", value: 92, points: 13 },
      { competitionName: "Strzelectwo broń długa", value: 90, points: 15 },
      { competitionName: "Bieg przełajowy", value: "3:45", points: 11 }
    ]
  },
  {
    position: 3,
    athlete: { firstName: "Maria", lastName: "Wiśniewska", birthYear: 2008, gender: "female" as const },
    team: { name: "LO nr 3 Gdynia", startNumber: 3 },
    totalPoints: 255,
    results: [
      { competitionName: "Strzelectwo broń krótka", value: 87, points: 11 },
      { competitionName: "Rzut granatem", value: 2, points: 13 },
      { competitionName: "Bieg przełajowy", value: "3:50", points: 10 }
    ]
  }
];

const mockTeamResults = [
  {
    position: 1,
    team: { name: "SP nr 5 Gdańsk", startNumber: 1, region: "pomorskie" },
    totalPoints: 425,
    athletes: [
      { name: "Anna Kowalska", points: 285 },
      { name: "Jan Kowalski", points: 140 }
    ]
  },
  {
    position: 2,
    team: { name: "SP nr 12 Sopot", startNumber: 2, region: "pomorskie" },
    totalPoints: 380,
    athletes: [
      { name: "Piotr Nowak", points: 270 },
      { name: "Ewa Nowak", points: 110 }
    ]
  },
  {
    position: 3,
    team: { name: "LO nr 3 Gdynia", startNumber: 3, region: "pomorskie" },
    totalPoints: 355,
    athletes: [
      { name: "Maria Wiśniewska", points: 255 },
      { name: "Tomasz Wiśniewski", points: 100 }
    ]
  }
];

const mockCompetitions = [
  { id: "1", name: "Strzelectwo broń krótka", type: "shooting", status: "completed", unit: "punkty" },
  { id: "2", name: "Strzelectwo broń długa", type: "shooting", status: "completed", unit: "punkty" },
  { id: "3", name: "Rzut granatem", type: "grenade_throw", status: "completed", unit: "punkty" },
  { id: "4", name: "Bieg przełajowy", type: "cross_country", status: "in_progress", unit: "czas" }
];

const PublicResults = () => {
  const { eventId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompetition, setFilterCompetition] = useState<string>("all");
  const [filterGender, setFilterGender] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("individual");

  const filteredIndividualResults = mockIndividualResults.filter(result => {
    const matchesSearch = `${result.athlete.firstName} ${result.athlete.lastName}`
      .toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.team.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = filterGender === "all" || result.athlete.gender === filterGender;
    
    return matchesSearch && matchesGender;
  });

  const filteredTeamResults = mockTeamResults.filter(result =>
    result.team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Wyniki - ${mockEvent.name}`,
        text: `Sprawdź wyniki zawodów: ${mockEvent.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link skopiowany do schowka!');
    }
  };

  const getMedalIcon = (position: number) => {
    if (position === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (position === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (position === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="text-gray-500 font-bold">{position}</span>;
  };

  const getPositionBadgeColor = (position: number) => {
    if (position === 1) return "bg-yellow-100 text-yellow-800";
    if (position === 2) return "bg-gray-100 text-gray-800";
    if (position === 3) return "bg-amber-100 text-amber-800";
    return "bg-gray-50 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mockEvent.name}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {mockEvent.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(mockEvent.startDate).toLocaleDateString('pl-PL')} - 
                {new Date(mockEvent.endDate).toLocaleDateString('pl-PL')}
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {mockEvent.description}
            </p>
            
            <div className="flex justify-center items-center space-x-4 mt-6">
              <Badge 
                variant="outline" 
                className="text-sports-600 border-sports-200"
              >
                <Zap className="h-3 w-3 mr-1" />
                Wyniki na żywo
              </Badge>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Udostępnij</span>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Pobierz wyniki</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Status */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCompetitions.map((competition) => (
              <div key={competition.id} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  {competition.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  )}
                  <span className="text-sm font-medium">{competition.name}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={competition.status === 'completed' ? 'text-green-600' : 'text-blue-600'}
                >
                  {competition.status === 'completed' ? 'Ukończone' : 'W trakcie'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Szukaj zawodników lub drużyn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterCompetition} onValueChange={setFilterCompetition}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Konkurencja" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie konkurencje</SelectItem>
                  {mockCompetitions.map((comp) => (
                    <SelectItem key={comp.id} value={comp.id}>
                      {comp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterGender} onValueChange={setFilterGender}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Płeć" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszyscy</SelectItem>
                  <SelectItem value="male">Mężczyźni</SelectItem>
                  <SelectItem value="female">Kobiety</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="individual">Klasyfikacja indywidualna</TabsTrigger>
            <TabsTrigger value="team">Klasyfikacja drużynowa</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Klasyfikacja indywidualna
                </CardTitle>
                <CardDescription>
                  Ranking zawodników według łącznej liczby punktów ze wszystkich konkurencji
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredIndividualResults.map((result) => (
                    <div 
                      key={`${result.athlete.firstName}-${result.athlete.lastName}`}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getMedalIcon(result.position)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-semibold text-lg">
                            {result.athlete.firstName} {result.athlete.lastName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {result.team.name} • {result.athlete.birthYear}r. • {result.athlete.gender === 'male' ? 'M' : 'K'}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-sports-600">
                          {result.totalPoints} pkt
                        </div>
                        <Badge className={getPositionBadgeColor(result.position)}>
                          {result.position}. miejsce
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredIndividualResults.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Brak wyników spełniających kryteria wyszukiwania</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Klasyfikacja drużynowa
                </CardTitle>
                <CardDescription>
                  Ranking drużyn według sumy punktów wszystkich zawodników
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTeamResults.map((result) => (
                    <div 
                      key={result.team.name}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getMedalIcon(result.position)}
                          </div>
                          
                          <div>
                            <div className="font-semibold text-lg">
                              {result.team.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.team.region} • #{result.team.startNumber}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-sports-600">
                            {result.totalPoints} pkt
                          </div>
                          <Badge className={getPositionBadgeColor(result.position)}>
                            {result.position}. miejsce
                          </Badge>
                        </div>
                      </div>

                      {/* Team Athletes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                        {result.athletes.map((athlete, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{athlete.name}</span>
                            <span className="font-medium">{athlete.points} pkt</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredTeamResults.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Brak wyników spełniających kryteria wyszukiwania</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Organizator: {mockEvent.organizer}
            </p>
            <p className="text-sm">
              Wyniki aktualizowane w czasie rzeczywistym • Ostatnia aktualizacja: {new Date().toLocaleString('pl-PL')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicResults;