import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  FileText, 
  Download, 
  Users,
  Trophy,
  ListChecks,
  Settings,
  BarChart3,
  AlertTriangle,
  Eye
} from "lucide-react";
import { useParams } from "react-router-dom";

// Mock event data
const mockEvent = {
  id: "1",
  name: "Mistrzostwa Pomorskiego LZS w Strzelectwie", 
  location: "Kłanino, woj. pomorskie",
  startDate: "2024-08-15",
  registrationDeadline: "2024-08-01",
  status: "in_progress" as const,
  competitions: [
    { id: "1", name: "Strzelectwo broń krótka", status: "completed", judgeAssigned: true },
    { id: "2", name: "Strzelectwo broń długa", status: "in_progress", judgeAssigned: true },
    { id: "3", name: "Rzut granatem", status: "pending", judgeAssigned: false },
    { id: "4", name: "Bieg przełajowy", status: "pending", judgeAssigned: true }
  ]
};

// Mock teams data
const mockTeams = [
  {
    id: "1",
    name: "SP nr 5 Gdańsk",
    organization: "school",
    region: "pomorskie",
    athletesCount: 6,
    registrationStatus: "accepted" as const,
    documentsVerified: true,
    registeredAt: "2024-07-15",
    startNumber: 1,
    coach: { firstName: "Anna", lastName: "Kowalska", email: "anna.kowalska@sp5.gda.pl", phone: "+48 123 456 789" }
  },
  {
    id: "2", 
    name: "LO nr 3 Gdynia",
    organization: "school",
    region: "pomorskie",
    athletesCount: 5,
    registrationStatus: "submitted" as const,
    documentsVerified: false,
    registeredAt: "2024-07-20",
    startNumber: null,
    coach: { firstName: "Piotr", lastName: "Nowak", email: "p.nowak@lo3.gdynia.pl", phone: "+48 987 654 321" }
  },
  {
    id: "3",
    name: "Klub Sportowy Słupsk",
    organization: "club", 
    region: "pomorskie",
    athletesCount: 4,
    registrationStatus: "rejected" as const,
    documentsVerified: false,
    registeredAt: "2024-07-18",
    startNumber: null,
    coach: { firstName: "Maria", lastName: "Wiśniewska", email: "maria@kss.pl", phone: "+48 555 444 333" }
  },
  {
    id: "4",
    name: "SP nr 12 Sopot",
    organization: "school",
    region: "pomorskie", 
    athletesCount: 6,
    registrationStatus: "accepted" as const,
    documentsVerified: true,
    registeredAt: "2024-07-10",
    startNumber: 2,
    coach: { firstName: "Jan", lastName: "Krawczyk", email: "jan.krawczyk@sp12.sopot.pl", phone: "+48 111 222 333" }
  }
];

