import { supabase } from "@/integrations/supabase/client";
import type { 
  ScoutBase, 
  ScoutBaseWithDetails, 
  ScoutBaseFormData, 
  ScoutBaseFilters,
  BaseType,
  Region,
  Season,
  AccommodationType,
  AvailabilityType,
  EquipmentType,
  TransportAccessibility
} from "@/types/scout-base";

export class ScoutBaseService {
  // Fetch all scout bases with optional filters
  static async getScoutBases(filters?: ScoutBaseFilters): Promise<ScoutBaseWithDetails[]> {
    let query = supabase
      .from('scout_bases')
      .select(`
        *,
        base_types:base_base_types(base_types(*)),
        regions:base_regions(regions(*)),
        seasons:base_seasons(seasons(*)),
        accommodation_types:base_accommodation_types(accommodation_types(*), capacity),
        availability_types:base_availability_types(availability_types(*)),
        equipment_types:base_equipment(equipment_types(*)),
        transport_accessibility:base_transport_accessibility(transport_accessibility(*), distance_km),
        images:base_images(*),
        files:base_files(*)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%,address_city.ilike.%${filters.search}%`);
    }

    if (filters?.min_capacity) {
      query = query.gte('capacity_total', filters.min_capacity);
    }

    if (filters?.max_capacity) {
      query = query.lte('capacity_total', filters.max_capacity);
    }

    if (filters?.has_accessibility !== undefined) {
      query = query.eq('accessibility_disabled', filters.has_accessibility);
    }

    if (filters?.has_equipment_rental !== undefined) {
      query = query.eq('equipment_rental', filters.has_equipment_rental);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch scout bases: ${error.message}`);
    }

    return data as ScoutBaseWithDetails[];
  }

  // Get a single scout base by ID
  static async getScoutBase(id: string): Promise<ScoutBaseWithDetails | null> {
    const { data, error } = await supabase
      .from('scout_bases')
      .select(`
        *,
        base_types:base_base_types(base_types(*)),
        regions:base_regions(regions(*)),
        seasons:base_seasons(seasons(*)),
        accommodation_types:base_accommodation_types(accommodation_types(*), capacity),
        availability_types:base_availability_types(availability_types(*)),
        equipment_types:base_equipment(equipment_types(*)),
        transport_accessibility:base_transport_accessibility(transport_accessibility(*), distance_km),
        images:base_images(*),
        files:base_files(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch scout base: ${error.message}`);
    }

    return data as ScoutBaseWithDetails;
  }

  // Create a new scout base
  static async createScoutBase(formData: ScoutBaseFormData): Promise<ScoutBase> {
    const { data, error } = await supabase
      .from('scout_bases')
      .insert({
        name: formData.name,
        short_description: formData.short_description,
        long_description: formData.long_description,
        address_street: formData.address_street,
        address_number: formData.address_number,
        address_city: formData.address_city,
        address_postal_code: formData.address_postal_code,
        gps_latitude: formData.gps_latitude,
        gps_longitude: formData.gps_longitude,
        capacity_total: formData.capacity_total,
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        website: formData.website,
        google_maps_link: formData.google_maps_link,
        facebook: formData.facebook,
        instagram: formData.instagram,
        youtube: formData.youtube,
        season_start: formData.season_start,
        season_end: formData.season_end,
        pricing_file_url: formData.pricing_file_url,
        pricing_description: formData.pricing_description,
        accessibility_disabled: formData.accessibility_disabled,
        sports_infrastructure: formData.sports_infrastructure,
        nearest_transport_info: formData.nearest_transport_info,
        equipment_rental: formData.equipment_rental,
        nearby_attractions: formData.nearby_attractions,
        additional_notes: formData.additional_notes,
        promotional_video_url: formData.promotional_video_url,
        status: formData.status,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create scout base: ${error.message}`);
    }

    // Create relationships
    await this.createBaseRelationships(data.id, formData);

