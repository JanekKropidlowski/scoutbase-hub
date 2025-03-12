
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Edit, Trash2, Eye, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const USERS_MOCK_DATA = [
  {
    id: "1",
    name: "Jan Kowalski",
    email: "jan.kowalski@zhp.pl",
    role: "admin",
    organization: "Hufiec ZHP Warszawa-Mokotów",
    status: "active",
    lastLogin: "2023-06-15 14:32"
  },
  {
    id: "2",
    name: "Anna Nowak",
    email: "anna.nowak@zhp.net.pl",
    role: "owner",
    organization: "Chorągiew Podkarpacka ZHP",
    status: "active",
    lastLogin: "2023-06-14 09:17"
  },
  {
    id: "3",
    name: "Piotr Wiśniewski",
    email: "piotr.wisniewski@gmail.com",
    role: "user",
    organization: "135 WDH",
    status: "active",
    lastLogin: "2023-06-13 18:45"
  },
  {
    id: "4",
    name: "Magdalena Lis",
    email: "magdalena.lis@zhp.pl",
    role: "owner",
    organization: "Chorągiew Krakowska ZHP",
    status: "active",
    lastLogin: "2023-06-12 11:21"
  },
  {
    id: "5",
    name: "Tomasz Wojciechowski",
    email: "tomasz.wojciechowski@zhp.pl",
    role: "owner",
    organization: "Główna Kwatera ZHP",
    status: "inactive",
    lastLogin: "2023-05-30 15:08"
  },
  {
    id: "6",
    name: "Karolina Majewska",
    email: "karolina.majewska@gmail.com",
    role: "user",
    organization: "22 DSH Grot",
    status: "suspended",
    lastLogin: "2023-05-28 20:14"
  },
  {
    id: "7",
    name: "Michał Zieliński",
    email: "michal.zielinski@zhp.net.pl",
    role: "user",
    organization: "47 MDH Pomarańczarnia",
    status: "active",
    lastLogin: "2023-06-10 12:37"
  }
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredUsers = USERS_MOCK_DATA.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.organization.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const roleOptions = [
    { value: "all", label: "Wszystkie role" },
    { value: "admin", label: "Administrator" },
    { value: "owner", label: "Właściciel bazy" },
    { value: "user", label: "Użytkownik" }
  ];
  
  const statusOptions = [
    { value: "all", label: "Wszystkie statusy" },
    { value: "active", label: "Aktywny" },
    { value: "inactive", label: "Nieaktywny" },
    { value: "suspended", label: "Zawieszony" }
  ];
  
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "owner":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "owner":
        return "Właściciel bazy";
      case "user":
        return "Użytkownik";
      default:
        return role;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktywny";
      case "inactive":
        return "Nieaktywny";
      case "suspended":
        return "Zawieszony";
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Użytkownicy</h1>
            <p className="text-muted-foreground">Zarządzaj użytkownikami systemu</p>
          </div>
          <Button className="bg-scout-500 hover:bg-scout-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Dodaj użytkownika
          </Button>
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
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
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
                    Nazwa użytkownika
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Organizacja</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ostatnie logowanie</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">#{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRoleBadgeClass(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Pokazuje {filteredUsers.length} z {USERS_MOCK_DATA.length} użytkowników
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

export default AdminUsers;
