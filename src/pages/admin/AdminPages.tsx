import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Trash2,
  Calendar,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CmsPage } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

const AdminPages = () => {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Wprowadź treść strony..." }]
        }
      ]
    }),
    meta_title: "",
    meta_description: "",
    status: "draft" as const,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cms_pages')
        .select(`
          *,
          profiles:author_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPages(data || []);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać stron",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!profile?.id) {
      toast({
        title: "Błąd",
        description: "Nie jesteś zalogowany",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('cms_pages')
        .insert([
          {
            ...newPage,
            author_id: profile.id,
            content: JSON.parse(newPage.content),
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Sukces",
        description: "Strona została utworzona",
      });

      setIsCreateDialogOpen(false);
      setNewPage({
        title: "",
        slug: "",
        content: JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Wprowadź treść strony..." }]
            }
          ]
        }),
        meta_title: "",
        meta_description: "",
        status: "draft",
      });
      fetchPages();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć strony",
        variant: "destructive",
      });
    }
  };

  const handleDeletePage = async (pageId: string) => {
    try {
      const { error } = await supabase
        .from('cms_pages')
        .delete()
        .eq('id', pageId);

      if (error) {
        throw error;
      }

      toast({
        title: "Sukces",
        description: "Strona została usunięta",
      });
      fetchPages();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć strony",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePageStatus = async (pageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('cms_pages')
        .update({ status })
        .eq('id', pageId);

      if (error) {
        throw error;
      }

      toast({
        title: "Sukces",
        description: "Status strony został zaktualizowany",
      });
      fetchPages();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować statusu",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Opublikowana</Badge>;
      case 'draft':
        return <Badge variant="secondary">Szkic</Badge>;
      case 'archived':
        return <Badge variant="outline">Zarchiwizowana</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Strony CMS</h1>
            <p className="text-muted-foreground">Zarządzaj treścią swojej witryny</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scout-500 hover:bg-scout-600">
                <Plus className="mr-2 h-4 w-4" />
                Nowa strona
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Utwórz nową stronę</DialogTitle>
                <DialogDescription>
                  Dodaj nową stronę do swojej witryny
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Tytuł
                  </Label>
                  <Input
                    id="title"
                    value={newPage.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewPage({
                        ...newPage,
                        title,
                        slug: generateSlug(title),
                      });
                    }}
                    className="col-span-3"
                    placeholder="Tytuł strony"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slug" className="text-right">
                    Slug URL
                  </Label>
                  <Input
                    id="slug"
                    value={newPage.slug}
                    onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                    className="col-span-3"
                    placeholder="url-strony"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="meta_title" className="text-right">
                    Meta tytuł
                  </Label>
                  <Input
                    id="meta_title"
                    value={newPage.meta_title}
                    onChange={(e) => setNewPage({ ...newPage, meta_title: e.target.value })}
                    className="col-span-3"
                    placeholder="Tytuł dla SEO"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="meta_description" className="text-right">
                    Meta opis
                  </Label>
                  <Textarea
                    id="meta_description"
                    value={newPage.meta_description}
                    onChange={(e) => setNewPage({ ...newPage, meta_description: e.target.value })}
                    className="col-span-3"
                    placeholder="Opis dla SEO i mediów społecznościowych"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newPage.status}
                    onValueChange={(value: "draft" | "published" | "archived") => 
                      setNewPage({ ...newPage, status: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Szkic</SelectItem>
                      <SelectItem value="published">Opublikowana</SelectItem>
                      <SelectItem value="archived">Zarchiwizowana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button onClick={handleCreatePage} className="bg-scout-500 hover:bg-scout-600">
                  Utwórz stronę
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Lista stron
            </CardTitle>
            <CardDescription>
              Wszystkie strony w systemie CMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Szukaj stron..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Wszystkie statusy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie statusy</SelectItem>
                  <SelectItem value="published">Opublikowane</SelectItem>
                  <SelectItem value="draft">Szkice</SelectItem>
                  <SelectItem value="archived">Zarchiwizowane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scout-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Ładowanie stron...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tytuł</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Data utworzenia</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="text-sm text-gray-600">/{page.slug}</TableCell>
                      <TableCell>{getStatusBadge(page.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {(page as any).profiles?.full_name || 'Nieznany'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {new Date(page.created_at).toLocaleDateString('pl-PL')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Podgląd
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edytuj
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {page.status !== 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleUpdatePageStatus(page.id, 'published')}
                              >
                                Opublikuj
                              </DropdownMenuItem>
                            )}
                            {page.status === 'published' && (
                              <DropdownMenuItem 
                                onClick={() => handleUpdatePageStatus(page.id, 'draft')}
                              >
                                Cofnij publikację
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDeletePage(page.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Usuń
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!loading && filteredPages.length === 0 && (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Brak stron</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Nie znaleziono stron pasujących do kryteriów wyszukiwania."
                    : "Zacznij od utworzenia swojej pierwszej strony."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;