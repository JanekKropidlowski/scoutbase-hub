import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Upload, Save, Eye } from "lucide-react";
import { ScoutBaseFormData } from "@/types/scout-base";
import { ScoutBaseService } from "@/services/scout-base-service";
import { toast } from "sonner";

const scoutBaseSchema = z.object({
  // Basic info
  name: z.string().min(1, "Nazwa jest wymagana").max(100, "Nazwa nie może przekraczać 100 znaków"),
  short_description: z.string().min(1, "Krótki opis jest wymagany").max(160, "Krótki opis nie może przekraczać 160 znaków"),
  long_description: z.string().optional(),
  
  // Address
  address_street: z.string().min(1, "Ulica jest wymagana"),
  address_number: z.string().optional(),
  address_city: z.string().min(1, "Miejscowość jest wymagana"),
  address_postal_code: z.string().regex(/^\d{2}-\d{3}$/, "Kod pocztowy powinien mieć format XX-XXX"),
  gps_latitude: z.number().min(-90).max(90),
  gps_longitude: z.number().min(-180).max(180),
  
  // Capacity and contact
  capacity_total: z.number().min(1, "Pojemność musi być większa niż 0"),
  contact_phone: z.string().min(1, "Telefon jest wymagany"),
  contact_email: z.string().email("Nieprawidłowy format email"),
  website: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
  google_maps_link: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
  
  // Social media
  facebook: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
  instagram: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
  youtube: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
  
  // Season and pricing
  season_start: z.string().optional(),
  season_end: z.string().optional(),
  pricing_description: z.string().optional(),
  
  // Additional features
  accessibility_disabled: z.boolean(),
  sports_infrastructure: z.string().max(300, "Opis nie może przekraczać 300 znaków").optional(),
  nearest_transport_info: z.string().optional(),
  equipment_rental: z.boolean(),
  nearby_attractions: z.string().max(300, "Opis nie może przekraczać 300 znaków").optional(),
  additional_notes: z.string().optional(),
  promotional_video_url: z.string().url("Nieprawidłowy format URL").optional().or(z.literal("")),
  
  // Categories
  base_type_ids: z.array(z.string()),
  region_ids: z.array(z.string()),
  season_ids: z.array(z.string()),
  availability_type_ids: z.array(z.string()),
  equipment_type_ids: z.array(z.string()),
  
  // Status
  status: z.enum(['draft', 'published', 'archived']),
});

type FormData = z.infer<typeof scoutBaseSchema> & {
  accommodation_type_details: { type_id: string; capacity?: number }[];
  transport_accessibility_details: { type_id: string; distance_km?: number }[];
};

interface ScoutBaseFormProps {
  baseId?: string;
  onSave: (data: ScoutBaseFormData) => Promise<void>;
  onCancel: () => void;
}

