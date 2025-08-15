import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { AuthUser, LoginCredentials, RegisterCredentials } from '@/services/auth';
import { useToast } from '@/components/ui/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const { user: authUser, error } = await authService.signIn(credentials);
      
      if (error) {
        toast({
          title: "Błąd logowania",
          description: error.message || "Wystąpił błąd podczas logowania",
          variant: "destructive",
        });
        return { success: false, error };
      }

      if (authUser) {
        setUser(authUser);
        toast({
          title: "Zalogowano pomyślnie",
          description: `Witaj, ${authUser.full_name || authUser.email}!`,
        });
        navigate('/');
        return { success: true, error: null };
      }

      return { success: false, error: null };
    } catch (error) {
      toast({
        title: "Błąd logowania",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  const signUp = useCallback(async (credentials: RegisterCredentials) => {
    setLoading(true);
    try {
      const { user: authUser, error } = await authService.signUp(credentials);
      
      if (error) {
        toast({
          title: "Błąd rejestracji",
          description: error.message || "Wystąpił błąd podczas rejestracji",
          variant: "destructive",
        });
        return { success: false, error };
      }

      if (authUser) {
        setUser(authUser);
        toast({
          title: "Rejestracja udana",
          description: `Witaj, ${authUser.full_name || authUser.email}!`,
        });
        navigate('/');
        return { success: true, error: null };
      }

      return { success: false, error: null };
    } catch (error) {
      toast({
        title: "Błąd rejestracji",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await authService.signOut();
      
      if (error) {
        toast({
          title: "Błąd wylogowania",
          description: error.message || "Wystąpił błąd podczas wylogowania",
          variant: "destructive",
        });
        return { success: false, error };
      }

      setUser(null);
      toast({
        title: "Wylogowano pomyślnie",
        description: "Do zobaczenia!",
      });
      navigate('/');
      return { success: true, error: null };
    } catch (error) {
      toast({
        title: "Błąd wylogowania",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, [navigate, toast]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await authService.resetPassword(email);
      
      if (error) {
        toast({
          title: "Błąd resetowania hasła",
          description: error.message || "Wystąpił błąd podczas resetowania hasła",
          variant: "destructive",
        });
        return { success: false, error };
      }

      toast({
        title: "Email wysłany",
        description: "Sprawdź swoją skrzynkę email, aby zresetować hasło",
      });
      return { success: true, error: null };
    } catch (error) {
      toast({
        title: "Błąd resetowania hasła",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { success: false, error };
    }
  }, [toast]);

  const updateProfile = useCallback(async (updates: Partial<AuthUser>) => {
    try {
      const { user: updatedUser, error } = await authService.updateProfile(updates);
      
      if (error) {
        toast({
          title: "Błąd aktualizacji profilu",
          description: error.message || "Wystąpił błąd podczas aktualizacji profilu",
          variant: "destructive",
        });
        return { success: false, error };
      }

      if (updatedUser) {
        setUser(updatedUser);
        toast({
          title: "Profil zaktualizowany",
          description: "Twój profil został pomyślnie zaktualizowany",
        });
        return { success: true, error: null };
      }

      return { success: false, error: null };
    } catch (error) {
      toast({
        title: "Błąd aktualizacji profilu",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
      return { success: false, error };
    }
  }, [toast]);

  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  const isAdmin = useCallback(() => {
    return authService.isAdmin();
  }, []);

  const isModerator = useCallback(() => {
    return authService.isModerator();
  }, []);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated,
    isAdmin,
    isModerator,
  };
};