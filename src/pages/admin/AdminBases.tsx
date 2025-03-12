
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Edit, Trash2, Eye, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const BASES_MOCK_DATA = [
  {
    id: "1",
    name: "Stanica Harcerska Biały Las",
    location: "Mazury, woj. warmińsko-mazurskie",
    capacity: 120,
    owner: "Hufiec ZHP Warszawa-Mokotów",
    status: "active",
    lastUpdated: "2023-05-15"
  },
  {
    id: "2",
    name: "Baza Harcerska Leśne Ustronie", 
    location: "Bieszczady, woj. podkarpackie",
    capacity: 90,
    owner: "Chorągiew Podkarpacka ZHP",
    status: "active",
    lastUpdated: "2023-04-22"
  },
  {
    id: "3",
    name: "Stanica Wodna Bryza",
    location: "Pomorze, woj. pomorskie",
    capacity: 75,
    owner: "Hufiec ZHP Gdańsk-Wrzeszcz",
    status: "pending",
    lastUpdated: "2023-06-03"
  },
  {
    id: "4",
    name: "Baza Obozowa Watra",
    location: "Tatry, woj. małopolskie", 
    capacity: 150,
    owner: "Chorągiew Krakowska ZHP",
    status: "active",
    lastUpdated: "2023-03-17"
  },
  {
    id: "5",
    name: "Ośrodek Harcerski Perkoz",
    location: "Mazury, woj. warmińsko-mazurskie",
    capacity: 200,
    owner: "Główna Kwatera ZHP",
    status: "active",
    lastUpdated: "2023-05-30"
  },
  {
    id: "6",
    name: "Stanica Harcerska Zielona Polana",
    location: "Bory Tucholskie, woj. pomorskie",
    capacity: 85,
    owner: "Hufiec ZHP Toruń",
    status: "inactive",
    lastUpdated: "2023-02-11"
  },
  {
    id: "7",
    name: "Baza Obozowa Dolina Wilka",
    location: "Sudety, woj. dolnośląskie",
    capacity: 100,
    owner: "Chorągiew Dolnośląska ZHP",
    status: "active",
    lastUpdated: "2023-04-08"
  }
];

const AdminBases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredBases = BASES_MOCK_DATA.filter(base => {
    const matchesSearch = base.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         base.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         base.owner.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesStatus = statusFilter === "all" || base.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const statusOptions = [
    { value: "all", label: "Wszystkie statusy" },
    { value: "active", label: "Aktywna" },
    { value: "pending", label: "Oczekująca" },
    { value: "inactive", label: "Nieaktywna" }
  ];
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktywna";
      case "pending":
        return "Oczekująca";
      case "inactive":
        return "Nieaktywna";
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bazy harcerskie</h1>
            <p className="text-muted-foreground">Zarządzaj bazami harcerskimi w systemie</p>
          </div>
          <Button className="bg-scout-500 hover:bg-scout-600">
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
                <TableHead>Właściciel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ostatnia aktualizacja</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBases.map((base) => (
                <TableRow key={base.id}>
                  <TableCell className="font-medium">#{base.id}</TableCell>
                  <TableCell>{base.name}</TableCell>
                  <TableCell>{base.location}</TableCell>
                  <TableCell className="text-center">{base.capacity}</TableCell>
                  <TableCell>{base.owner}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(base.status)}`}>
                      {getStatusLabel(base.status)}
                    </span>
                  </TableCell>
                  <TableCell>{base.lastUpdated}</TableCell>
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
            Pokazuje {filteredBases.length} z {BASES_MOCK_DATA.length} baz
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
