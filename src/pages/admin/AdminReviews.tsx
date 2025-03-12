
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Edit, Trash2, Eye, ArrowUpDown, Flag, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";

const REVIEWS_MOCK_DATA = [
  {
    id: "1",
    author: "Jan Kowalski",
    baseName: "Stanica Harcerska Biały Las",
    content: "Idealne miejsce na obóz harcerski. Jesteśmy tu już trzeci rok z rzędu i zawsze wszystko jest perfekcyjnie przygotowane. Polecamy!",
    rating: 5,
    date: "2023-06-15",
    status: "approved"
  },
  {
    id: "2",
    author: "Anna Nowak",
    baseName: "Baza Harcerska Leśne Ustronie",
    content: "Piękna okolica, świetna infrastruktura. Jedyny minus to brak ciepłej wody w części sanitariatów, ale poza tym wszystko na wysokim poziomie.",
    rating: 4,
    date: "2023-06-14",
    status: "approved"
  },
  {
    id: "3",
    author: "Piotr Wiśniewski",
    baseName: "Stanica Wodna Bryza",
    content: "Bardzo dobra baza z dostępem do jeziora. Sprzęt pływający w dobrym stanie, infrastruktura również. Polecam dla drużyn wodnych.",
    rating: 5,
    date: "2023-06-13",
    status: "approved"
  },
  {
    id: "4",
    author: "Magdalena Lis",
    baseName: "Baza Obozowa Watra",
    content: "Lokalizacja super, ale sanitariaty wymagają remontu. Obsługa bardzo pomocna i przyjazna.",
    rating: 3,
    date: "2023-06-12",
    status: "approved"
  },
  {
    id: "5",
    author: "Tomasz Wojciechowski",
    baseName: "Ośrodek Harcerski Perkoz",
    content: "Ta baza to jakieś nieporozumienie! Nie polecam nikomu, totalna katastrofa!!!",
    rating: 1,
    date: "2023-06-11",
    status: "flagged"
  },
  {
    id: "6",
    author: "Karolina Majewska",
    baseName: "Stanica Harcerska Zielona Polana",
    content: "Przyjemne miejsce, dobra lokalizacja do organizacji biwaków i krótszych wyjazdów. Polecam szczególnie na wiosenne i jesienne wypady.",
    rating: 4,
    date: "2023-06-10",
    status: "pending"
  },
  {
    id: "7",
    author: "Michał Zieliński",
    baseName: "Baza Obozowa Dolina Wilka",
    content: "Świetna baza z doskonałą bazą pionierki! Byliśmy zachwyceni ilością i jakością drewna. Wspaniałe miejsce na obóz stały.",
    rating: 5,
    date: "2023-06-09",
    status: "pending"
  }
];

const AdminReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  
  const filteredReviews = REVIEWS_MOCK_DATA.filter(review => {
    const matchesSearch = review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        review.baseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        review.content.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });
  
  const statusOptions = [
    { value: "all", label: "Wszystkie statusy" },
    { value: "approved", label: "Zatwierdzona" },
    { value: "pending", label: "Oczekująca" },
    { value: "flagged", label: "Oznaczona" }
  ];
  
  const ratingOptions = [
    { value: "all", label: "Wszystkie oceny" },
    { value: "5", label: "5 gwiazdek" },
    { value: "4", label: "4 gwiazdki" },
    { value: "3", label: "3 gwiazdki" },
    { value: "2", label: "2 gwiazdki" },
    { value: "1", label: "1 gwiazdka" }
  ];
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Zatwierdzona";
      case "pending":
        return "Oczekująca";
      case "flagged":
        return "Oznaczona";
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4" />;
      case "flagged":
        return <Flag className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recenzje</h1>
          <p className="text-muted-foreground">Zarządzaj recenzjami baz harcerskich</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Szukaj w recenzjach..."
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
          
          <select
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            {ratingOptions.map(option => (
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
                    Autor
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Baza</TableHead>
                <TableHead>Recenzja</TableHead>
                <TableHead className="text-center">Ocena</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Data
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">#{review.id}</TableCell>
                  <TableCell>{review.author}</TableCell>
                  <TableCell>{review.baseName}</TableCell>
                  <TableCell className="max-w-xs truncate">{review.content}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(review.status)}`}>
                      {getStatusIcon(review.status)}
                      {getStatusLabel(review.status)}
                    </span>
                  </TableCell>
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
            Pokazuje {filteredReviews.length} z {REVIEWS_MOCK_DATA.length} recenzji
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

export default AdminReviews;
