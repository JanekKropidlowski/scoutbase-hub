
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

// NOTE: Integrate with Supabase reviews table in a follow-up migration.

const REVIEWS_MOCK_DATA = [
  { id: "1", base: "Stanica Harcerska Biały Las", user: "Jan Kowalski", rating: 5, status: "pending", date: "2023-06-14" },
  { id: "2", base: "Baza Harcerska Leśne Ustronie", user: "Anna Nowak", rating: 4, status: "approved", date: "2023-06-13" },
  { id: "3", base: "Stanica Wodna Bryza", user: "Piotr Wiśniewski", rating: 3, status: "rejected", date: "2023-06-12" }
];

const AdminReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filtered = REVIEWS_MOCK_DATA.filter((r) => {
    const matches = r.base.toLowerCase().includes(searchQuery.toLowerCase()) || r.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matches && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Recenzje</h1>
            <p className="text-muted-foreground">Zarządzaj recenzjami użytkowników</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Szukaj..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">Wszystkie</option>
            <option value="pending">Oczekujące</option>
            <option value="approved">Zatwierdzone</option>
            <option value="rejected">Odrzucone</option>
          </select>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Baza</TableHead>
                <TableHead>Użytkownik</TableHead>
                <TableHead>Ocena</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">#{r.id}</TableCell>
                  <TableCell>{r.base}</TableCell>
                  <TableCell>{r.user}</TableCell>
                  <TableCell>{r.rating}/5</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-green-600"><Check className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500"><X className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;