const ScoutBaseForm: React.FC<ScoutBaseFormProps> = ({ baseId, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    baseTypes: [],
    regions: [],
    seasons: [],
    accommodationTypes: [],
    availabilityTypes: [],
    equipmentTypes: [],
    transportAccessibility: [],
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(scoutBaseSchema as any),
    defaultValues: {
      status: 'draft',
      accessibility_disabled: false,
      equipment_rental: false,
      base_type_ids: [],
      region_ids: [],
      season_ids: [],
      availability_type_ids: [],
      equipment_type_ids: [],
      accommodation_type_details: [],
      transport_accessibility_details: [],
    }
  });

  const {
    fields: accommodationFields,
    append: appendAccommodation,
    remove: removeAccommodation
  } = useFieldArray({
    control,
    name: "accommodation_type_details"
  });

  const {
    fields: transportFields,
    append: appendTransport,
    remove: removeTransport
  } = useFieldArray({
    control,
    name: "transport_accessibility_details"
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const [
          baseTypes,
          regions,
          seasons,
          accommodationTypes,
          availabilityTypes,
          equipmentTypes,
          transportAccessibility
        ] = await Promise.all([
          ScoutBaseService.getBaseTypes(),
          ScoutBaseService.getRegions(),
          ScoutBaseService.getSeasons(),
          ScoutBaseService.getAccommodationTypes(),
          ScoutBaseService.getAvailabilityTypes(),
          ScoutBaseService.getEquipmentTypes(),
          ScoutBaseService.getTransportAccessibility(),
        ]);

        setCategories({
          baseTypes,
          regions,
          seasons,
          accommodationTypes,
          availabilityTypes,
          equipmentTypes,
          transportAccessibility
        });
      } catch (error) {
        toast.error("Błąd podczas ładowania kategorii");
      }
    };

    loadCategories();

    // Load existing base data if editing
    if (baseId) {
      const loadBase = async () => {
        try {
          const base = await ScoutBaseService.getScoutBase(baseId);
          if (base) {
            // Reset form with loaded data
            reset({
              ...base,
              website: base.website || "",
              google_maps_link: base.google_maps_link || "",
              facebook: base.facebook || "",
              instagram: base.instagram || "",
              youtube: base.youtube || "",
              promotional_video_url: base.promotional_video_url || "",
            } as any);
          }
        } catch (error) {
          toast.error("Błąd podczas ładowania danych bazy");
        }
      };
      loadBase();
    }
  }, [baseId, reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await onSave(data as ScoutBaseFormData);
      toast.success(baseId ? "Baza została zaktualizowana" : "Baza została utworzona");
    } catch (error) {
      toast.error("Błąd podczas zapisywania bazy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {baseId ? "Edytuj bazę harcerską" : "Dodaj nową bazę harcerską"}
        </h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit" disabled={loading} className="bg-scout-500 hover:bg-scout-600">
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Zapisywanie..." : "Zapisz"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Podstawowe</TabsTrigger>
          <TabsTrigger value="location">Lokalizacja</TabsTrigger>
          <TabsTrigger value="categories">Kategorie</TabsTrigger>
          <TabsTrigger value="features">Wyposażenie</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacje podstawowe</CardTitle>
              <CardDescription>Podstawowe informacje o bazie harcerskiej</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nazwa obiektu *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="short_description">Krótki opis (meta description) *</Label>
                <Textarea
                  id="short_description"
                  {...register("short_description")}
                  placeholder="Maksymalnie 160 znaków"
                  className={errors.short_description ? "border-red-500" : ""}
                />
                {errors.short_description && <p className="text-sm text-red-500 mt-1">{errors.short_description.message}</p>}
              </div>

              <div>
                <Label htmlFor="long_description">Długi opis</Label>
                <Textarea
                  id="long_description"
                  {...register("long_description")}
                  rows={6}
                  placeholder="Pełny opis oferty"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity_total">Liczba miejsc noclegowych *</Label>
                  <Input
                    id="capacity_total"
                    type="number"
                    {...register("capacity_total", { valueAsNumber: true })}
                    className={errors.capacity_total ? "border-red-500" : ""}
                  />
                  {errors.capacity_total && <p className="text-sm text-red-500 mt-1">{errors.capacity_total.message}</p>}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setValue("status", value as any)} defaultValue="draft">
                    <SelectTrigger>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
              <CardDescription>Informacje kontaktowe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_phone">Telefon kontaktowy *</Label>
                  <Input
                    id="contact_phone"
                    {...register("contact_phone")}
                    className={errors.contact_phone ? "border-red-500" : ""}
                  />
                  {errors.contact_phone && <p className="text-sm text-red-500 mt-1">{errors.contact_phone.message}</p>}
                </div>

                <div>
                  <Label htmlFor="contact_email">E-mail kontaktowy *</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    {...register("contact_email")}
                    className={errors.contact_email ? "border-red-500" : ""}
                  />
                  {errors.contact_email && <p className="text-sm text-red-500 mt-1">{errors.contact_email.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="website">Strona internetowa</Label>
                <Input
                  id="website"
                  type="url"
                  {...register("website")}
                  placeholder="https://"
                />
                {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adres</CardTitle>
              <CardDescription>Dokładny adres bazy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address_street">Ulica *</Label>
                  <Input
                    id="address_street"
                    {...register("address_street")}
                    className={errors.address_street ? "border-red-500" : ""}
                  />
                  {errors.address_street && <p className="text-sm text-red-500 mt-1">{errors.address_street.message}</p>}
                </div>

                <div>
                  <Label htmlFor="address_number">Numer</Label>
                  <Input
                    id="address_number"
                    {...register("address_number")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address_city">Miejscowość *</Label>
                  <Input
                    id="address_city"
                    {...register("address_city")}
                    className={errors.address_city ? "border-red-500" : ""}
                  />
                  {errors.address_city && <p className="text-sm text-red-500 mt-1">{errors.address_city.message}</p>}
                </div>

                <div>
                  <Label htmlFor="address_postal_code">Kod pocztowy *</Label>
                  <Input
                    id="address_postal_code"
                    {...register("address_postal_code")}
                    placeholder="XX-XXX"
                    className={errors.address_postal_code ? "border-red-500" : ""}
                  />
                  {errors.address_postal_code && <p className="text-sm text-red-500 mt-1">{errors.address_postal_code.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lokalizacja GPS</CardTitle>
              <CardDescription>Współrzędne geograficzne</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gps_latitude">Szerokość geograficzna *</Label>
                  <Input
                    id="gps_latitude"
                    type="number"
                    step="any"
                    {...register("gps_latitude", { valueAsNumber: true })}
                    className={errors.gps_latitude ? "border-red-500" : ""}
                  />
                  {errors.gps_latitude && <p className="text-sm text-red-500 mt-1">{errors.gps_latitude.message}</p>}
                </div>

                <div>
                  <Label htmlFor="gps_longitude">Długość geograficzna *</Label>
                  <Input
                    id="gps_longitude"
                    type="number"
                    step="any"
                    {...register("gps_longitude", { valueAsNumber: true })}
                    className={errors.gps_longitude ? "border-red-500" : ""}
                  />
                  {errors.gps_longitude && <p className="text-sm text-red-500 mt-1">{errors.gps_longitude.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="google_maps_link">Link do Google Maps</Label>
                <Input
                  id="google_maps_link"
                  type="url"
                  {...register("google_maps_link")}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kategorie</CardTitle>
              <CardDescription>Klasyfikacja i kategorie bazy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Typ obiektu</Label>
                  <div className="space-y-2 mt-2">
                    {categories.baseTypes.map((type: any) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`base-type-${type.id}`}
                          checked={watch("base_type_ids")?.includes(type.id) || false}
                          onCheckedChange={(checked) => {
                            const current = watch("base_type_ids") || [];
                            if (checked) {
                              setValue("base_type_ids", [...current, type.id]);
                            } else {
                              setValue("base_type_ids", current.filter(id => id !== type.id));
                            }
                          }}
                        />
                        <Label htmlFor={`base-type-${type.id}`} className="text-sm font-normal">
                          {type.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Region</Label>
                  <div className="space-y-2 mt-2">
                    {categories.regions.map((region: any) => (
                      <div key={region.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`region-${region.id}`}
                          checked={watch("region_ids")?.includes(region.id) || false}
                          onCheckedChange={(checked) => {
                            const current = watch("region_ids") || [];
                            if (checked) {
                              setValue("region_ids", [...current, region.id]);
                            } else {
                              setValue("region_ids", current.filter(id => id !== region.id));
                            }
                          }}
                        />
                        <Label htmlFor={`region-${region.id}`} className="text-sm font-normal">
                          {region.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Sezon działania</Label>
                  <div className="space-y-2 mt-2">
                    {categories.seasons.map((season: any) => (
                      <div key={season.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`season-${season.id}`}
                          checked={watch("season_ids")?.includes(season.id) || false}
                          onCheckedChange={(checked) => {
                            const current = watch("season_ids") || [];
                            if (checked) {
                              setValue("season_ids", [...current, season.id]);
                            } else {
                              setValue("season_ids", current.filter(id => id !== season.id));
                            }
                          }}
                        />
                        <Label htmlFor={`season-${season.id}`} className="text-sm font-normal">
                          {season.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Dostępność</Label>
                  <div className="space-y-2 mt-2">
                    {categories.availabilityTypes.map((type: any) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`availability-${type.id}`}
                          checked={watch("availability_type_ids")?.includes(type.id) || false}
                          onCheckedChange={(checked) => {
                            const current = watch("availability_type_ids") || [];
                            if (checked) {
                              setValue("availability_type_ids", [...current, type.id]);
                            } else {
                              setValue("availability_type_ids", current.filter(id => id !== type.id));
                            }
                          }}
                        />
                        <Label htmlFor={`availability-${type.id}`} className="text-sm font-normal">
                          {type.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zakwaterowanie</CardTitle>
              <CardDescription>Rodzaje dostępnego zakwaterowania</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {accommodationFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Typ zakwaterowania</Label>
                    <Select
                      onValueChange={(value) => 
                        setValue(`accommodation_type_details.${index}.type_id`, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.accommodationTypes.map((type: any) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-32">
                    <Label>Pojemność</Label>
                    <Input
                      type="number"
                      {...register(`accommodation_type_details.${index}.capacity`, { valueAsNumber: true })}
                      placeholder="Ilość miejsc"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAccommodation(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendAccommodation({ type_id: "", capacity: undefined })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Dodaj typ zakwaterowania
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transport i dostępność</CardTitle>
              <CardDescription>Informacje o dostępie komunikacyjnym</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {transportFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Typ transportu</Label>
                    <Select
                      onValueChange={(value) => 
                        setValue(`transport_accessibility_details.${index}.type_id`, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz typ" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.transportAccessibility.map((type: any) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-32">
                    <Label>Odległość (km)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register(`transport_accessibility_details.${index}.distance_km`, { valueAsNumber: true })}
                      placeholder="Odległość"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeTransport(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendTransport({ type_id: "", distance_km: undefined })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Dodaj informację o transporcie
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wyposażenie</CardTitle>
              <CardDescription>Dostępne wyposażenie i udogodnienia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.equipmentTypes.map((equipment: any) => (
                  <div key={equipment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`equipment-${equipment.id}`}
                      checked={watch("equipment_type_ids")?.includes(equipment.id) || false}
                      onCheckedChange={(checked) => {
                        const current = watch("equipment_type_ids") || [];
                        if (checked) {
                          setValue("equipment_type_ids", [...current, equipment.id]);
                        } else {
                          setValue("equipment_type_ids", current.filter(id => id !== equipment.id));
                        }
                      }}
                    />
                    <Label htmlFor={`equipment-${equipment.id}`} className="text-sm font-normal">
                      {equipment.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dodatkowe funkcje</CardTitle>
              <CardDescription>Specjalne udogodnienia i możliwości</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessibility_disabled"
                  {...register("accessibility_disabled")}
                />
                <Label htmlFor="accessibility_disabled">
                  Dostępność dla osób z niepełnosprawnościami
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="equipment_rental"
                  {...register("equipment_rental")}
                />
                <Label htmlFor="equipment_rental">
                  Możliwość wynajmu sprzętu
                </Label>
              </div>

              <div>
                <Label htmlFor="sports_infrastructure">Infrastruktura sportowa</Label>
                <Textarea
                  id="sports_infrastructure"
                  {...register("sports_infrastructure")}
                  placeholder="Opis dostępnej infrastruktury sportowej"
                />
              </div>

              <div>
                <Label htmlFor="nearest_transport_info">Najbliższy transport publiczny</Label>
                <Textarea
                  id="nearest_transport_info"
                  {...register("nearest_transport_info")}
                  placeholder="Informacje o dostępie komunikacji publicznej"
                />
              </div>

              <div>
                <Label htmlFor="nearby_attractions">Atrakcje w okolicy</Label>
                <Textarea
                  id="nearby_attractions"
                  {...register("nearby_attractions")}
                  placeholder="Maksymalnie 300 znaków"
                  maxLength={300}
                />
                {errors.nearby_attractions && <p className="text-sm text-red-500 mt-1">{errors.nearby_attractions.message}</p>}
              </div>

              <div>
                <Label htmlFor="additional_notes">Uwagi dodatkowe</Label>
                <Textarea
                  id="additional_notes"
                  {...register("additional_notes")}
                  placeholder="Dodatkowe informacje"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sezon i cennik</CardTitle>
              <CardDescription>Informacje o sezonie działania i cenach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="season_start">Początek sezonu</Label>
                  <Input
                    id="season_start"
                    type="date"
                    {...register("season_start")}
                  />
                </div>

                <div>
                  <Label htmlFor="season_end">Koniec sezonu</Label>
                  <Input
                    id="season_end"
                    type="date"
                    {...register("season_end")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pricing_description">Opis cennika</Label>
                <Textarea
                  id="pricing_description"
                  {...register("pricing_description")}
                  placeholder="Krótki opis cen i warunków"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Linki do profili społecznościowych</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  {...register("facebook")}
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  {...register("instagram")}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  type="url"
                  {...register("youtube")}
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <Label htmlFor="promotional_video_url">Film promocyjny</Label>
                <Input
                  id="promotional_video_url"
                  type="url"
                  {...register("promotional_video_url")}
                  placeholder="Link do YouTube lub Vimeo"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Galeria zdjęć</CardTitle>
              <CardDescription>Zdjęcia bazy (minimum 5)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Funkcja uploadu zdjęć zostanie dodana w następnej iteracji
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default ScoutBaseForm;