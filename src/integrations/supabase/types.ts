export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      scout_bases: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          short_description: string
          long_description: string | null
          address_street: string
          address_number: string | null
          address_city: string
          address_postal_code: string
          gps_latitude: number
          gps_longitude: number
          capacity_total: number
          contact_phone: string
          contact_email: string
          website: string | null
          google_maps_link: string | null
          facebook: string | null
          instagram: string | null
          youtube: string | null
          season_start: string | null
          season_end: string | null
          pricing_file_url: string | null
          pricing_description: string | null
          accessibility_disabled: boolean
          sports_infrastructure: string | null
          nearest_transport_info: string | null
          equipment_rental: boolean
          nearby_attractions: string | null
          additional_notes: string | null
          promotional_video_url: string | null
          status: 'draft' | 'published' | 'archived'
          owner_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          short_description: string
          long_description?: string | null
          address_street: string
          address_number?: string | null
          address_city: string
          address_postal_code: string
          gps_latitude: number
          gps_longitude: number
          capacity_total: number
          contact_phone: string
          contact_email: string
          website?: string | null
          google_maps_link?: string | null
          facebook?: string | null
          instagram?: string | null
          youtube?: string | null
          season_start?: string | null
          season_end?: string | null
          pricing_file_url?: string | null
          pricing_description?: string | null
          accessibility_disabled?: boolean
          sports_infrastructure?: string | null
          nearest_transport_info?: string | null
          equipment_rental?: boolean
          nearby_attractions?: string | null
          additional_notes?: string | null
          promotional_video_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          owner_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          short_description?: string
          long_description?: string | null
          address_street?: string
          address_number?: string | null
          address_city?: string
          address_postal_code?: string
          gps_latitude?: number
          gps_longitude?: number
          capacity_total?: number
          contact_phone?: string
          contact_email?: string
          website?: string | null
          google_maps_link?: string | null
          facebook?: string | null
          instagram?: string | null
          youtube?: string | null
          season_start?: string | null
          season_end?: string | null
          pricing_file_url?: string | null
          pricing_description?: string | null
          accessibility_disabled?: boolean
          sports_infrastructure?: string | null
          nearest_transport_info?: string | null
          equipment_rental?: boolean
          nearby_attractions?: string | null
          additional_notes?: string | null
          promotional_video_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          owner_id?: string | null
        }
        Relationships: []
      }
      base_types: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          id: string
          name: string
          slug: string
          type: 'wojewodztwo' | 'powiat' | 'gmina'
          parent_id: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          type: 'wojewodztwo' | 'powiat' | 'gmina'
          parent_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          type?: 'wojewodztwo' | 'powiat' | 'gmina'
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
      }
      seasons: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
        Relationships: []
      }
      accommodation_types: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
        Relationships: []
      }
      availability_types: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
        Relationships: []
      }
      equipment_types: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
        Relationships: []
      }
      transport_accessibility: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
        Relationships: []
      }
      base_base_types: {
        Row: {
          base_id: string
          base_type_id: string
        }
        Insert: {
          base_id: string
          base_type_id: string
        }
        Update: {
          base_id?: string
          base_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_base_types_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_base_types_base_type_id_fkey"
            columns: ["base_type_id"]
            isOneToOne: false
            referencedRelation: "base_types"
            referencedColumns: ["id"]
          }
        ]
      }
      base_regions: {
        Row: {
          base_id: string
          region_id: string
        }
        Insert: {
          base_id: string
          region_id: string
        }
        Update: {
          base_id?: string
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_regions_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_regions_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
      }
      base_seasons: {
        Row: {
          base_id: string
          season_id: string
        }
        Insert: {
          base_id: string
          season_id: string
        }
        Update: {
          base_id?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_seasons_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_seasons_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          }
        ]
      }
      base_accommodation_types: {
        Row: {
          base_id: string
          accommodation_type_id: string
          capacity: number | null
        }
        Insert: {
          base_id: string
          accommodation_type_id: string
          capacity?: number | null
        }
        Update: {
          base_id?: string
          accommodation_type_id?: string
          capacity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "base_accommodation_types_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_accommodation_types_accommodation_type_id_fkey"
            columns: ["accommodation_type_id"]
            isOneToOne: false
            referencedRelation: "accommodation_types"
            referencedColumns: ["id"]
          }
        ]
      }
      base_availability_types: {
        Row: {
          base_id: string
          availability_type_id: string
        }
        Insert: {
          base_id: string
          availability_type_id: string
        }
        Update: {
          base_id?: string
          availability_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_availability_types_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_availability_types_availability_type_id_fkey"
            columns: ["availability_type_id"]
            isOneToOne: false
            referencedRelation: "availability_types"
            referencedColumns: ["id"]
          }
        ]
      }
      base_equipment: {
        Row: {
          base_id: string
          equipment_type_id: string
        }
        Insert: {
          base_id: string
          equipment_type_id: string
        }
        Update: {
          base_id?: string
          equipment_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_equipment_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_equipment_equipment_type_id_fkey"
            columns: ["equipment_type_id"]
            isOneToOne: false
            referencedRelation: "equipment_types"
            referencedColumns: ["id"]
          }
        ]
      }
      base_transport_accessibility: {
        Row: {
          base_id: string
          transport_accessibility_id: string
          distance_km: number | null
        }
        Insert: {
          base_id: string
          transport_accessibility_id: string
          distance_km?: number | null
        }
        Update: {
          base_id?: string
          transport_accessibility_id?: string
          distance_km?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "base_transport_accessibility_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_transport_accessibility_transport_accessibility_id_fkey"
            columns: ["transport_accessibility_id"]
            isOneToOne: false
            referencedRelation: "transport_accessibility"
            referencedColumns: ["id"]
          }
        ]
      }
      base_images: {
        Row: {
          id: string
          base_id: string
          url: string
          alt_text: string | null
          is_primary: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          base_id: string
          url: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          base_id?: string
          url?: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "base_images_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          }
        ]
      }
      base_files: {
        Row: {
          id: string
          base_id: string
          file_name: string
          file_url: string
          file_type: 'regulation' | 'participant_card' | 'offer_pdf' | 'pricing' | 'other'
          file_size: number | null
        }
        Insert: {
          id?: string
          base_id: string
          file_name: string
          file_url: string
          file_type: 'regulation' | 'participant_card' | 'offer_pdf' | 'pricing' | 'other'
          file_size?: number | null
        }
        Update: {
          id?: string
          base_id?: string
          file_name?: string
          file_url?: string
          file_type?: 'regulation' | 'participant_card' | 'offer_pdf' | 'pricing' | 'other'
          file_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "base_files_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "scout_bases"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
