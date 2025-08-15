import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  role: 'user' | 'moderator' | 'admin';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  email?: string;
}

export function useUsers(filters?: {
  role?: string;
  search?: string;
  is_verified?: boolean;
}) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: async () => {
      // Najpierw pobierz profile
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.role) {
        query = query.eq('role', filters.role);
      }

      if (filters?.is_verified !== undefined) {
        query = query.eq('is_verified', filters.is_verified);
      }

      const { data: profiles, error } = await query;

      if (error) {
        throw error;
      }

      // Pobierz emaile z auth.users dla każdego profilu
      const profilesWithEmails = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: { user } } = await supabase.auth.admin.getUserById(profile.id);
          return {
            ...profile,
            email: user?.email,
          };
        }).filter(async (promise) => {
          try {
            const result = await promise;
            if (filters?.search) {
              const searchLower = filters.search.toLowerCase();
              return (
                result.full_name?.toLowerCase().includes(searchLower) ||
                result.email?.toLowerCase().includes(searchLower)
              );
            }
            return true;
          } catch {
            return false;
          }
        })
      );

      return profilesWithEmails;
    },
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) {
        throw profileError;
      }

      // Pobierz email z auth.users
      const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(id);
      
      if (authError) {
        console.error('Error fetching auth user:', authError);
      }

      return {
        ...profile,
        email: user?.email,
      };
    },
    enabled: !!id,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: UserProfile['role'] }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
      toast.success('Rola użytkownika została zmieniona');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas zmiany roli');
    },
  });
}

export function useUpdateUserVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_verified }: { id: string; is_verified: boolean }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_verified })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
      toast.success(data.is_verified ? 'Użytkownik został zweryfikowany' : 'Weryfikacja użytkownika została cofnięta');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas zmiany weryfikacji');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Usuń profil (kaskadowo usunie też dane z auth.users)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Użytkownik został usunięty');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Błąd podczas usuwania użytkownika');
    },
  });
}

export function useUserStatistics() {
  return useQuery({
    queryKey: ['user-statistics'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('role, is_verified, created_at');

      if (error) {
        throw error;
      }

      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const stats = {
        total: profiles.length,
        byRole: {
          admin: profiles.filter(p => p.role === 'admin').length,
          moderator: profiles.filter(p => p.role === 'moderator').length,
          user: profiles.filter(p => p.role === 'user').length,
        },
        verified: profiles.filter(p => p.is_verified).length,
        unverified: profiles.filter(p => !p.is_verified).length,
        newLastMonth: profiles.filter(p => new Date(p.created_at) >= lastMonth).length,
        newLastWeek: profiles.filter(p => new Date(p.created_at) >= lastWeek).length,
      };

      return stats;
    },
  });
}