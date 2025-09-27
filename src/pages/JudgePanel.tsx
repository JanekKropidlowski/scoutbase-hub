import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Clock, 
  Save, 
  Wifi, 
  WifiOff, 
  QrCode,
  AlertCircle,
  CheckCircle,
  Timer,
  Zap,
  Users
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock competition data
const mockCompetition = {
  id: "2",
  name: "Strzelectwo broń długa",
  type: "shooting" as const,
  eventName: "Mistrzostwa Pomorskiego LZS w Strzelectwie",
  maxPoints: 100,
  zones: [
    { name: "Dziesiątka", points: 10 },
    { name: "Dziewiątka", points: 9 },
    { name: "Ósemka", points: 8 },
    { name: "Siódemka", points: 7 },
    { name: "Szóstka", points: 6 },
    { name: "Piątka", points: 5 },
    { name: "Pudło", points: 0 }
  ]
};

// Mock start list
const mockStartList = [
  {
    startNumber: 1,
    athleteId: "1",
    athlete: { firstName: "Anna", lastName: "Kowalska", birthYear: 2008, gender: "female" as const },
    team: { name: "SP nr 5 Gdańsk", organization: "school" },
    present: true,
    currentResult: null
  },
  {
    startNumber: 2,
    athleteId: "2", 
    athlete: { firstName: "Piotr", lastName: "Nowak", birthYear: 2009, gender: "male" as const },
    team: { name: "SP nr 12 Sopot", organization: "school" },
    present: true,
    currentResult: { value: 85, status: 'active' }
  },
  {
    startNumber: 3,
    athleteId: "3",
    athlete: { firstName: "Maria", lastName: "Wiśniewska", birthYear: 2008, gender: "female" as const },
    team: { name: "LO nr 3 Gdynia", organization: "school" },
    present: false,
    currentResult: null
  },
  {
    startNumber: 4,
    athleteId: "4",
    athlete: { firstName: "Jan", lastName: "Krawczyk", birthYear: 2009, gender: "male" as const },
    team: { name: "SP nr 8 Słupsk", organization: "school" },
    present: true,
    currentResult: null
  }
];

