import { supabase } from "@/integrations/supabase/client";

export const seedCategoryData = async () => {
  try {
    // Base Types
    const baseTypes = [
      { name: "Baza stała", slug: "baza-stala", description: "Baza z stałymi budynkami i infrastrukturą" },
      { name: "Baza namiotowa", slug: "baza-namiotowa", description: "Teren z możliwością rozbicia namiotów" },
      { name: "Ośrodek szkoleniowy", slug: "osrodek-szkoleniowy", description: "Ośrodek z zapleczem szkoleniowym" },
      { name: "Schronisko", slug: "schronisko", description: "Schronisko turystyczne" },
    ];

    // Regions (przykładowe województwa)
    const regions = [
      { name: "Mazowieckie", slug: "mazowieckie", type: "wojewodztwo" as const, parent_id: null },
      { name: "Warmińsko-mazurskie", slug: "warminsko-mazurskie", type: "wojewodztwo" as const, parent_id: null },
      { name: "Pomorskie", slug: "pomorskie", type: "wojewodztwo" as const, parent_id: null },
      { name: "Małopolskie", slug: "malopolskie", type: "wojewodztwo" as const, parent_id: null },
      { name: "Dolnośląskie", slug: "dolnoslaskie", type: "wojewodztwo" as const, parent_id: null },
      { name: "Podkarpackie", slug: "podkarpackie", type: "wojewodztwo" as const, parent_id: null },
    ];

    // Seasons
    const seasons = [
      { name: "Całoroczny", slug: "caloroczny", description: "Dostępny przez cały rok" },
      { name: "Letni", slug: "letni", description: "Dostępny w sezonie letnim" },
      { name: "Zimowy", slug: "zimowy", description: "Dostępny w sezonie zimowym" },
    ];

    // Accommodation Types
    const accommodationTypes = [
      { name: "Namioty", slug: "namioty", description: "Pole namiotowe" },
      { name: "Domki", slug: "domki", description: "Domki kempingowe lub letniskowe" },
      { name: "Budynek", slug: "budynek", description: "Zakwaterowanie w budynku" },
      { name: "Inne", slug: "inne", description: "Inne formy zakwaterowania" },
    ];

    // Availability Types
    const availabilityTypes = [
      { name: "Grupy harcerskie", slug: "grupy-harcerskie", description: "Dedykowane dla grup harcerskich" },
      { name: "Rodziny", slug: "rodziny", description: "Dostępne dla rodzin" },
      { name: "Szkoły", slug: "szkoly", description: "Dostępne dla grup szkolnych" },
      { name: "Firmy", slug: "firmy", description: "Dostępne dla firm i grup corporate" },
    ];

    // Equipment Types
    const equipmentTypes = [
      { name: "Prysznice", slug: "prysznice", description: "Dostępne prysznice" },
      { name: "Kuchnia", slug: "kuchnia", description: "Zaplecze kuchenne" },
      { name: "Świetlica", slug: "swietlica", description: "Pomieszczenie świetlicowe" },
      { name: "Boisko", slug: "boisko", description: "Boisko sportowe" },
      { name: "Ognisko", slug: "ognisko", description: "Miejsce na ognisko" },
      { name: "Sprzęt pionierski", slug: "sprzet-pionierski", description: "Dostępny sprzęt pionierski" },
      { name: "WiFi", slug: "wifi", description: "Bezprzewodowy internet" },
    ];

    // Transport Accessibility
    const transportAccessibility = [
      { name: "Blisko PKP", slug: "blisko-pkp", description: "W pobliżu stacji kolejowej" },
      { name: "Blisko PKS", slug: "blisko-pks", description: "W pobliżu przystanku autobusowego" },
      { name: "Przy drodze głównej", slug: "przy-drodze-glownej", description: "Przy głównej trasie komunikacyjnej" },
      { name: "Dojazd publiczny", slug: "dojazd-publiczny", description: "Dostępny komunikacją publiczną" },
    ];

    // Insert data
    await Promise.all([
      supabase.from('base_types').upsert(baseTypes, { onConflict: 'slug' }),
      supabase.from('regions').upsert(regions, { onConflict: 'slug' }),
      supabase.from('seasons').upsert(seasons, { onConflict: 'slug' }),
      supabase.from('accommodation_types').upsert(accommodationTypes, { onConflict: 'slug' }),
      supabase.from('availability_types').upsert(availabilityTypes, { onConflict: 'slug' }),
      supabase.from('equipment_types').upsert(equipmentTypes, { onConflict: 'slug' }),
      supabase.from('transport_accessibility').upsert(transportAccessibility, { onConflict: 'slug' }),
    ]);

    console.log('Kategorie zostały dodane do bazy danych');
  } catch (error) {
    console.error('Błąd podczas dodawania kategorii:', error);
    throw error;
  }
};

export const createSampleScoutBase = async () => {
  try {
    const sampleBase = {
      name: "Przykładowa Stanica Harcerska",
      short_description: "Przykładowa stanica położona nad jeziorem w malowniczej okolicy, idealna na obozy harcerskie i wyjazdy szkoleniowe.",
      long_description: "Nasza stanica harcerska to miejsce o wyjątkowym charakterze, położone nad brzegiem czystego jeziora w otoczeniu sosnowego lasu. Oferujemy kompleksowe zaplecze dla grup harcerskich, szkół i rodzin. Dysponujemy nowoczesnymi budynkami mieszkalnymi, w pełni wyposażoną kuchnią, świetlicą oraz licznymi atrakcjami sportowymi i rekreacyjnymi.",
      address_street: "Leśna",
      address_number: "15",
      address_city: "Giżycko",
      address_postal_code: "11-500",
      gps_latitude: 54.0333,
      gps_longitude: 21.7667,
      capacity_total: 120,
      contact_phone: "+48 87 428 20 00",
      contact_email: "kontakt@przykaldowa-stanica.pl",
      website: "https://przykaldowa-stanica.pl",
      google_maps_link: "https://maps.google.com/example",
      facebook: "https://facebook.com/przykladowa-stanica",
      instagram: "https://instagram.com/przykladowa_stanica",
      accessibility_disabled: true,
      sports_infrastructure: "Boisko do piłki nożnej, siatkówki i koszykówki, kort tenisowy, miejsce na ognisko",
      nearest_transport_info: "Stacja PKP Giżycko - 2 km, przystanek autobusowy - 500m",
      equipment_rental: true,
      nearby_attractions: "Kanał Łuczański, Twierdza Boyen, ścieżka rowerowa wokół jeziora, port jachtowy",
      additional_notes: "Prowadzimy także kursy żeglarskie i kajakowe. Możliwość organizacji ognisk i biwaków.",
      status: 'published' as const,
    };

    const { data: base, error } = await supabase
      .from('scout_bases')
      .insert(sampleBase)
      .select()
      .single();

    if (error) throw error;

    console.log('Przykładowa baza została utworzona:', base);
    return base;
  } catch (error) {
    console.error('Błąd podczas tworzenia przykładowej bazy:', error);
    throw error;
  }
};