
import AdminLayout from "@/components/admin/AdminLayout";
import ScoutBaseForm from "@/components/admin/ScoutBaseForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Edit, Trash2, Eye, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ScoutBaseService } from "@/services/scout-base-service";
import { ScoutBaseWithDetails, ScoutBaseFormData } from "@/types/scout-base";
import { toast } from "sonner";


const AdminBases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingBaseId, setEditingBaseId] = useState<string | undefined>();
  const [bases, setBases] = useState<ScoutBaseWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadBases();
  }, []);

  const loadBases = async () => {
    try {
      setLoading(true);
      const data = await ScoutBaseService.getScoutBases();
      setBases(data);
    } catch (error) {
      toast.error("Błąd podczas ładowania baz");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingBaseId(undefined);
    setShowForm(true);
  };

  const handleEdit = (baseId: string) => {
    setEditingBaseId(baseId);
    setShowForm(true);
  };

  const handleDelete = async (baseId: string) => {
    if (confirm("Czy na pewno chcesz usunąć tę bazę?")) {
      try {
        await ScoutBaseService.deleteScoutBase(baseId);
        toast.success("Baza została usunięta");
        loadBases();
      } catch (error) {
        toast.error("Błąd podczas usuwania bazy");
      }
    }
  };

  const handleSave = async (data: ScoutBaseFormData) => {
    try {
      if (editingBaseId) {
        await ScoutBaseService.updateScoutBase(editingBaseId, data);
      } else {
        await ScoutBaseService.createScoutBase(data);
      }
      setShowForm(false);
      loadBases();
    } catch (error) {
      throw error; // Let the form handle the error
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBaseId(undefined);
  };

  const filteredBases = bases.filter(base => {
    const matchesSearch = base.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         base.address_city.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesStatus = statusFilter === "all" || base.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const statusOptions = [
    { value: "all", label: "Wszystkie statusy" },
    { value: "published", label: "Opublikowana" },
    { value: "draft", label: "Szkic" },
    { value: "archived", label: "Zarchiwizowana" }
  ];
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Opublikowana";
      case "draft":
        return "Szkic";
      case "archived":
        return "Zarchiwizowana";
      default:
        return status;
    }
  };

  if (showForm) {
    return (
      <AdminLayout>
        <ScoutBaseForm
          baseId={editingBaseId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bazy harcerskie</h1>
            <p className="text-muted-foreground">Zarządzaj bazami harcerskimi w systemie</p>
          </div>
          <Button className="bg-scout-500 hover:bg-scout-600" onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Dodaj nową bazę
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Szukaj bazy..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Nazwa bazy
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Lokalizacja</TableHead>
                <TableHead className="text-center">Pojemność</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ostatnia aktualizacja</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Ładowanie...
                  </TableCell>
                </TableRow>
              ) : filteredBases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Brak baz do wyświetlenia
                  </TableCell>
                </TableRow>
              ) : (
                filteredBases.map((base) => (
                  <TableRow key={base.id}>
                    <TableCell className="font-medium">#{base.id.slice(-6)}</TableCell>
                    <TableCell>{base.name}</TableCell>
                    <TableCell>{base.address_city}</TableCell>
                    <TableCell className="text-center">{base.capacity_total}</TableCell>
                    <TableCell>{base.contact_email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(base.status)}`}>
                        {getStatusLabel(base.status)}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(base.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEdit(base.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(base.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Pokazuje {filteredBases.length} z {bases.length} baz
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Poprzednia
            </Button>
            <Button variant="outline" size="sm">
              {currentPage}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)}>
              Następna
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBases;