const JudgePanel = () => {
  const { competitionId } = useParams();
  const [isOnline, setIsOnline] = useState(true);
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
  const [resultValue, setResultValue] = useState<string>("");
  const [resultStatus, setResultStatus] = useState<'active' | 'dns' | 'dq' | 'dnf'>('active');
  const [notes, setNotes] = useState("");
  const [startList, setStartList] = useState(mockStartList);
  const [isSaving, setIsSaving] = useState(false);
  const [unsyncedResults, setUnsyncedResults] = useState<string[]>([]);

  // Simulate online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync offline results when coming back online
  useEffect(() => {
    if (isOnline && unsyncedResults.length > 0) {
      // Simulate syncing offline results
      console.log("Syncing offline results:", unsyncedResults);
      setUnsyncedResults([]);
    }
  }, [isOnline, unsyncedResults]);

  const handleMarkPresent = (athleteId: string, present: boolean) => {
    setStartList(prev => prev.map(entry => 
      entry.athleteId === athleteId 
        ? { ...entry, present }
        : entry
    ));
  };

  const handleSaveResult = async () => {
    if (!selectedAthlete || !resultValue) return;

    setIsSaving(true);

    const resultData = {
      athleteId: selectedAthlete,
      competitionId: competitionId,
      value: parseFloat(resultValue),
      status: resultStatus,
      notes,
      recordedAt: new Date().toISOString()
    };

    try {
      if (isOnline) {
        // Save to PocketBase
        console.log("Saving result online:", resultData);
        // await ResultService.recordResult(resultData);
      } else {
        // Save offline
        console.log("Saving result offline:", resultData);
        // offlineHelpers.saveOfflineResult(resultData);
        setUnsyncedResults(prev => [...prev, selectedAthlete]);
      }

      // Update local state
      setStartList(prev => prev.map(entry => 
        entry.athleteId === selectedAthlete
          ? { ...entry, currentResult: { value: parseFloat(resultValue), status: resultStatus } }
          : entry
      ));

      // Clear form
      setSelectedAthlete(null);
      setResultValue("");
      setResultStatus('active');
      setNotes("");

    } catch (error) {
      console.error("Failed to save result:", error);
      alert("Błąd podczas zapisywania wyniku");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'dns': return 'bg-gray-100 text-gray-800';
      case 'dq': return 'bg-red-100 text-red-800';
      case 'dnf': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktywny';
      case 'dns': return 'Nie wystartował';
      case 'dq': return 'Dyskwalifikacja';
      case 'dnf': return 'Nie ukończył';
      default: return status;
    }
  };

  const selectedAthleteData = startList.find(entry => entry.athleteId === selectedAthlete);
  const completedCount = startList.filter(entry => entry.currentResult !== null).length;
  const presentCount = startList.filter(entry => entry.present).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Panel Sędziego
              </h1>
              <p className="text-gray-600">
                {mockCompetition.eventName} - {mockCompetition.name}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <>
                    <Wifi className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-600">Offline</span>
                  </>
                )}
              </div>

              {/* Progress */}
              <div className="text-right">
                <div className="text-sm font-medium">{completedCount}/{presentCount}</div>
                <div className="text-xs text-gray-500">Wyników</div>
              </div>

              {/* QR Code for mobile access */}
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                QR Kod
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Alert */}
      {!isOnline && (
        <div className="container mx-auto px-4 py-2">
          <Alert className="bg-orange-50 border-orange-200">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-700">
              Pracujesz w trybie offline. Wyniki będą synchronizowane po przywróceniu połączenia.
              {unsyncedResults.length > 0 && (
                <span className="ml-2 font-medium">
                  ({unsyncedResults.length} niesynchronizowanych wyników)
                </span>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Start List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Lista startowa
                  </CardTitle>
                  <Badge variant="outline">
                    {presentCount} obecnych z {startList.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {startList.map((entry) => (
                    <div 
                      key={entry.athleteId}
                      className={`
                        flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors
                        ${selectedAthlete === entry.athleteId 
                          ? 'border-sports-500 bg-sports-50' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                      onClick={() => setSelectedAthlete(entry.athleteId)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-gray-500 w-8 text-center">
                          {entry.startNumber}
                        </div>
                        
                        <div>
                          <div className="font-medium">
                            {entry.athlete.firstName} {entry.athlete.lastName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.team.name} • {entry.athlete.birthYear}r.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Result Status */}
                        {entry.currentResult ? (
                          <Badge className={getStatusColor(entry.currentResult.status)}>
                            {entry.currentResult.status === 'active' 
                              ? `${entry.currentResult.value} pkt`
                              : getStatusLabel(entry.currentResult.status)
                            }
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            Brak wyniku
                          </Badge>
                        )}

                        {/* Present Status */}
                        <Button
                          variant={entry.present ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkPresent(entry.athleteId, !entry.present);
                          }}
                          className={entry.present 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "text-gray-500"
                          }
                        >
                          {entry.present ? "Obecny" : "Nieobecny"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Result Entry Panel */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Wprowadź wynik
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAthleteData ? (
                  <div className="space-y-4">
                    {/* Selected Athlete Info */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">
                        #{selectedAthleteData.startNumber} {selectedAthleteData.athlete.firstName} {selectedAthleteData.athlete.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedAthleteData.team.name}
                      </div>
                    </div>

                    <Tabs defaultValue="points" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="points">Punkty</TabsTrigger>
                        <TabsTrigger value="zones">Strefy</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="points" className="space-y-4">
                        <div>
                          <Label htmlFor="result">Wynik (punkty)</Label>
                          <Input
                            id="result"
                            type="number"
                            min="0"
                            max={mockCompetition.maxPoints}
                            value={resultValue}
                            onChange={(e) => setResultValue(e.target.value)}
                            placeholder="0-100"
                            className="text-lg text-center"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="zones" className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          {mockCompetition.zones.map((zone) => (
                            <Button
                              key={zone.name}
                              variant={resultValue === zone.points.toString() ? "default" : "outline"}
                              onClick={() => setResultValue(zone.points.toString())}
                              className="h-12"
                            >
                              <div>
                                <div className="text-sm">{zone.name}</div>
                                <div className="font-bold">{zone.points} pkt</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={resultStatus} onValueChange={(value: any) => setResultStatus(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Aktywny wynik</SelectItem>
                          <SelectItem value="dns">DNS - Nie wystartował</SelectItem>
                          <SelectItem value="dq">DQ - Dyskwalifikacja</SelectItem>
                          <SelectItem value="dnf">DNF - Nie ukończył</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notes">Uwagi (opcjonalne)</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Dodatkowe informacje..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleSaveResult}
                      disabled={!resultValue || isSaving || (resultStatus === 'active' && !parseFloat(resultValue))}
                      className="w-full bg-sports-500 hover:bg-sports-600"
                    >
                      {isSaving ? (
                        <>
                          <Timer className="h-4 w-4 mr-2 animate-spin" />
                          Zapisywanie...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Zapisz wynik
                        </>
                      )}
                    </Button>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setResultStatus('dns');
                          setResultValue('0');
                        }}
                        className="text-xs"
                      >
                        Oznacz jako DNS
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setResultStatus('dq');
                          setResultValue('0');
                        }}
                        className="text-xs"
                      >
                        Dyskwalifikacja
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Wybierz zawodnika z listy startowej</p>
                    <p className="text-sm mt-1">aby wprowadzić wynik</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Competition Info */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Informacje o konkurencji</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Typ:</span>
                  <span>Strzelectwo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maksymalnie:</span>
                  <span>{mockCompetition.maxPoints} punktów</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zawodników:</span>
                  <span>{startList.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ukończono:</span>
                  <span>{completedCount}/{presentCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgePanel;