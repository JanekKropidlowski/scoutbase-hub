import { supabase } from "@/integrations/supabase/client";

export type Base = {
  id: string;
  name: string;
  location: string;
  image?: string | null;
  rating: number;
  price?: string | null;
  capacity?: number | null;
  description?: string | null;
  featured: boolean;
  created_at: string;
};

export async function fetchTopBases(limit: number = 3): Promise<Base[]> {
  const { data, error } = await supabase
    .from("bases")
    .select("*")
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }
  return (data ?? []) as Base[];
}

export async function fetchFeaturedBases(limit: number = 8): Promise<Base[]> {
  const { data, error } = await supabase
    .from("bases")
    .select("*")
    .eq("featured", true)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }
  return (data ?? []) as Base[];
}


