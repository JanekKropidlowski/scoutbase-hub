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
      bases: {
        Row: {
          id: string
          name: string
          location: string
          image: string | null
          rating: number
          price: string | null
          capacity: number | null
          description: string | null
          featured: boolean
          created_at: string
          owner_id: string | null
          contact_email: string | null
          contact_phone: string | null
          amenities: string[] | null
          coordinates: { lat: number; lng: number } | null
        }
        Insert: {
          id?: string
          name: string
          location: string
          image?: string | null
          rating?: number
          price?: string | null
          capacity?: number | null
          description?: string | null
          featured?: boolean
          created_at?: string
          owner_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          amenities?: string[] | null
          coordinates?: { lat: number; lng: number } | null
        }
        Update: {
          id?: string
          name?: string
          location?: string
          image?: string | null
          rating?: number
          price?: string | null
          capacity?: number | null
          description?: string | null
          featured?: boolean
          created_at?: string
          owner_id?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          amenities?: string[] | null
          coordinates?: { lat: number; lng: number } | null
        }
      }
      reviews: {
        Row: {
          id: string
          base_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          base_id: string
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          base_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          base_id: string
          user_id: string
          start_date: string
          end_date: string
          guests_count: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          created_at: string
          updated_at: string
          special_requests: string | null
        }
        Insert: {
          id?: string
          base_id: string
          user_id: string
          start_date: string
          end_date: string
          guests_count: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          created_at?: string
          updated_at?: string
          special_requests?: string | null
        }
        Update: {
          id?: string
          base_id?: string
          user_id?: string
          start_date?: string
          end_date?: string
          guests_count?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price?: number
          created_at?: string
          updated_at?: string
          special_requests?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          organization: string | null
          role: 'user' | 'admin' | 'moderator'
          created_at: string
          updated_at: string
          preferences: Json | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          organization?: string | null
          role?: 'user' | 'admin' | 'moderator'
          created_at?: string
          updated_at?: string
          preferences?: Json | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          organization?: string | null
          role?: 'user' | 'admin' | 'moderator'
          created_at?: string
          updated_at?: string
          preferences?: Json | null
        }
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
