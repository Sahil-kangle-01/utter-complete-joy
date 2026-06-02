import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Layout, PageHero } from "@/components/site/Layout";
import { getAdminLeads } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { LogOut, ChevronDown, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Induxtron Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLeadsPage,
});

type Row = Record<string, unknown> & { id: string; created_at: string };

function AdminLeadsPage() {
  const navigate = useNavigate();
  const fetchLeads = useServerFn(getAdminLeads);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => fetchLeads(),
  });

  const [tab, setTab] = useState<"applications" | "contacts">("applications");

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <Layout>
      <PageHero tag="ADMIN" title="Lead" highlight="Inbox." sub="Applications and contact messages, newest first." />

      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex gap-2">
              <TabBtn active={tab === "applications"} onClick={() => setTab("applications")}>
                Applications {data?.applications && <span className="opacity-70">({data.applications.length})</span>}
              </TabBtn>
              <TabBtn active={tab === "contacts"} onClick={() => setTab("contacts")}>
                Contacts {data?.contacts && <span className="opacity-70">({data.contacts.length})</span>}
              </TabBtn>
            </div>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:border-gold transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>

          {isLoading && <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">Loading…</div>}
          {isError && (
            <div className="glass-card rounded-2xl p-8 text-center text-red-400">
              {error instanceof Error ? error.message : "Failed to load leads"}
            </div>
          )}

          {data && !data.isAdmin && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-foreground mb-2">You're signed in, but you don't have admin access.</p>
              <p className="text-sm text-muted-foreground">
                Ask Sahil to grant your account the <code className="text-gold">admin</code> role.
              </p>
            </div>
          )}

          {data?.isAdmin && tab === "applications" && (
            <LeadList
              rows={data.applications as Row[]}
              keyFields={["name", "company", "email", "phone"]}
              detailFields={[
                "role", "city", "industry", "team_size", "revenue",
                "website", "source", "systems", "challenge",
              ]}
              emptyMsg="No applications yet."
            />
          )}

          {data?.isAdmin && tab === "contacts" && (
            <LeadList
              rows={data.contacts as Row[]}
              keyFields={["name", "company", "email", "phone"]}
              detailFields={["city", "system_interest", "message"]}
              emptyMsg="No contact messages yet."
            />
          )}
        </div>
      </section>
    </Layout>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function LeadList({
  rows, keyFields, detailFields, emptyMsg,
}: {
  rows: Row[];
  keyFields: string[];
  detailFields: string[];
  emptyMsg: string;
}) {
  if (rows.length === 0) {
    return <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">{emptyMsg}</div>;
  }
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <LeadRow key={r.id} row={r} keyFields={keyFields} detailFields={detailFields} />
      ))}
    </div>
  );
}

function LeadRow({ row, keyFields, detailFields }: { row: Row; keyFields: string[]; detailFields: string[] }) {
  const [open, setOpen] = useState(false);
  const fmt = (v: unknown) => Array.isArray(v) ? v.join(", ") : v == null || v === "" ? "—" : String(v);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 sm:px-5 py-4 flex items-center gap-3 hover:bg-secondary/40 transition-colors"
      >
        {open ? <ChevronDown size={16} className="text-gold shrink-0" /> : <ChevronRight size={16} className="text-muted-foreground shrink-0" />}
        <div className="flex-1 grid sm:grid-cols-4 gap-2 sm:gap-4 min-w-0">
          {keyFields.map((f) => (
            <div key={f} className="text-sm text-foreground truncate">
              {fmt(row[f])}
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground shrink-0">
          {new Date(row.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
        </div>
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-border">
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {detailFields.map((f) => (
              <div key={f} className="flex flex-col sm:flex-row sm:gap-3 py-1">
                <dt className="text-xs tracking-[0.18em] text-muted-foreground uppercase sm:w-32 shrink-0">{f.replace(/_/g, " ")}</dt>
                <dd className="text-foreground whitespace-pre-wrap break-words">{fmt(row[f])}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
