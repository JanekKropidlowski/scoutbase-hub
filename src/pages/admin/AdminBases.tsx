
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import cmsService from "@/services/cms";
import BaseForm from "@/components/admin/BaseForm";

type Base = Database['public']['Tables']['bases']['Row'];

const AdminBases = () => {
  const [bases, setBases] = useState<Base[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBase, setEditingBase] = useState<Base | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadBases();
  }, []);

  const loadBases = async () => {
    try {
      setLoading(true);
      const result = await cmsService.getBases();
      setBases(result.data);
    } catch (error) {
      console.error('Error loading bases:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się załadować baz harcerskich",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadBases();
      return;
    }

    try {
      setLoading(true);
      const result = await cmsService.getBases({ search: searchTerm });
      setBases(result.data);
    } catch (error) {
      console.error('Error searching bases:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się wyszukać baz",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBase = () => {
    setEditingBase(null);
    setShowForm(true);
  };

  const handleEditBase = (base: Base) => {
    setEditingBase(base);
    setShowForm(true);
  };

  const handleDeleteBase = async (id: string) => {
    try {
      await cmsService.deleteBase(id);
      toast({
        title: "Baza usunięta",
        description: "Baza harcerska została pomyślnie usunięta",
      });
      await loadBases();
      setShowDeleteDialog(null);
    } catch (error) {
      console.error('Error deleting base:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć bazy",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBase(null);
    loadBases();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBase(null);
  };

  const filteredBases = bases.filter(base =>
    base.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    base.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-scout-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Zarządzanie bazami</h1>
            <p className="text-muted-foreground">
              Zarządzaj bazami harcerskimi w systemie
            </p>
          </div>
          <Button onClick={handleCreateBase} className="bg-scout-500 hover:bg-scout-600">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj bazę
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Wyszukiwanie i filtrowanie</CardTitle>
            <CardDescription>
              Znajdź konkretną bazę lub przeglądaj wszystkie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Szukaj po nazwie lub lokalizacji..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Szukaj
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredBases.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">
                  {searchTerm ? "Nie znaleziono baz spełniających kryteria wyszukiwania" : "Brak baz harcerskich w systemie"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredBases.map((base) => (
              <Card key={base.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{base.name}</h3>
                        {base.featured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Polecana
                          </Badge>
                        )}
                        <Badge variant="outline">{base.location}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Ocena:</span> {base.rating}/5
                        </div>
                        <div>
                          <span className="font-medium">Cena:</span> {base.price || "Brak"}
                        </div>
                        <div>
                          <span className="font-medium">Pojemność:</span> {base.capacity || "Brak"}
                        </div>
                        <div>
                          <span className="font-medium">Utworzono:</span> {new Date(base.created_at).toLocaleDateString('pl-PL')}
                        </div>
                      </div>
                      
                      {base.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {base.description}
                        </p>
                      )}
                      
                      {base.amenities && base.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {base.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/base/${base.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBase(base)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteDialog(base.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <BaseForm
              base={editingBase}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Potwierdź usunięcie</DialogTitle>
              <DialogDescription>
                Czy na pewno chcesz usunąć tę bazę harcerską? Tej operacji nie można cofnąć.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(null)}
              >
                Anuluj
              </Button>
              <Button
                variant="destructive"
                onClick={() => showDeleteDialog && handleDeleteBase(showDeleteDialog)}
              >
                Usuń
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBases;
