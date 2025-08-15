
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Heart, MessageSquare, Camera, Settings, Save, Loader2, Shield, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [editedProfile, setEditedProfile] = useState({
    full_name: "",
    phone: "",
    scout_group: "",
    bio: "",
  });

  const [preferences, setPreferences] = useState({
    email_notifications: true,
    push_notifications: true,
    marketing_emails: false,
  });

  useEffect(() => {
    if (profile) {
      setEditedProfile({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        scout_group: profile.scout_group || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);
  
  const favoritesBases = [
    {
      id: 1,
      name: "Stanica Harcerska Biały Las",
      location: "Warmińsko-mazurskie, Mazury",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Centrum Szkoleniowe Harcerska Dolina",
      location: "Dolnośląskie, Sudety",
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
      rating: 4.9,
    },
  ];
  
  const myReviews = [
    {
      id: 1,
      baseName: "Stanica Harcerska Biały Las",
      rating: 5,
      content: "Fantastyczne miejsce na obóz! Czyste sanitariaty, doskonała lokalizacja nad jeziorem.",
      date: "2024-08-15",
    },
    {
      id: 2,
      baseName: "Ośrodek Wypoczynkowy Puszcza",
      rating: 4,
      content: "Dobre miejsce, ale mogłoby być więcej miejsc na ognisko.",
      date: "2024-07-22",
    },
  ];

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile(editedProfile);
      if (!error) {
        setIsEditing(false);
        toast({
          title: "Profil zaktualizowany",
          description: "Twoje dane zostały pomyślnie zapisane",
        });
      }
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować profilu",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800"><Shield className="h-3 w-3 mr-1" />Administrator</Badge>;
      case 'moderator':
        return <Badge className="bg-blue-100 text-blue-800"><Shield className="h-3 w-3 mr-1" />Moderator</Badge>;
      default:
        return <Badge variant="secondary">Użytkownik</Badge>;
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ładowanie profilu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || ''} />
                    <AvatarFallback className="text-lg">{getInitials(profile.full_name)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">{profile.full_name || 'Użytkownik'}</h1>
                        {getRoleBadge(profile.role)}
                      </div>
                      <p className="text-gray-600">{profile.scout_group || 'Brak przypisanej drużyny'}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {profile.email}
                        </div>
                        {profile.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {profile.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : isEditing ? (
                          <Save className="h-4 w-4 mr-2" />
                        ) : (
                          <Settings className="h-4 w-4 mr-2" />
                        )}
                        {isSaving ? "Zapisywanie..." : isEditing ? "Zapisz" : "Edytuj profil"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Przegląd</TabsTrigger>
              <TabsTrigger value="favorites">Ulubione</TabsTrigger>
              <TabsTrigger value="reviews">Moje recenzje</TabsTrigger>
              <TabsTrigger value="settings">Ustawienia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informacje osobiste</CardTitle>
                  <CardDescription>Podstawowe informacje o Twoim profilu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Imię i nazwisko</Label>
                        <Input
                          id="name"
                          value={editedProfile.full_name}
                          onChange={(e) => setEditedProfile({...editedProfile, full_name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-gray-500">Adres email nie może być zmieniony</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                          placeholder="+48 123 456 789"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scoutGroup">Drużyna harcerska</Label>
                        <Input
                          id="scoutGroup"
                          value={editedProfile.scout_group}
                          onChange={(e) => setEditedProfile({...editedProfile, scout_group: e.target.value})}
                          placeholder="1. Drużyna Harcerska..."
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="bio">O mnie</Label>
                        <Textarea
                          id="bio"
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                          placeholder="Opowiedz coś o sobie..."
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Imię i nazwisko</Label>
                          <p className="mt-1">{profile.full_name || 'Nie podano'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Email</Label>
                          <p className="mt-1">{profile.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Telefon</Label>
                          <p className="mt-1">{profile.phone || 'Nie podano'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Status weryfikacji</Label>
                          <div className="mt-1">
                            {profile.is_verified ? (
                              <Badge className="bg-green-100 text-green-800">Zweryfikowany</Badge>
                            ) : (
                              <Badge variant="outline">Niezweryfikowany</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Drużyna harcerska</Label>
                          <p className="mt-1">{profile.scout_group || 'Nie podano'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Rola</Label>
                          <div className="mt-1">
                            {getRoleBadge(profile.role)}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Członek od</Label>
                          <p className="mt-1">{new Date(profile.created_at).toLocaleDateString('pl-PL')}</p>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-500">O mnie</Label>
                        <p className="mt-1 text-gray-700">{profile.bio || 'Brak opisu'}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-scout-100 rounded-lg">
                        <Heart className="h-6 w-6 text-scout-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-gray-600">Ulubione bazy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-scout-100 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-scout-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-sm text-gray-600">Napisane recenzje</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-scout-100 rounded-lg">
                        <User className="h-6 w-6 text-scout-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{new Date(profile.created_at).getFullYear()}</p>
                        <p className="text-sm text-gray-600">Członek od</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ulubione bazy</CardTitle>
                  <CardDescription>Bazy, które dodałeś do ulubionych</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoritesBases.map((base) => (
                      <div key={base.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={base.image}
                          alt={base.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-lg">{base.name}</h3>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {base.location}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(base.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">
                                {base.rating}
                              </span>
                            </div>
                            <Button size="sm" variant="outline">
                              Zobacz szczegóły
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Moje recenzje</CardTitle>
                  <CardDescription>Recenzje, które napisałeś o bazach harcerskich</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {myReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{review.baseName}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.content}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ustawienia konta</CardTitle>
                  <CardDescription>Zarządzaj ustawieniami swojego konta i powiadomień</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Powiadomienia email</h4>
                        <p className="text-sm text-gray-600">Otrzymuj powiadomienia o nowych bazach i aktualizacjach</p>
                      </div>
                      <Switch
                        checked={preferences.email_notifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, email_notifications: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Powiadomienia push</h4>
                        <p className="text-sm text-gray-600">Otrzymuj natychmiastowe powiadomienia w przeglądarce</p>
                      </div>
                      <Switch
                        checked={preferences.push_notifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, push_notifications: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Wiadomości marketingowe</h4>
                        <p className="text-sm text-gray-600">Otrzymuj informacje o promocjach i nowościach</p>
                      </div>
                      <Switch
                        checked={preferences.marketing_emails}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, marketing_emails: checked})
                        }
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Język</Label>
                      <Select defaultValue="pl">
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz język" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pl">Polski</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Motyw</Label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz motyw" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Jasny</SelectItem>
                          <SelectItem value="dark">Ciemny</SelectItem>
                          <SelectItem value="system">Systemowy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-scout-500 hover:bg-scout-600">
                      Zapisz ustawienia
                    </Button>
                  </div>

                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-red-600">Strefa niebezpieczna</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Zmień hasło
                      </Button>
                      <Button variant="destructive" className="w-full">
                        Usuń konto
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
