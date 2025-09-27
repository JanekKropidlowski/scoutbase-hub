import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Calendar, 
  Users, 
  Target, 
  Timer, 
  MapPin, 
  Plus,
  Settings,
  Eye,
  BarChart3,
  FileText,
  Medal
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - would come from PocketBase in real implementation
const mockEvents = [
  {
    id: "1",
    name: "Mistrzostwa Pomorskiego LZS w Strzelectwie",
    location: "Kłanino, woj. pomorskie",
    startDate: "2024-08-15",
    endDate: "2024-08-16",
    status: "in_progress" as const,
    registeredTeams: 24,
    maxTeams: 30,
    competitions: [
      { name: "Strzelectwo broń krótka", status: "completed" },
      { name: "Strzelectwo broń długa", status: "in_progress" },
      { name: "Rzut granatem", status: "pending" },
      { name: "Bieg przełajowy", status: "pending" }
    ]
  },
  {
    id: "2", 
    name: "Biegi Przełajowe LZS Starżyno",
    location: "Starżyno, woj. pomorskie",
    startDate: "2024-09-20",
    endDate: "2024-09-20",
    status: "open" as const,
    registeredTeams: 12,
    maxTeams: 25,
    competitions: [
      { name: "Bieg 1000m dziewczęta", status: "pending" },
      { name: "Bieg 1000m chłopcy", status: "pending" },
      { name: "Bieg sztafetowy", status: "pending" }
    ]
  },
  {
    id: "3",
    name: "Zawody Wieloboju LZS Gdańsk",
    location: "Gdańsk, woj. pomorskie", 
    startDate: "2024-10-05",
    endDate: "2024-10-06",
    status: "draft" as const,
    registeredTeams: 0,
    maxTeams: 40,
    competitions: [
      { name: "Strzelectwo", status: "pending" },
      { name: "Rzut granatem", status: "pending" },
      { name: "Bieg 100m", status: "pending" },
      { name: "Skok w dal", status: "pending" }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'open': return 'bg-blue-100 text-blue-800';
    case 'in_progress': return 'bg-sports-100 text-sports-800';
    case 'completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'draft': return 'Projekt';
    case 'open': return 'Zapisy otwarte';
    case 'in_progress': return 'W trakcie';
    case 'completed': return 'Zakończone';
    default: return status;
  }
};

const getCompetitionStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <Trophy className="h-4 w-4 text-green-600" />;
    case 'in_progress': return <Timer className="h-4 w-4 text-sports-600" />;
    default: return <Target className="h-4 w-4 text-gray-400" />;
  }
};

const EventsDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                System Zawodów Sportowych
              </h1>
              <p className="mt-2 text-gray-600">
                Pomorskie Zrzeszenie LZS - Zarządzanie wydarzeniami sportowymi
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Ustawienia
              </Button>
              <Button className="bg-sports-500 hover:bg-sports-600" asChild>
                <Link to="/events/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Nowe wydarzenie
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Wydarzenia aktywne
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                +1 w tym miesiącu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Zarejestrowane drużyny
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36</div>
              <p className="text-xs text-muted-foreground">
                W aktywnych wydarzeniach
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Zawodnicy łącznie
              </CardTitle>
              <Medal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <p className="text-xs text-muted-foreground">
                Wszystkie kategorie
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Konkurencje dziś
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 w trakcie
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {event.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </CardDescription>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.startDate).toLocaleDateString('pl-PL')}
                      {event.endDate !== event.startDate && 
                        ` - ${new Date(event.endDate).toLocaleDateString('pl-PL')}`
                      }
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(event.status)}>
                    {getStatusLabel(event.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Team Registration Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Zarejestrowane drużyny</span>
                    <span>{event.registeredTeams}/{event.maxTeams}</span>
                  </div>
                  <Progress 
                    value={(event.registeredTeams / event.maxTeams) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Competitions List */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Konkurencje:</h4>
                  <div className="space-y-1">
                    {event.competitions.map((competition, index) => (
                      <div key={index} className="flex items-center text-sm">
                        {getCompetitionStatusIcon(competition.status)}
                        <span className="ml-2">{competition.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to={`/events/${event.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Podgląd
                    </Link>
                  </Button>
                  
                  {event.status === 'in_progress' && (
                    <Button asChild size="sm" className="flex-1 bg-sports-500 hover:bg-sports-600">
                      <Link to={`/events/${event.id}/manage`}>
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Zarządzaj
                      </Link>
                    </Button>
                  )}
                  
                  {event.status === 'completed' && (
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link to={`/events/${event.id}/results`}>
                        <FileText className="h-4 w-4 mr-1" />
                        Wyniki
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Events State */}
        {mockEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">Brak wydarzeń</CardTitle>
              <CardDescription className="mb-4">
                Rozpocznij od stworzenia pierwszego wydarzenia sportowego
              </CardDescription>
              <Button className="bg-sports-500 hover:bg-sports-600" asChild>
                <Link to="/events/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Stwórz pierwsze wydarzenie
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventsDashboard;