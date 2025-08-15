import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Image as ImageIcon, 
  Upload, 
  Search, 
  MoreHorizontal, 
  Download, 
  Trash2,
  Calendar,
  User,
  FileText,
  Video,
  FileImage,
  Copy,
  ExternalLink
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Media } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

const AdminMedia = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media')
        .select(`
          *,
          profiles:uploaded_by (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMedia(data || []);
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać mediów",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <FileImage className="h-4 w-4" />;
    } else if (mimeType.startsWith('video/')) {
      return <Video className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const getMimeTypeBadge = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Badge className="bg-green-100 text-green-800">Obraz</Badge>;
    } else if (mimeType.startsWith('video/')) {
      return <Badge className="bg-blue-100 text-blue-800">Wideo</Badge>;
    } else if (mimeType.includes('pdf')) {
      return <Badge className="bg-red-100 text-red-800">PDF</Badge>;
    }
    return <Badge variant="secondary">Dokument</Badge>;
  };

  const handleUpload = async () => {
    if (!profile?.id || selectedFiles.length === 0) {
      toast({
        title: "Błąd",
        description: "Nie wybrano plików do przesłania",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `media/${fileName}`;

        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Save media record to database
        const { error: dbError } = await supabase
          .from('media')
          .insert([
            {
              filename: fileName,
              original_name: file.name,
              mime_type: file.type,
              size_bytes: file.size,
              url: publicUrl,
              uploaded_by: profile.id,
            }
          ]);

        if (dbError) {
          throw dbError;
        }
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Sukces",
        description: `Przesłano ${selectedFiles.length} plik(ów)`,
      });

      setIsUploadDialogOpen(false);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchMedia();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się przesłać plików",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string, filename: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([`media/${filename}`]);

      if (storageError) {
        console.warn('Storage deletion error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Sukces",
        description: "Media została usunięta",
      });
      fetchMedia();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć media",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Skopiowano",
        description: "URL został skopiowany do schowka",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się skopiować URL",
        variant: "destructive",
      });
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.filename.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesType = true;
    if (typeFilter !== "all") {
      switch (typeFilter) {
        case "images":
          matchesType = item.mime_type.startsWith('image/');
          break;
        case "videos":
          matchesType = item.mime_type.startsWith('video/');
          break;
        case "documents":
          matchesType = !item.mime_type.startsWith('image/') && !item.mime_type.startsWith('video/');
          break;
      }
    }
    
    return matchesSearch && matchesType;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Biblioteka mediów</h1>
            <p className="text-muted-foreground">Zarządzaj plikami i mediami</p>
          </div>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scout-500 hover:bg-scout-600">
                <Upload className="mr-2 h-4 w-4" />
                Prześlij pliki
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Prześlij nowe pliki</DialogTitle>
                <DialogDescription>
                  Wybierz pliki do przesłania do biblioteki mediów
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="files">Pliki</Label>
                  <Input
                    ref={fileInputRef}
                    id="files"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    disabled={uploading}
                  />
                  <p className="text-xs text-gray-500">
                    Obsługiwane formaty: obrazy, wideo, PDF, dokumenty Word
                  </p>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Wybrane pliki ({selectedFiles.length})</Label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                          <span className="truncate">{file.name}</span>
                          <span className="text-gray-500">{formatFileSize(file.size)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button 
                  onClick={handleUpload} 
                  disabled={uploading || selectedFiles.length === 0}
                  className="bg-scout-500 hover:bg-scout-600"
                >
                  {uploading ? "Przesyłanie..." : "Prześlij"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Lista mediów
            </CardTitle>
            <CardDescription>
              Wszystkie pliki w bibliotece mediów
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Szukaj plików..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Wszystkie typy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie typy</SelectItem>
                  <SelectItem value="images">Obrazy</SelectItem>
                  <SelectItem value="videos">Wideo</SelectItem>
                  <SelectItem value="documents">Dokumenty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scout-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Ładowanie mediów...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <Card key={item.id} className="group relative overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square relative bg-gray-100">
                        {item.mime_type.startsWith('image/') ? (
                          <img
                            src={item.url}
                            alt={item.alt_text || item.original_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {getFileIcon(item.mime_type)}
                            <span className="ml-2 text-sm text-gray-600">
                              {item.original_name}
                            </span>
                          </div>
                        )}
                        
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Kopiuj URL
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Otwórz w nowej karcie
                                </a>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <a href={item.url} download={item.original_name}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Pobierz
                                </a>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDeleteMedia(item.id, item.filename)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Usuń
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate" title={item.original_name}>
                          {item.original_name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          {getMimeTypeBadge(item.mime_type)}
                          <span className="text-xs text-gray-500">
                            {formatFileSize(item.size_bytes)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <User className="h-3 w-3" />
                          <span>
                            {(item as any).profiles?.full_name || 'Nieznany'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString('pl-PL')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredMedia.length === 0 && (
              <div className="text-center py-8">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Brak mediów</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || typeFilter !== "all" 
                    ? "Nie znaleziono plików pasujących do kryteriów wyszukiwania."
                    : "Zacznij od przesłania pierwszego pliku."
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

export default AdminMedia;