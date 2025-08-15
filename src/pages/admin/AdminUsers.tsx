
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Edit, Trash2, Shield, ShieldCheck, ShieldX, Loader2, CheckCircle, XCircle, UserCheck } from "lucide-react";
import { useState } from "react";
import { useUsers, useUpdateUserRole, useUpdateUserVerification, useDeleteUser } from "@/hooks/useUsers";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [verifiedFilter, setVerifiedFilter] = useState<boolean | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const { data: users, isLoading } = useUsers({ 
    role: roleFilter,
    search: searchQuery,
    is_verified: verifiedFilter
  });
  
  const updateRole = useUpdateUserRole();
  const updateVerification = useUpdateUserVerification();
  const deleteUser = useDeleteUser();
  
  const roleOptions = [
    { value: undefined, label: "Wszystkie role" },
    { value: "admin", label: "Administrator" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "Użytkownik" }
  ];

  const verificationOptions = [
    { value: undefined, label: "Wszyscy" },
    { value: true, label: "Zweryfikowani" },
    { value: false, label: "Niezweryfikowani" }
  ];
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Administrator
          </Badge>
        );
      case "moderator":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Shield className="mr-1 h-3 w-3" />
            Moderator
          </Badge>
        );
      case "user":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <ShieldX className="mr-1 h-3 w-3" />
            Użytkownik
          </Badge>
        );
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const handleDelete = async () => {
    if (selectedUser) {
      await deleteUser.mutateAsync(selectedUser.id);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    await updateRole.mutateAsync({ id: userId, role: newRole });
  };

  const handleVerificationChange = async (userId: string, isVerified: boolean) => {
    await updateVerification.mutateAsync({ id: userId, is_verified: isVerified });
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Użytkownicy</h1>
            <p className="text-muted-foreground">Zarządzaj użytkownikami systemu</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Szukaj użytkownika..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md"
            value={roleFilter || ''}
            onChange={(e) => setRoleFilter(e.target.value || undefined)}
          >
            {roleOptions.map(option => (
              <option key={option.value || 'all'} value={option.value || ''}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md"
            value={verifiedFilter === undefined ? '' : verifiedFilter.toString()}
            onChange={(e) => setVerifiedFilter(e.target.value === '' ? undefined : e.target.value === 'true')}
          >
            {verificationOptions.map(option => (
              <option key={option.value?.toString() || 'all'} value={option.value?.toString() || ''}>
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
                    <TableHead className="w-[50px]">Avatar</TableHead>
                    <TableHead>Imię i nazwisko</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rola</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data rejestracji</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users && users.length > 0 ? (
                    users.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback className="bg-scout-500 text-white text-xs">
                              {getUserInitials(user.full_name)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.full_name || 'Brak nazwy'}
                        </TableCell>
                        <TableCell>{user.email || 'Brak emaila'}</TableCell>
                        <TableCell>
                          {getRoleBadge(user.role)}
                        </TableCell>
                        <TableCell>
                          {user.is_verified ? (
                            <Badge className="bg-green-100 text-green-800">
                              <UserCheck className="mr-1 h-3 w-3" />
                              Zweryfikowany
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Niezweryfikowany
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.created_at), 'dd MMM yyyy', { locale: pl })}
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
                              
                              <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Zmień rolę
                              </DropdownMenuLabel>
                              {user.role !== 'admin' && (
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'admin')}>
                                  <ShieldCheck className="mr-2 h-4 w-4 text-purple-600" />
                                  Ustaw jako Administrator
                                </DropdownMenuItem>
                              )}
                              {user.role !== 'moderator' && (
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'moderator')}>
                                  <Shield className="mr-2 h-4 w-4 text-blue-600" />
                                  Ustaw jako Moderator
                                </DropdownMenuItem>
                              )}
                              {user.role !== 'user' && (
                                <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'user')}>
                                  <ShieldX className="mr-2 h-4 w-4 text-gray-600" />
                                  Ustaw jako Użytkownik
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuSeparator />
                              
                              {user.is_verified ? (
                                <DropdownMenuItem onClick={() => handleVerificationChange(user.id, false)}>
                                  <XCircle className="mr-2 h-4 w-4 text-yellow-600" />
                                  Cofnij weryfikację
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleVerificationChange(user.id, true)}>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                  Zweryfikuj użytkownika
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Usuń użytkownika
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nie znaleziono żadnych użytkowników
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Pokazuje {users?.length || 0} użytkowników
              </div>
            </div>
          </>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć tego użytkownika?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta akcja jest nieodwracalna. Użytkownik "{selectedUser?.full_name || selectedUser?.email}" zostanie trwale usunięty z systemu wraz ze wszystkimi powiązanymi danymi.
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

export default AdminUsers;
