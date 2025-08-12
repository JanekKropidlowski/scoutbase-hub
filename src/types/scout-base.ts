import type { Tables } from "@/integrations/supabase/types";

// Main scout base type
export type ScoutBase = Tables<"scout_bases">;

// Category types
export type BaseType = Tables<"base_types">;
export type Region = Tables<"regions">;
export type Season = Tables<"seasons">;
export type AccommodationType = Tables<"accommodation_types">;
export type AvailabilityType = Tables<"availability_types">;
export type EquipmentType = Tables<"equipment_types">;
export type TransportAccessibility = Tables<"transport_accessibility">;

// Junction types with additional data
export type BaseAccommodationDetails = Tables<"base_accommodation_types">;
export type BaseTransportDetails = Tables<"base_transport_accessibility">;

// Media types
export type BaseImage = Tables<"base_images">;
export type BaseFile = Tables<"base_files">;

// Extended types for display
export interface ScoutBaseWithDetails extends ScoutBase {
  base_types?: BaseType[];
  regions?: Region[];
  seasons?: Season[];
  accommodation_types?: BaseAccommodationDetails[];
  availability_types?: AvailabilityType[];
  equipment_types?: EquipmentType[];
  transport_accessibility?: BaseTransportDetails[];
  images?: BaseImage[];
  files?: BaseFile[];
}

// Form data types
export interface ScoutBaseFormData {
  // Basic info
  name: string;
  short_description: string;
  long_description?: string;
  
  // Address
  address_street: string;
  address_number?: string;
  address_city: string;
  address_postal_code: string;
  gps_latitude: number;
  gps_longitude: number;
  
  // Capacity and contact
  capacity_total: number;
  contact_phone: string;
  contact_email: string;
  website?: string;
  google_maps_link?: string;
  
  // Social media
  facebook?: string;
  instagram?: string;
  youtube?: string;
  
  // Season and pricing
  season_start?: string;
  season_end?: string;
  pricing_file_url?: string;
  pricing_description?: string;
  
  // Additional features
  accessibility_disabled: boolean;
  sports_infrastructure?: string;
  nearest_transport_info?: string;
  equipment_rental: boolean;
  nearby_attractions?: string;
  additional_notes?: string;
  promotional_video_url?: string;
  
  // Categories (IDs)
  base_type_ids: string[];
  region_ids: string[];
  season_ids: string[];
  accommodation_type_details: { type_id: string; capacity?: number }[];
  availability_type_ids: string[];
  equipment_type_ids: string[];
  transport_accessibility_details: { type_id: string; distance_km?: number }[];
  
  // Status
  status: 'draft' | 'published' | 'archived';
}

// Filter types
export interface ScoutBaseFilters {
  search?: string;
  base_type_ids?: string[];
  region_ids?: string[];
  season_ids?: string[];
  accommodation_type_ids?: string[];
  availability_type_ids?: string[];
  equipment_type_ids?: string[];
  transport_accessibility_ids?: string[];
  min_capacity?: number;
  max_capacity?: number;
  has_accessibility?: boolean;
  has_equipment_rental?: boolean;
  status?: string;
}