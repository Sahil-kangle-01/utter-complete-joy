import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Induxtron Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/leads", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/leads` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin/leads", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHero
        tag="ADMIN ACCESS"
        title={mode === "signin" ? "Sign" : "Create an"}
        highlight={mode === "signin" ? "in." : "account."}
        sub="This area is restricted to Induxtron administrators."
      />

      <section className="px-4 sm:px-6 pb-24">
        <form
          onSubmit={submit}
          className="max-w-md mx-auto glass-card rounded-2xl p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2">EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2">PASSWORD</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:glow-primary transition-shadow disabled:opacity-50"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                No account?{" "}
                <button type="button" onClick={() => setMode("signup")} className="text-gold hover:underline">
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have one?{" "}
                <button type="button" onClick={() => setMode("signin")} className="text-gold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="text-center text-xs text-muted-foreground pt-2">
            <Link to="/" className="hover:text-gold">← Back to site</Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}
