
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Edit, Trash2, Eye, ArrowUpDown, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useBases, useDeleteBase, useUpdateBaseStatus } from "@/hooks/useBases";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const AdminBases = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBase, setSelectedBase] = useState<any>(null);
  
  const { data: bases, isLoading } = useBases({ 
    status: statusFilter,
    search: searchQuery 
  });
  
  const deleteBase = useDeleteBase();
  const updateStatus = useUpdateBaseStatus();
  
  const statusOptions = [
    { value: undefined, label: "Wszystkie statusy" },
    { value: "draft", label: "Szkic" },
    { value: "pending", label: "Oczekująca" },
    { value: "approved", label: "Zatwierdzona" },
    { value: "rejected", label: "Odrzucona" }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Zatwierdzona</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Oczekująca</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Odrzucona</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Szkic</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDelete = async () => {
    if (selectedBase) {
      await deleteBase.mutateAsync(selectedBase.id);
      setDeleteDialogOpen(false);
      setSelectedBase(null);
    }
  };

  const handleStatusChange = async (baseId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    await updateStatus.mutateAsync({ id: baseId, status: newStatus });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bazy harcerskie</h1>
            <p className="text-muted-foreground">Zarządzaj bazami harcerskimi w systemie</p>
          </div>
          <Button 
            className="bg-scout-500 hover:bg-scout-600"
            onClick={() => navigate('/admin/bases/new')}
          >
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
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || undefined)}
          >
            {statusOptions.map(option => (
              <option key={option.value || 'all'} value={option.value || ''}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-scout-500" />
          </div>
        ) : (
          <>
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
                    <TableHead>Właściciel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ostatnia aktualizacja</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bases && bases.length > 0 ? (
                    bases.map((base: any) => (
                      <TableRow key={base.id}>
                        <TableCell className="font-medium">#{base.id.slice(0, 8)}</TableCell>
                        <TableCell className="font-medium">{base.name}</TableCell>
                        <TableCell>{base.city}, {base.voivodeship}</TableCell>
                        <TableCell className="text-center">{base.capacity || '-'}</TableCell>
                        <TableCell>
                          {base.owner?.full_name || 'Nieznany'}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(base.status)}
                        </TableCell>
                        <TableCell>
                          {format(new Date(base.updated_at), 'dd MMM yyyy', { locale: pl })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Akcje
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => navigate(`/base/${base.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Podgląd
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/admin/bases/${base.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edytuj
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {base.status !== 'approved' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(base.id, 'approved')}>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                  Zatwierdź
                                </DropdownMenuItem>
                              )}
                              {base.status !== 'pending' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(base.id, 'pending')}>
                                  <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                                  Ustaw jako oczekującą
                                </DropdownMenuItem>
                              )}
                              {base.status !== 'rejected' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(base.id, 'rejected')}>
                                  <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                  Odrzuć
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedBase(base);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Usuń
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Nie znaleziono żadnych baz
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Pokazuje {bases?.length || 0} baz
              </div>
            </div>
          </>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć tę bazę?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta akcja jest nieodwracalna. Baza "{selectedBase?.name}" zostanie trwale usunięta z systemu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminBases;
