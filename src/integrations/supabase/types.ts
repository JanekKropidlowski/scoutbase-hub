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
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
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
          amenities: string[] | null
          contact_email: string | null
          contact_phone: string | null
          website: string | null
          status: string
          owner_id: string | null
          created_at: string
          updated_at: string
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
          amenities?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          status?: string
          owner_id?: string | null
          created_at?: string
          updated_at?: string
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
          amenities?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          status?: string
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cms_pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: Json
          meta_title: string | null
          meta_description: string | null
          status: string
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: Json
          meta_title?: string | null
          meta_description?: string | null
          status?: string
          author_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: Json
          meta_title?: string | null
          meta_description?: string | null
          status?: string
          author_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          original_name: string
          mime_type: string
          size_bytes: number
          url: string
          alt_text: string | null
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_name: string
          mime_type: string
          size_bytes: number
          url: string
          alt_text?: string | null
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_name?: string
          mime_type?: string
          size_bytes?: number
          url?: string
          alt_text?: string | null
          uploaded_by?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
          scout_group: string | null
          phone: string | null
          bio: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          scout_group?: string | null
          phone?: string | null
          bio?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          scout_group?: string | null
          phone?: string | null
          bio?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          base_id: string
          user_id: string
          rating: number
          title: string | null
          content: string
          images: string[] | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          base_id: string
          user_id: string
          rating: number
          title?: string | null
          content: string
          images?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          base_id?: string
          user_id?: string
          rating?: number
          title?: string | null
          content?: string
          images?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          theme: string
          language: string
          email_notifications: boolean
          push_notifications: boolean
          marketing_emails: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: string
          language?: string
          email_notifications?: boolean
          push_notifications?: boolean
          marketing_emails?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: string
          language?: string
          email_notifications?: boolean
          push_notifications?: boolean
          marketing_emails?: boolean
          created_at?: string
          updated_at?: string
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

// Type helpers for easier use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Base = Database['public']['Tables']['bases']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type CmsPage = Database['public']['Tables']['cms_pages']['Row']
export type Media = Database['public']['Tables']['media']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type UserPreferences = Database['public']['Tables']['user_preferences']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

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
