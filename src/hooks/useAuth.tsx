import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
  isModerator: boolean;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error in refreshProfile:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        toast({
          title: "Zalogowano pomyślnie",
          description: "Witaj z powrotem!",
        });
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        toast({
          title: "Wylogowano",
          description: "Do zobaczenia!",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  useEffect(() => {
    if (user) {
      refreshProfile();
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Błąd logowania",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Błąd logowania",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast({
          title: "Błąd rejestracji",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Rejestracja udana",
          description: "Sprawdź swoją skrzynkę email i potwierdź konto",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Błąd rejestracji",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Błąd wylogowania",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Błąd resetowania hasła",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Link resetowania wysłany",
          description: "Sprawdź swoją skrzynkę email",
        });
      }

      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Błąd resetowania hasła",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: new Error('Użytkownik nie jest zalogowany') };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Błąd aktualizacji profilu",
          description: error.message,
          variant: "destructive",
        });
        return { error: new Error(error.message) };
      }

      await refreshProfile();
      toast({
        title: "Profil zaktualizowany",
        description: "Zmiany zostały zapisane",
      });

      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Nieoczekiwany błąd';
      toast({
        title: "Błąd aktualizacji profilu",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: new Error(errorMessage) };
    }
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!profile) return false;
    
    if (Array.isArray(role)) {
      return role.includes(profile.role);
    }
    
    return profile.role === role;
  };

  const isAdmin = hasRole('admin');
  const isModerator = hasRole(['admin', 'moderator']);

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile,
    isAdmin,
    isModerator,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}