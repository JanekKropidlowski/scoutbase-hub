import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Base = Database['public']['Tables']['bases']['Row'];
type BaseInsert = Database['public']['Tables']['bases']['Insert'];
type BaseUpdate = Database['public']['Tables']['bases']['Update'];

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

type Reservation = Database['public']['Tables']['reservations']['Row'];
type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];
type ReservationUpdate = Database['public']['Tables']['reservations']['Update'];

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update'];

export class CMSService {
  // Base Management
  async getBases(filters?: {
    featured?: boolean;
    location?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('bases')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], count: count || 0 };
  }

  async getBase(id: string) {
    const { data, error } = await supabase
      .from('bases')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createBase(baseData: BaseInsert) {
    const { data, error } = await supabase
      .from('bases')
      .insert(baseData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateBase(id: string, updates: BaseUpdate) {
    const { data, error } = await supabase
      .from('bases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteBase(id: string) {
    const { error } = await supabase
      .from('bases')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Review Management
  async getReviews(baseId?: string, userId?: string) {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        user_profiles!inner(full_name, avatar_url),
        bases!inner(name)
      `)
      .order('created_at', { ascending: false });

    if (baseId) {
      query = query.eq('base_id', baseId);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  }

  async createReview(reviewData: ReviewInsert) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateReview(id: string, updates: ReviewUpdate) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteReview(id: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Reservation Management
  async getReservations(filters?: {
    baseId?: string;
    userId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    let query = supabase
      .from('reservations')
      .select(`
        *,
        user_profiles!inner(full_name, email),
        bases!inner(name, location)
      `)
      .order('created_at', { ascending: false });

    if (filters?.baseId) {
      query = query.eq('base_id', filters.baseId);
    }

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.startDate) {
      query = query.gte('start_date', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('end_date', filters.endDate);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  }

  async createReservation(reservationData: ReservationInsert) {
    const { data, error } = await supabase
      .from('reservations')
      .insert(reservationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateReservation(id: string, updates: ReservationUpdate) {
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteReservation(id: string) {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // User Management
  async getUsers(filters?: {
    role?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }

    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], count: count || 0 };
  }

  async getUser(id: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(id: string, updates: UserProfileUpdate) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteUser(id: string) {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // Statistics
  async getStatistics() {
    const [
      basesCount,
      usersCount,
      reviewsCount,
      reservationsCount,
      featuredBasesCount
    ] = await Promise.all([
      this.getBases().then(result => result.count),
      this.getUsers().then(result => result.count),
      this.getReviews().then(result => result.length),
      this.getReservations().then(result => result.length),
      this.getBases({ featured: true }).then(result => result.count)
    ]);

    return {
      basesCount,
      usersCount,
      reviewsCount,
      reservationsCount,
      featuredBasesCount,
    };
  }

  // Dashboard data
  async getDashboardData() {
    const [
      recentBases,
      recentReviews,
      recentReservations,
      topRatedBases
    ] = await Promise.all([
      this.getBases({ limit: 5 }),
      this.getReviews().then(reviews => reviews.slice(0, 5)),
      this.getReservations({ status: 'pending' }).then(reservations => reservations.slice(0, 5)),
      supabase
        .from('bases')
        .select('*')
        .order('rating', { ascending: false })
        .limit(5)
        .then(result => result.data || [])
    ]);

    return {
      recentBases: recentBases.data,
      recentReviews,
      recentReservations,
      topRatedBases,
    };
  }
}

export const cmsService = new CMSService();
export default cmsService;