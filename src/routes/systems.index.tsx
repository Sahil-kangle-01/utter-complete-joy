import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/systems/")({
  head: () => ({
    meta: [
      { title: "Five AI Systems — Induxtron" },
      { name: "description", content: "Five AI systems built for Indian industry: QuoteGPT, CertAlert, IndustrialBot, TenderRadar, ChurnRadar." },
    ],
  }),
  component: SystemsPage,
});

const systems = [
  { slug: "quotegpt", name: "QuoteGPT", title: "Quote Acceleration", line: "From RFQ email to drafted quote in under 60 seconds.", roi: "₹85 Lakhs / yr", metric: "Win rate 18% → 35%", build: "4–6 Weeks" },
  { slug: "certalert", name: "CertAlert", title: "Recurring Revenue Protection", line: "Never let a calibration certificate expire again.", roi: "₹34.5 L ARR", metric: "Renewal 65% → 88%", build: "3–5 Weeks" },
  { slug: "industrialbot", name: "IndustrialBot", title: "24×7 AI Sales Agent", line: "Turn your website into a 24×7 AI sales agent.", roi: "8% conversion", metric: "0.5% → 8% on 2,000 visitors / mo", build: "3–4 Weeks" },
  { slug: "tenderradar", name: "TenderRadar", title: "Government Tender Intelligence", line: "Never miss a GeM or government tender relevant to your products.", roi: "₹135 L / yr", metric: "15+ portals daily", build: "5–7 Weeks" },
  { slug: "churnradar", name: "ChurnRadar", title: "Customer Retention AI", line: "Know which clients are going silent before they actually do.", roi: "₹96 L saved / yr", metric: "Churn 15% → 7%", build: "4–6 Weeks" },
] as const;

function SystemsPage() {
  return (
    <Layout>
      <PageHero
        tag="THE PORTFOLIO"
        title="Five AI Systems."
        highlight="One Mission."
        sub="Each system targets one critical revenue leak in your business. Deployed individually — or as a complete operating layer."
      />

      <section className="py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-5">
          {systems.map((s, i) => (
            <Link
              key={s.slug}
              to="/systems/$slug"
              params={{ slug: s.slug }}
              className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 grid md:grid-cols-12 gap-5 sm:gap-6 items-center group"
            >
              <div className="md:col-span-1 font-mono text-2xl sm:text-3xl text-gradient">0{i + 1}</div>
              <div className="md:col-span-7">
                <div className="text-gold text-[10px] sm:text-xs tracking-[0.3em] mb-2">{s.name.toUpperCase()}</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{s.line}</p>
              </div>
              <div className="md:col-span-3 space-y-1">
                <div className="font-mono text-xl sm:text-2xl text-gradient break-words">{s.roi}</div>
                <div className="text-xs text-muted-foreground">{s.metric}</div>
                <div className="text-xs text-muted-foreground">Build: {s.build}</div>
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
