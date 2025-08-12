import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seedCategoryData, createSampleScoutBase } from "@/services/seed-data";
import { useState } from "react";
import { toast } from "sonner";
import { Database, Plus, Settings } from "lucide-react";

const AdminSettings = () => {
  const [seedingCategories, setSeedingCategories] = useState(false);
  const [creatingSample, setCreatingSample] = useState(false);

  const handleSeedCategories = async () => {
    setSeedingCategories(true);
    try {
      await seedCategoryData();
      toast.success("Kategorie zostały pomyślnie dodane do bazy danych");
    } catch (error) {
      toast.error("Błąd podczas dodawania kategorii");
    } finally {
      setSeedingCategories(false);
    }
  };

  const handleCreateSample = async () => {
    setCreatingSample(true);
    try {
      await createSampleScoutBase();
      toast.success("Przykładowa baza została utworzona");
    } catch (error) {
      toast.error("Błąd podczas tworzenia przykładowej bazy");
    } finally {
      setCreatingSample(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ustawienia</h1>
          <p className="text-muted-foreground">Zarządzanie systemem i konfiguracją</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Inicjalizacja bazy danych
              </CardTitle>
              <CardDescription>
                Dodaj podstawowe kategorie i taksonomie do bazy danych
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To działanie utworzy podstawowe kategorie takie jak:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Typy baz (stała, namiotowa, ośrodek, schronisko)</li>
                <li>Regiony (województwa)</li>
                <li>Sezony działania</li>
                <li>Rodzaje zakwaterowania</li>
                <li>Typy dostępności</li>
                <li>Wyposażenie</li>
                <li>Dostępność komunikacyjna</li>
              </ul>
              <Button 
                onClick={handleSeedCategories}
                disabled={seedingCategories}
                className="w-full"
              >
                {seedingCategories ? "Dodawanie..." : "Dodaj kategorie"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Przykładowe dane
              </CardTitle>
              <CardDescription>
                Utwórz przykładową bazę harcerską do testowania
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To działanie utworzy przykładową bazę harcerską z wypełnionymi wszystkimi polami.
                Przydatne do testowania funkcjonalności systemu.
              </p>
              <Button 
                onClick={handleCreateSample}
                disabled={creatingSample}
                className="w-full"
                variant="outline"
              >
                {creatingSample ? "Tworzenie..." : "Utwórz przykładową bazę"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Konfiguracja systemu
            </CardTitle>
            <CardDescription>
              Ustawienia ogólne systemu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Status bazy danych</h4>
                <p className="text-sm text-muted-foreground">
                  System jest połączony z bazą danych Supabase. 
                  Wszystkie operacje są wykonywane w czasie rzeczywistym.
                </p>
              </div>
              
              <div className="p-4 bg-scout-50 rounded-lg">
                <h4 className="font-medium mb-2">Backup i bezpieczeństwo</h4>
                <p className="text-sm text-muted-foreground">
                  Regularne kopie zapasowe są wykonywane automatycznie przez Supabase.
                  Wszystkie dane są szyfrowane i bezpiecznie przechowywane.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;