    return data;
  }

  // Update an existing scout base
  static async updateScoutBase(id: string, formData: ScoutBaseFormData): Promise<ScoutBase> {
    const { data, error } = await supabase
      .from('scout_bases')
      .update({
        name: formData.name,
        short_description: formData.short_description,
        long_description: formData.long_description,
        address_street: formData.address_street,
        address_number: formData.address_number,
        address_city: formData.address_city,
        address_postal_code: formData.address_postal_code,
        gps_latitude: formData.gps_latitude,
        gps_longitude: formData.gps_longitude,
        capacity_total: formData.capacity_total,
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        website: formData.website,
        google_maps_link: formData.google_maps_link,
        facebook: formData.facebook,
        instagram: formData.instagram,
        youtube: formData.youtube,
        season_start: formData.season_start,
        season_end: formData.season_end,
        pricing_file_url: formData.pricing_file_url,
        pricing_description: formData.pricing_description,
        accessibility_disabled: formData.accessibility_disabled,
        sports_infrastructure: formData.sports_infrastructure,
        nearest_transport_info: formData.nearest_transport_info,
        equipment_rental: formData.equipment_rental,
        nearby_attractions: formData.nearby_attractions,
        additional_notes: formData.additional_notes,
        promotional_video_url: formData.promotional_video_url,
        status: formData.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update scout base: ${error.message}`);
    }

    // Delete existing relationships and create new ones
    await this.deleteBaseRelationships(id);
    await this.createBaseRelationships(id, formData);

    return data;
  }

  // Delete a scout base
  static async deleteScoutBase(id: string): Promise<void> {
    const { error } = await supabase
      .from('scout_bases')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete scout base: ${error.message}`);
    }
  }

  // Helper method to create base relationships
  private static async createBaseRelationships(baseId: string, formData: ScoutBaseFormData): Promise<void> {
    // Base types
    if (formData.base_type_ids.length > 0) {
      await supabase
        .from('base_base_types')
        .insert(formData.base_type_ids.map(typeId => ({ base_id: baseId, base_type_id: typeId })));
    }

    // Regions
    if (formData.region_ids.length > 0) {
      await supabase
        .from('base_regions')
        .insert(formData.region_ids.map(regionId => ({ base_id: baseId, region_id: regionId })));
    }

    // Seasons
    if (formData.season_ids.length > 0) {
      await supabase
        .from('base_seasons')
        .insert(formData.season_ids.map(seasonId => ({ base_id: baseId, season_id: seasonId })));
    }

    // Accommodation types
    if (formData.accommodation_type_details.length > 0) {
      await supabase
        .from('base_accommodation_types')
        .insert(formData.accommodation_type_details.map(detail => ({
          base_id: baseId,
          accommodation_type_id: detail.type_id,
          capacity: detail.capacity,
        })));
    }

    // Availability types
    if (formData.availability_type_ids.length > 0) {
      await supabase
        .from('base_availability_types')
        .insert(formData.availability_type_ids.map(typeId => ({ base_id: baseId, availability_type_id: typeId })));
    }

    // Equipment types
    if (formData.equipment_type_ids.length > 0) {
      await supabase
        .from('base_equipment')
        .insert(formData.equipment_type_ids.map(typeId => ({ base_id: baseId, equipment_type_id: typeId })));
    }

    // Transport accessibility
    if (formData.transport_accessibility_details.length > 0) {
      await supabase
        .from('base_transport_accessibility')
        .insert(formData.transport_accessibility_details.map(detail => ({
          base_id: baseId,
          transport_accessibility_id: detail.type_id,
          distance_km: detail.distance_km,
        })));
    }
  }

  // Helper method to delete existing base relationships
  private static async deleteBaseRelationships(baseId: string): Promise<void> {
    await Promise.all([
      supabase.from('base_base_types').delete().eq('base_id', baseId),
      supabase.from('base_regions').delete().eq('base_id', baseId),
      supabase.from('base_seasons').delete().eq('base_id', baseId),
      supabase.from('base_accommodation_types').delete().eq('base_id', baseId),
      supabase.from('base_availability_types').delete().eq('base_id', baseId),
      supabase.from('base_equipment').delete().eq('base_id', baseId),
      supabase.from('base_transport_accessibility').delete().eq('base_id', baseId),
    ]);
  }

  // Fetch all base types
  static async getBaseTypes(): Promise<BaseType[]> {
    const { data, error } = await supabase
      .from('base_types')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch base types: ${error.message}`);
    }

    return data;
  }

  // Fetch all regions
  static async getRegions(): Promise<Region[]> {
    const { data, error } = await supabase
      .from('regions')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch regions: ${error.message}`);
    }

    return data;
  }

  // Fetch all seasons
  static async getSeasons(): Promise<Season[]> {
    const { data, error } = await supabase
      .from('seasons')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch seasons: ${error.message}`);
    }

    return data;
  }

  // Fetch all accommodation types
  static async getAccommodationTypes(): Promise<AccommodationType[]> {
    const { data, error } = await supabase
      .from('accommodation_types')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch accommodation types: ${error.message}`);
    }

    return data;
  }

  // Fetch all availability types
  static async getAvailabilityTypes(): Promise<AvailabilityType[]> {
    const { data, error } = await supabase
      .from('availability_types')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch availability types: ${error.message}`);
    }

    return data;
  }

  // Fetch all equipment types
  static async getEquipmentTypes(): Promise<EquipmentType[]> {
    const { data, error } = await supabase
      .from('equipment_types')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch equipment types: ${error.message}`);
    }

    return data;
  }

  // Fetch all transport accessibility options
  static async getTransportAccessibility(): Promise<TransportAccessibility[]> {
    const { data, error } = await supabase
      .from('transport_accessibility')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch transport accessibility: ${error.message}`);
    }

    return data;
  }
}