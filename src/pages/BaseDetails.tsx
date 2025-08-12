import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { ScoutBaseService } from "@/services/scout-base-service";
import { ScoutBaseWithDetails } from "@/types/scout-base";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar,
  Wifi,
  Car,
  Accessibility,
  Home,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink
} from "lucide-react";

const BaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [base, setBase] = useState<ScoutBaseWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBase = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await ScoutBaseService.getScoutBase(id);
        setBase(data);
      } catch (error) {
        toast.error("Błąd podczas ładowania bazy");
      } finally {
        setLoading(false);
      }
    };

    loadBase();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-scout-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ładowanie informacji o bazie...</p>
          </div>
        </div>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  if (!base) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Nie znaleziono bazy</h1>
            <p className="text-gray-600 mb-8">Baza o podanym ID nie istnieje lub została usunięta.</p>
            <Link to="/search">
              <Button>Wróć do wyszukiwania</Button>
            </Link>
          </div>
        </div>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/search">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Wróć do listy
                </Button>
              </Link>
              <Badge variant={base.status === 'published' ? 'default' : 'secondary'}>
                {base.status === 'published' ? 'Opublikowana' : 
                 base.status === 'draft' ? 'Szkic' : 'Zarchiwizowana'}
              </Badge>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{base.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{base.short_description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{base.address_city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{base.capacity_total} miejsc</span>
                  </div>
                  {base.equipment_rental && (
                    <Badge variant="outline">Wynajem sprzętu</Badge>
                  )}
                  {base.accessibility_disabled && (
                    <Badge variant="outline">
                      <Accessibility className="h-3 w-3 mr-1" />
                      Dostępne dla niepełnosprawnych
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {base.website && (
                  <Button asChild variant="outline">
                    <a href={base.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Strona internetowa
                    </a>
                  </Button>
                )}
                <Button className="bg-scout-500 hover:bg-scout-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Skontaktuj się
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              {base.long_description && (
                <Card>
                  <CardHeader>
                    <CardTitle>Opis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{base.long_description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Accommodation Types */}
              {base.accommodation_types && base.accommodation_types.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Zakwaterowanie</CardTitle>
                    <CardDescription>Dostępne rodzaje zakwaterowania</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {base.accommodation_types.map((accommodation: any, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-scout-500" />
                            <span>{accommodation.accommodation_types?.name || 'Typ zakwaterowania'}</span>
                          </div>
                          {accommodation.capacity && (
                            <Badge variant="outline">{accommodation.capacity} miejsc</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Equipment */}
              {base.equipment_types && base.equipment_types.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Wyposażenie</CardTitle>
                    <CardDescription>Dostępne udogodnienia i wyposażenie</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {base.equipment_types.map((equipment: any, index) => (
                        <Badge key={index} variant="outline">
                          {equipment.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sports Infrastructure */}
              {base.sports_infrastructure && (
                <Card>
                  <CardHeader>
                    <CardTitle>Infrastruktura sportowa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{base.sports_infrastructure}</p>
                  </CardContent>
                </Card>
              )}

              {/* Nearby Attractions */}
              {base.nearby_attractions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Atrakcje w okolicy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{base.nearby_attractions}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Kontakt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href={`tel:${base.contact_phone}`} className="hover:text-scout-500">
                      {base.contact_phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href={`mailto:${base.contact_email}`} className="hover:text-scout-500">
                      {base.contact_email}
                    </a>
                  </div>

                  {base.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a href={base.website} target="_blank" rel="noopener noreferrer" 
                         className="hover:text-scout-500 flex items-center gap-1">
                        Strona internetowa
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {/* Social Media */}
                  <Separator />
                  <div className="flex gap-2">
                    {base.facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={base.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {base.instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={base.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {base.youtube && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={base.youtube} target="_blank" rel="noopener noreferrer">
                          <Youtube className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Lokalizacja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">Adres:</p>
                    <p className="text-sm text-gray-600">
                      {base.address_street} {base.address_number}
                      <br />
                      {base.address_postal_code} {base.address_city}
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Współrzędne GPS:</p>
                    <p className="text-sm text-gray-600">
                      {base.gps_latitude}, {base.gps_longitude}
                    </p>
                  </div>

                  {base.google_maps_link && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={base.google_maps_link} target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-4 w-4 mr-2" />
                        Otwórz w Google Maps
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Transport */}
              {base.transport_accessibility && base.transport_accessibility.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Dostępność komunikacyjna</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {base.transport_accessibility.map((transport: any, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{transport.transport_accessibility?.name || 'Transport'}</span>
                        </div>
                        {transport.distance_km && (
                          <Badge variant="outline" className="text-xs">
                            {transport.distance_km} km
                          </Badge>
                        )}
                      </div>
                    ))}
                    
                    {base.nearest_transport_info && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-gray-600">{base.nearest_transport_info}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Kategorie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {base.base_types && base.base_types.length > 0 && (
                    <div>
                      <p className="font-medium text-sm mb-2">Typ obiektu:</p>
                      <div className="flex flex-wrap gap-1">
                        {base.base_types.map((type: any, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {type.base_types?.name || 'Typ bazy'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {base.seasons && base.seasons.length > 0 && (
                    <div>
                      <p className="font-medium text-sm mb-2">Sezon:</p>
                      <div className="flex flex-wrap gap-1">
                        {base.seasons.map((season: any, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {season.seasons?.name || 'Sezon'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {base.availability_types && base.availability_types.length > 0 && (
                    <div>
                      <p className="font-medium text-sm mb-2">Dostępność:</p>
                      <div className="flex flex-wrap gap-1">
                        {base.availability_types.map((availability: any, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {availability.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Season and Pricing */}
              {(base.season_start || base.season_end || base.pricing_description) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sezon i cennik</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(base.season_start || base.season_end) && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {base.season_start && new Date(base.season_start).toLocaleDateString('pl-PL')}
                          {base.season_start && base.season_end && ' - '}
                          {base.season_end && new Date(base.season_end).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    )}
                    
                    {base.pricing_description && (
                      <p className="text-sm text-gray-600">{base.pricing_description}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default BaseDetails;
