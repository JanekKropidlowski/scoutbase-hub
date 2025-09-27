import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import type { Athlete, AthleteCategory, Gender } from "@/types/competition";

interface AthleteFormData extends Omit<Athlete, 'id' | 'teamId' | 'results'> {
  tempId: string;
}

// Mock event data
const mockEvent = {
  id: "1",
  name: "Mistrzostwa Pomorskiego LZS w Strzelectwie",
  location: "Kłanino, woj. pomorskie",
  registrationDeadline: "2024-08-01",
  competitions: [
    { id: "1", name: "Strzelectwo broń krótka", type: "shooting" },
    { id: "2", name: "Strzelectwo broń długa", type: "shooting" },
    { id: "3", name: "Rzut granatem", type: "grenade_throw" },
    { id: "4", name: "Bieg przełajowy", type: "cross_country" }
  ],
  rules: {
    maxAthletes: 6,
    requiredGenders: { male: 3, female: 3 },
    allowedCategories: ['junior', 'senior'],
    requiredDocuments: ['rodo_consent', 'health_declaration']
  }
};

const TeamRegistration = () => {
  const { eventId } = useParams();
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [organization, setOrganization] = useState("");
  const [region, setRegion] = useState("");
  const [coachFirstName, setCoachFirstName] = useState("");
  const [coachLastName, setCoachLastName] = useState("");
  const [coachEmail, setCoachEmail] = useState("");
  const [coachPhone, setCoachPhone] = useState("");
  
  const [athletes, setAthletes] = useState<AthleteFormData[]>([]);
  const [documents, setDocuments] = useState<Array<{ type: string; file?: File; uploaded: boolean }>>([
    { type: 'rodo_consent', uploaded: false },
    { type: 'health_declaration', uploaded: false }
  ]);

  const addAthlete = () => {
    if (athletes.length < mockEvent.rules.maxAthletes) {
      setAthletes([...athletes, {
        tempId: Math.random().toString(),
        firstName: "",
        lastName: "",
        birthYear: new Date().getFullYear() - 16,
        category: "junior" as AthleteCategory,
        gender: "male" as Gender,
        competitionIds: []
      }]);
    }
  };

  const removeAthlete = (tempId: string) => {
    setAthletes(athletes.filter(a => a.tempId !== tempId));
  };

  const updateAthlete = (tempId: string, field: keyof AthleteFormData, value: any) => {
    setAthletes(athletes.map(athlete => 
      athlete.tempId === tempId 
        ? { ...athlete, [field]: value }
        : athlete
    ));
  };

  const toggleCompetition = (athleteTempId: string, competitionId: string) => {
    setAthletes(athletes.map(athlete => {
      if (athlete.tempId === athleteTempId) {
        const competitionIds = athlete.competitionIds.includes(competitionId)
          ? athlete.competitionIds.filter(id => id !== competitionId)
          : [...athlete.competitionIds, competitionId];
        return { ...athlete, competitionIds };
      }
      return athlete;
    }));
  };

  const handleDocumentUpload = (type: string, file: File) => {
    setDocuments(docs => docs.map(doc => 
      doc.type === type 
        ? { ...doc, file, uploaded: true }
        : doc
    ));
  };

  const getGenderCounts = () => {
    const male = athletes.filter(a => a.gender === 'male').length;
    const female = athletes.filter(a => a.gender === 'female').length;
    return { male, female };
  };

  const isFormValid = () => {
    const genderCounts = getGenderCounts();
    const hasRequiredDocuments = documents.every(doc => doc.uploaded);
    const hasRequiredAthletes = athletes.length >= 3;
    const allAthletesComplete = athletes.every(athlete => 
      athlete.firstName && athlete.lastName && athlete.competitionIds.length > 0
    );
    
    return teamName && organization && coachEmail && hasRequiredDocuments && 
           hasRequiredAthletes && allAthletesComplete &&
           genderCounts.male <= mockEvent.rules.requiredGenders.male &&
           genderCounts.female <= mockEvent.rules.requiredGenders.female;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    // Here would be the actual submission to PocketBase
    console.log("Submitting team registration:", {
      teamName,
      organization,
      region,
      coach: {
        firstName: coachFirstName,
        lastName: coachLastName,
        email: coachEmail,
        phone: coachPhone
      },
      athletes,
      documents
    });
    
    // Redirect or show success message
    alert("Zgłoszenie zostało pomyślnie wysłane!");
  };

  const genderCounts = getGenderCounts();
  const progressPercentage = Math.min((athletes.length / mockEvent.rules.maxAthletes) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
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
                  Zgłoszenie drużyny
                </h1>
                <p className="text-gray-600">
                  {mockEvent.name}
                </p>
              </div>
            </div>
            
            <Badge variant="outline" className="text-sm">
              Termin zgłoszeń: {new Date(mockEvent.registrationDeadline).toLocaleDateString('pl-PL')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Postęp zgłoszenia</span>
              <span>{athletes.length}/{mockEvent.rules.maxAthletes} zawodników</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Team Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dane drużyny</CardTitle>
              <CardDescription>
                Podstawowe informacje o drużynie i opiekunie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamName">Nazwa drużyny *</Label>
                  <Input 
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="np. Szkoła Podstawowa Nr 5 Gdańsk"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Typ organizacji *</Label>
                  <Select value={organization} onValueChange={setOrganization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz typ organizacji" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">Szkoła</SelectItem>
                      <SelectItem value="club">Klub sportowy</SelectItem>
                      <SelectItem value="association">Stowarzyszenie</SelectItem>
                      <SelectItem value="voivodeship">Województwo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="region">Region/Województwo</Label>
                <Input 
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="np. pomorskie"
                />
              </div>

              <Separator />

              <h3 className="text-lg font-semibold">Opiekun drużyny</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coachFirstName">Imię *</Label>
                  <Input 
                    id="coachFirstName"
                    value={coachFirstName}
                    onChange={(e) => setCoachFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coachLastName">Nazwisko *</Label>
                  <Input 
                    id="coachLastName"
                    value={coachLastName}
                    onChange={(e) => setCoachLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coachEmail">Email *</Label>
                  <Input 
                    id="coachEmail"
                    type="email"
                    value={coachEmail}
                    onChange={(e) => setCoachEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coachPhone">Telefon</Label>
                  <Input 
                    id="coachPhone"
                    value={coachPhone}
                    onChange={(e) => setCoachPhone(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gender Balance Info */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Skład drużyny</h3>
                  <p className="text-sm text-gray-600">
                    Wymagane: maks. {mockEvent.rules.requiredGenders.male} chłopców i {mockEvent.rules.requiredGenders.female} dziewczęta
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{genderCounts.male}</div>
                    <div className="text-xs text-gray-600">Chłopcy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">{genderCounts.female}</div>
                    <div className="text-xs text-gray-600">Dziewczęta</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Athletes */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Zawodnicy</CardTitle>
                  <CardDescription>
                    Dodaj zawodników i wybierz konkurencje dla każdego z nich
                  </CardDescription>
                </div>
                <Button 
                  onClick={addAthlete}
                  disabled={athletes.length >= mockEvent.rules.maxAthletes}
                  className="bg-sports-500 hover:bg-sports-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj zawodnika
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {athletes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Brak dodanych zawodników</p>
                  <p className="text-sm">Kliknij przycisk powyżej, aby dodać pierwszego zawodnika</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {athletes.map((athlete, index) => (
                    <div key={athlete.tempId} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold">Zawodnik {index + 1}</h4>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeAthlete(athlete.tempId)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <Label>Imię *</Label>
                          <Input 
                            value={athlete.firstName}
                            onChange={(e) => updateAthlete(athlete.tempId, 'firstName', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Nazwisko *</Label>
                          <Input 
                            value={athlete.lastName}
                            onChange={(e) => updateAthlete(athlete.tempId, 'lastName', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Rok urodzenia *</Label>
                          <Input 
                            type="number"
                            min="1990"
                            max={new Date().getFullYear()}
                            value={athlete.birthYear}
                            onChange={(e) => updateAthlete(athlete.tempId, 'birthYear', parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Płeć *</Label>
                          <Select 
                            value={athlete.gender} 
                            onValueChange={(value) => updateAthlete(athlete.tempId, 'gender', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Mężczyzna</SelectItem>
                              <SelectItem value="female">Kobieta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">Konkurencje *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {mockEvent.competitions.map((competition) => (
                            <label key={competition.id} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={athlete.competitionIds.includes(competition.id)}
                                onChange={() => toggleCompetition(athlete.tempId, competition.id)}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm">{competition.name}</span>
                            </label>
                          ))}
                        </div>
                        {athlete.competitionIds.length === 0 && (
                          <p className="text-sm text-red-600 mt-1">Wybierz przynajmniej jedną konkurencję</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dokumenty</CardTitle>
              <CardDescription>
                Załącz wymagane dokumenty zgodnie z regulaminem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.type} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {doc.uploaded ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium">
                          {doc.type === 'rodo_consent' ? 'Zgody RODO' : 'Oświadczenia zdrowotne'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {doc.type === 'rodo_consent' 
                            ? 'Zgody na przetwarzanie danych osobowych'
                            : 'Oświadczenia o stanie zdrowia zawodników'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.uploaded ? (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Załączono
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Załącz plik
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isFormValid() ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-600">Zgłoszenie gotowe do wysłania</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-orange-600">Uzupełnij brakujące informacje</span>
                    </>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Zapisz jako roboczy
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    className="bg-sports-500 hover:bg-sports-600"
                  >
                    Wyślij zgłoszenie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistration;