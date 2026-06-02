import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAdminLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    // Check admin role
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      return { isAdmin: false, applications: [], contacts: [] };
    }

    const [apps, contacts] = await Promise.all([
      supabase.from("apply_submissions").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(500),
    ]);

    return {
      isAdmin: true,
      applications: apps.data ?? [],
      contacts: contacts.data ?? [],
    };
  });
