import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import type { CompetitionType, AthleteCategory, Gender } from "@/types/competition";

interface CompetitionConfig {
  id: string;
  name: string;
  type: CompetitionType;
  description: string;
  maxParticipants?: number;
  categories: AthleteCategory[];
  genders: Gender[];
  scoringType: 'points' | 'time' | 'distance';
  startTime?: string;
}

const CreateEvent = () => {
  const [step, setStep] = useState(1);
  
  // Event Basic Info
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [organizer, setOrganizer] = useState("Pomorskie Zrzeszenie LZS");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [maxTeams, setMaxTeams] = useState<number>(30);

  // Competitions
  const [competitions, setCompetitions] = useState<CompetitionConfig[]>([]);

  // Scoring Rules
  const [teamPointsDistribution, setTeamPointsDistribution] = useState("15,13,11,10,9,8,7,6,5,4,3,2,1");

  const competitionTypeOptions = [
    { value: 'shooting', label: 'Strzelectwo', description: 'Zawody strzeleckie z bronią krótką i długą' },
    { value: 'grenade_throw', label: 'Rzut granatem', description: 'Rzut granatem na tarczę punktową' },
    { value: 'cross_country', label: 'Bieg przełajowy', description: 'Biegi na różnych dystansach' },
  ];

  const addCompetition = () => {
    const newCompetition: CompetitionConfig = {
      id: Math.random().toString(),
      name: "",
      type: "shooting" as CompetitionType,
      description: "",
      maxParticipants: 100,
      categories: ["junior", "senior"],
      genders: ["male", "female"],
      scoringType: "points"
    };
    setCompetitions([...competitions, newCompetition]);
  };

  const removeCompetition = (id: string) => {
    setCompetitions(competitions.filter(c => c.id !== id));
  };

  const updateCompetition = (id: string, field: keyof CompetitionConfig, value: any) => {
    setCompetitions(competitions.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const toggleCategory = (competitionId: string, category: AthleteCategory) => {
    setCompetitions(competitions.map(comp => {
      if (comp.id === competitionId) {
        const categories = comp.categories.includes(category)
          ? comp.categories.filter(c => c !== category)
          : [...comp.categories, category];
        return { ...comp, categories };
      }
      return comp;
    }));
  };

  const toggleGender = (competitionId: string, gender: Gender) => {
    setCompetitions(competitions.map(comp => {
      if (comp.id === competitionId) {
        const genders = comp.genders.includes(gender)
          ? comp.genders.filter(g => g !== gender)
          : [...comp.genders, gender];
        return { ...comp, genders };
      }
      return comp;
    }));
  };

  const handleCreateEvent = async () => {
    const eventData = {
      name: eventName,
      description: eventDescription,
      organizer,
      location,
      startDate,
      endDate,
      registrationDeadline,
      maxTeams,
      status: 'draft' as const,
      competitions: competitions.map(comp => ({
        ...comp,
        eventId: '', // Will be set by backend
        status: 'pending' as const,
        scoringRules: {
          ...(comp.scoringType === 'points' && {
            pointsSystem: {
              maxPoints: comp.type === 'shooting' ? 100 : comp.type === 'grenade_throw' ? 3 : 1,
              zones: comp.type === 'grenade_throw' ? [
                { name: "Celne trafienie", points: 3 },
                { name: "Trafienie bliskie", points: 2 },
                { name: "Trafienie daleke", points: 1 }
              ] : undefined
            }
          }),
          ...(comp.scoringType === 'time' && {
            timeSystem: {
              format: 'mm:ss' as const,
              ascending: true
            }
          })
        }
      })),
      scoringRules: {
        teamPointsDistribution: teamPointsDistribution.split(',').map(Number),
        tieBreakingRules: []
      },
      branding: {
        primaryColor: '#1F9347',
        secondaryColor: '#ffffff'
      }
    };

    // Here would be the actual API call to create the event
    console.log("Creating event:", eventData);
    
    // Simulate success and redirect
    alert("Wydarzenie zostało utworzone pomyślnie!");
    // In real app: navigate to event dashboard
  };

  const nextStep = () => setStep(Math.min(step + 1, 3));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const isStep1Valid = eventName && location && startDate && endDate && registrationDeadline;
  const isStep2Valid = competitions.length > 0 && competitions.every(c => c.name && c.description);
  const isStep3Valid = teamPointsDistribution;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Powrót
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Tworzenie nowego wydarzenia
                </h1>
                <p className="text-gray-600">
                  Krok {step} z 3: {
                    step === 1 ? 'Podstawowe informacje' :
                    step === 2 ? 'Konfiguracja konkurencji' :
                    'Zasady punktacji'
                  }
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepNum 
                      ? 'bg-sports-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {step > stepNum ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`
                      w-8 h-0.5 mx-2
                      ${step > stepNum ? 'bg-sports-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Podstawowe informacje
                  </CardTitle>
                  <CardDescription>
                    Określ nazwę, datę i miejsce wydarzenia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="eventName">Nazwa wydarzenia *</Label>
                      <Input 
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="np. Mistrzostwa Pomorskiego LZS w Strzelectwie"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Opis wydarzenia</Label>
                      <Textarea
                        id="description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Krótki opis zawodów, kategorie uczestników itp."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="organizer">Organizator</Label>
                      <Input 
                        id="organizer"
                        value={organizer}
                        onChange={(e) => setOrganizer(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Miejsce wydarzenia *</Label>
                      <Input 
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="np. Kłanino, woj. pomorskie"
                      />
                    </div>

                    <div>
                      <Label htmlFor="startDate">Data rozpoczęcia *</Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate">Data zakończenia *</Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="registrationDeadline">Termin zgłoszeń *</Label>
                      <Input 
                        id="registrationDeadline"
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) => setRegistrationDeadline(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxTeams">Maksymalna liczba drużyn</Label>
                      <Input 
                        id="maxTeams"
                        type="number"
                        min="1"
                        max="100"
                        value={maxTeams}
                        onChange={(e) => setMaxTeams(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className="bg-sports-500 hover:bg-sports-600"
                >
                  Następny krok
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Competitions */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Konkurencje
                      </CardTitle>
                      <CardDescription>
                        Dodaj konkurencje sportowe dla tego wydarzenia
                      </CardDescription>
                    </div>
                    <Button onClick={addCompetition} className="bg-sports-500 hover:bg-sports-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Dodaj konkurencję
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {competitions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Brak dodanych konkurencji</p>
                      <p className="text-sm">Kliknij przycisk powyżej, aby dodać pierwszą konkurencję</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {competitions.map((competition, index) => (
                        <div key={competition.id} className="border rounded-lg p-6 bg-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold">Konkurencja {index + 1}</h4>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeCompetition(competition.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>Nazwa konkurencji *</Label>
                              <Input 
                                value={competition.name}
                                onChange={(e) => updateCompetition(competition.id, 'name', e.target.value)}
                                placeholder="np. Strzelectwo broń krótka"
                              />
                            </div>

                            <div>
                              <Label>Typ konkurencji *</Label>
                              <Select 
                                value={competition.type} 
                                onValueChange={(value) => updateCompetition(competition.id, 'type', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {competitionTypeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="mb-4">
                            <Label>Opis konkurencji</Label>
                            <Textarea
                              value={competition.description}
                              onChange={(e) => updateCompetition(competition.id, 'description', e.target.value)}
                              placeholder="Szczegółowe zasady i opis konkurencji..."
                              rows={2}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label>Maksymalna liczba uczestników</Label>
                              <Input 
                                type="number"
                                min="1"
                                value={competition.maxParticipants || ''}
                                onChange={(e) => updateCompetition(competition.id, 'maxParticipants', parseInt(e.target.value))}
                              />
                            </div>

                            <div>
                              <Label>Kategorie</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {(['junior', 'senior'] as AthleteCategory[]).map((category) => (
                                  <Badge
                                    key={category}
                                    variant={competition.categories.includes(category) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => toggleCategory(competition.id, category)}
                                  >
                                    {category === 'junior' ? 'Młodzik' : 'Senior'}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <Label>Płeć</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {(['male', 'female'] as Gender[]).map((gender) => (
                                  <Badge
                                    key={gender}
                                    variant={competition.genders.includes(gender) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => toggleGender(competition.id, gender)}
                                  >
                                    {gender === 'male' ? 'Mężczyźni' : 'Kobiety'}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Poprzedni krok
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!isStep2Valid}
                  className="bg-sports-500 hover:bg-sports-600"
                >
                  Następny krok
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Scoring Rules */}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Zasady punktacji
                  </CardTitle>
                  <CardDescription>
                    Skonfiguruj system naliczania punktów drużynowych
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="teamPoints">Rozkład punktów drużynowych</Label>
                    <Input 
                      id="teamPoints"
                      value={teamPointsDistribution}
                      onChange={(e) => setTeamPointsDistribution(e.target.value)}
                      placeholder="15,13,11,10,9,8,7,6,5,4,3,2,1"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Punkty przyznawane za kolejne miejsca, oddzielone przecinkami
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Przykład naliczania punktów:</h4>
                    <div className="text-sm space-y-1">
                      <p>• I miejsce = 15 punktów</p>
                      <p>• II miejsce = 13 punktów</p>
                      <p>• III miejsce = 11 punktów</p>
                      <p>• IV miejsce = 10 punktów</p>
                      <p>• V miejsce i dalsze według rozkładu</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Podsumowanie wydarzenia:</h4>
                    <div className="bg-white border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nazwa:</span>
                        <span className="font-medium">{eventName || 'Nie podano'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Miejsce:</span>
                        <span className="font-medium">{location || 'Nie podano'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data:</span>
                        <span className="font-medium">
                          {startDate && endDate 
                            ? `${startDate} - ${endDate}` 
                            : 'Nie podano'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Konkurencje:</span>
                        <span className="font-medium">{competitions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maksymalne drużyny:</span>
                        <span className="font-medium">{maxTeams}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Poprzedni krok
                </Button>
                <Button 
                  onClick={handleCreateEvent}
                  disabled={!isStep3Valid}
                  className="bg-sports-500 hover:bg-sports-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Utwórz wydarzenie
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;