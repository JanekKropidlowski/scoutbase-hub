import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Base {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  owner_id: string;
  address: string;
  city: string;
  postal_code: string;
  voivodeship: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  facebook_url: string;
  instagram_url: string;
  capacity: number;
  price_per_night: number;
  price_per_person: number;
  amenities: string[];
  activities: string[];
  rules: string[];
  main_image: string;
  images: string[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export function useBases(filters?: {
  status?: string;
  owner_id?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['bases', filters],
    queryFn: async () => {
      let query = supabase
        .from('bases')
        .select(`
          *,
          owner:profiles(id, full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.owner_id) {
        query = query.eq('owner_id', filters.owner_id);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,city.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data;
    },
  });
}

export function useBase(id: string) {
  return useQuery({
    queryKey: ['base', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bases')
        .select(`
          *,
          owner:profiles(id, full_name, avatar_url),
          reviews(
            id,
            rating,
            title,
            content,
            created_at,
            user:profiles(id, full_name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });
}

export function useCreateBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (base: Partial<Base>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Musisz być zalogowany');
      }

      const slug = base.name?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const { data, error } = await supabase
        .from('bases')
        .insert({
          ...base,
          slug,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bases'] });
      toast.success('Baza została dodana pomyślnie');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas dodawania bazy');
    },
  });
}

export function useUpdateBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Base> & { id: string }) => {
      const { data, error } = await supabase
        .from('bases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bases'] });
      queryClient.invalidateQueries({ queryKey: ['base', data.id] });
      toast.success('Baza została zaktualizowana');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas aktualizacji bazy');
    },
  });
}

export function useDeleteBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bases')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bases'] });
      toast.success('Baza została usunięta');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas usuwania bazy');
    },
  });
}

export function useUpdateBaseStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Base['status'] }) => {
      const updates: any = { status };
      
      if (status === 'approved') {
        updates.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('bases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bases'] });
      queryClient.invalidateQueries({ queryKey: ['base', data.id] });
      toast.success('Status bazy został zmieniony');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas zmiany statusu');
    },
  });
}