import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: Error }>; 
  signInWithOAuth: (provider: "google" | "facebook") => Promise<{ error?: Error }>; 
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error?: Error }>; 
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getAdminEmailsFromEnv(): Set<string> {
  const list = (import.meta as any)?.env?.VITE_ADMIN_EMAILS as string | undefined;
  if (!list) return new Set();
  return new Set(list.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean));
}

async function upsertProfile(user: User, fullName?: string) {
  try {
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: fullName ?? user.user_metadata?.full_name ?? null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
    }, { onConflict: "id" });
  } catch (_) {
    // ignore profile upsert errors in client
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const adminEmails = getAdminEmailsFromEnv();
    const userEmail = user?.email?.toLowerCase();
    setIsAdmin(userEmail ? adminEmails.has(userEmail) : false);
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    isAdmin,
    signInWithEmail: async (email: string, password: string) => {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        await upsertProfile(data.user);
      }
      return { error: error ?? undefined };
    },
    signInWithOAuth: async (provider) => {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      return { error: error ?? undefined };
    },
    signUpWithEmail: async (email: string, password: string, fullName?: string) => {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      if (!error && data.user) {
        await upsertProfile(data.user, fullName);
      }
      return { error: error ?? undefined };
    },
    signOut: async () => {
      await supabase.auth.signOut();
    }
  }), [user, session, loading, isAdmin]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}