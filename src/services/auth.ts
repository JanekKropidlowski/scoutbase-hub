import { supabase } from "@/integrations/supabase/client";
import { User, Session, AuthError } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'moderator';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  full_name: string;
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
}

class AuthService {
  private currentUser: AuthUser | null = null;
  private currentSession: Session | null = null;

  constructor() {
    // Initialize auth state
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await this.setSession(session);
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await this.setSession(session);
        } else if (event === 'SIGNED_OUT') {
          this.clearSession();
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  private async setSession(session: Session) {
    this.currentSession = session;
    if (session.user) {
      await this.fetchUserProfile(session.user.id);
    }
  }

  private clearSession() {
    this.currentUser = null;
    this.currentSession = null;
  }

  private async fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      this.currentUser = {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        role: data.role,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  async signIn(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      if (data.user && data.session) {
        await this.setSession(data.session);
        return { user: this.currentUser, error: null };
      }

      return { user: null, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  }

  async signUp(credentials: RegisterCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.full_name,
          },
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        await this.setSession(data.session);
        return { user: this.currentUser, error: null };
      }

      return { user: null, error: null };
    } catch (error) {
      return { user: null, error: error as AuthError };
    }
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      this.clearSession();
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async updateProfile(updates: Partial<AuthUser>): Promise<{ user: AuthUser | null; error: any }> {
    try {
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          full_name: updates.full_name,
          avatar_url: updates.avatar_url,
          phone: updates.phone,
          organization: updates.organization,
          updated_at: new Date().toISOString(),
        })
        .eq('id', this.currentUser.id)
        .select()
        .single();

      if (error) throw error;

      this.currentUser = {
        ...this.currentUser,
        ...data,
      };

      return { user: this.currentUser, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isModerator(): boolean {
    return this.currentUser?.role === 'moderator' || this.currentUser?.role === 'admin';
  }

  async refreshSession(): Promise<void> {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (session) {
        await this.setSession(session);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  }
}

export const authService = new AuthService();
export default authService;