const CompetitionOffice = () => {
  const { eventId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("teams");

  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamStatusChange = (teamId: string, status: 'accepted' | 'rejected') => {
    // Here would be the actual API call
    console.log(`Changing team ${teamId} status to ${status}`);
  };

  const handleGenerateStartLists = () => {
    console.log("Generating start lists for all competitions");
    alert("Listy startowe zostały wygenerowane dla wszystkich konkurencji");
  };

  const handlePublishResults = () => {
    console.log("Publishing partial results");
    alert("Wyniki cząstkowe zostały opublikowane");
  };

  const handleGenerateReports = () => {
    console.log("Generating competition reports");
    alert("Generowanie raportów rozpoczęte");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted': return 'Zaakceptowane';
      case 'submitted': return 'Oczekuje';
      case 'rejected': return 'Odrzucone';
      case 'draft': return 'Roboczy';
      default: return status;
    }
  };

  const getCompetitionStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const acceptedTeams = mockTeams.filter(t => t.registrationStatus === 'accepted');
  const pendingTeams = mockTeams.filter(t => t.registrationStatus === 'submitted');
  const totalAthletes = mockTeams.reduce((sum, team) => sum + team.athletesCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Biuro Zawodów
              </h1>
              <p className="text-gray-600">
                {mockEvent.name} - {mockEvent.location}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Ustawienia
              </Button>
              <Button onClick={handleGenerateReports} className="bg-sports-500 hover:bg-sports-600">
                <FileText className="h-4 w-4 mr-2" />
                Generuj raporty
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Zaakceptowane drużyny
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{acceptedTeams.length}</div>
              <p className="text-xs text-muted-foreground">
                z {mockTeams.length} zgłoszonych
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Oczekujące zgłoszenia
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{pendingTeams.length}</div>
              <p className="text-xs text-muted-foreground">
                Wymagają weryfikacji
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Zawodnicy łącznie
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAthletes}</div>
              <p className="text-xs text-muted-foreground">
                W zaakceptowanych drużynach
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Konkurencje
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEvent.competitions.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockEvent.competitions.filter(c => c.status === 'completed').length} ukończone
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="teams">Drużyny</TabsTrigger>
            <TabsTrigger value="competitions">Konkurencje</TabsTrigger>
            <TabsTrigger value="results">Wyniki</TabsTrigger>
            <TabsTrigger value="documents">Dokumenty</TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Zarządzanie drużynami</CardTitle>
                    <CardDescription>
                      Weryfikacja zgłoszeń i przyznawanie numerów startowych
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Szukaj drużyn..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTeams.map((team) => (
                    <div 
                      key={team.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="font-semibold text-lg">
                            {team.startNumber ? `#${team.startNumber}` : '-'}
                          </div>
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-sm text-gray-600">
                              {team.coach.firstName} {team.coach.lastName} • {team.athletesCount} zawodników
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Documents Status */}
                        <div className="flex items-center space-x-1">
                          {team.documentsVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs text-gray-600">
                            {team.documentsVerified ? 'Dokumenty OK' : 'Brak dokumentów'}
                          </span>
                        </div>

                        {/* Registration Status */}
                        <Badge className={getStatusColor(team.registrationStatus)}>
                          {getStatusLabel(team.registrationStatus)}
                        </Badge>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Podgląd
                          </Button>
                          
                          {team.registrationStatus === 'submitted' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleTeamStatusChange(team.id, 'accepted')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Akceptuj
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleTeamStatusChange(team.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Odrzuć
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredTeams.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Brak drużyn spełniających kryteria wyszukiwania</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Konkurencje</CardTitle>
                    <CardDescription>
                      Status konkurencji i zarządzanie listami startowymi
                    </CardDescription>
                  </div>
                  <Button onClick={handleGenerateStartLists} className="bg-sports-500 hover:bg-sports-600">
                    <ListChecks className="h-4 w-4 mr-2" />
                    Generuj listy startowe
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvent.competitions.map((competition) => (
                    <div 
                      key={competition.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        {getCompetitionStatusIcon(competition.status)}
                        <div>
                          <div className="font-medium">{competition.name}</div>
                          <div className="text-sm text-gray-600">
                            Status: {competition.status === 'completed' ? 'Ukończone' : 
                                    competition.status === 'in_progress' ? 'W trakcie' : 'Oczekuje'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Judge Assignment Status */}
                        <div className="flex items-center space-x-1">
                          {competition.judgeAssigned ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                          <span className="text-xs text-gray-600">
                            {competition.judgeAssigned ? 'Sędzia przydzielony' : 'Brak sędziego'}
                          </span>
                        </div>

                        <Button variant="outline" size="sm">
                          Lista startowa
                        </Button>
                        
                        {competition.status !== 'pending' && (
                          <Button variant="outline" size="sm">
                            Panel sędziego
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Publikacja wyników</CardTitle>
                    <CardDescription>
                      Zarządzanie publikacją wyników cząstkowych i końcowych
                    </CardDescription>
                  </div>
                  <Button onClick={handlePublishResults} className="bg-sports-500 hover:bg-sports-600">
                    Opublikuj wyniki
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockEvent.competitions.map((competition) => (
                    <Card key={competition.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{competition.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Status:</span>
                            <span className="font-medium">
                              {competition.status === 'completed' ? 'Ukończone' :
                               competition.status === 'in_progress' ? 'W trakcie' : 'Oczekuje'}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              Podgląd wyników
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Eksport PDF
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generowanie dokumentów</CardTitle>
                <CardDescription>
                  Tworzenie protokołów, dyplomów i innych dokumentów zawodów
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Protokoły zawodów</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generuj protokół
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Dyplomy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generuj dyplomy
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Listy startowe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Pobierz listy
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Raporty</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Raport frekwencji
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Klasyfikacje</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Klasyfikacja finalna
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompetitionOffice;