import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, CTA } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SpectraNoise } from "@/components/site/SpectraNoise";
import { HeroBackground } from "@/components/site/HeroBackground";
import {
  Clock, AlertTriangle, TrendingDown, ArrowRight, Snowflake, FlaskConical,
  Cog, Factory, Ruler, Truck, ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Induxtron — Where Industry Meets Intelligence" },
      { name: "description", content: "Five AI systems built for Indian industrial businesses. Quote acceleration, certificate renewals, 24x7 sales agents, tender intelligence, churn prediction." },
    ],
  }),
  component: HomePage,
});

const systems = [
  { slug: "quotegpt", name: "QuoteGPT", title: "Quote Acceleration", line: "RFQ to quote in 60 seconds", roi: "Win rate 18% → 35%", build: "4–6 Weeks" },
  { slug: "certalert", name: "CertAlert", title: "Revenue Protection", line: "Never lose a cert renewal", roi: "Renewal 65% → 88%", build: "3–5 Weeks" },
  { slug: "industrialbot", name: "IndustrialBot", title: "24×7 Sales Agent", line: "Website converts while you sleep", roi: "0.5% → 8% conversion", build: "3–4 Weeks" },
  { slug: "tenderradar", name: "TenderRadar", title: "Tender Intelligence", line: "Never miss a GeM tender", roi: "₹1.35 Cr / yr", build: "5–7 Weeks" },
  { slug: "churnradar", name: "ChurnRadar", title: "Retention AI", line: "Know before clients go silent", roi: "Churn 15% → 7%", build: "4–6 Weeks" },
] as const;

const industries = [
  { name: "HVAC & Refrigeration", icon: Snowflake, stat: "18% → 35%", label: "RFQ win rate" },
  { name: "Pharma Manufacturing", icon: FlaskConical, stat: "Zero lapses", label: "cert renewals missed" },
  { name: "Auto Components", icon: Cog, stat: "<60s", label: "quote turnaround" },
  { name: "Industrial Equipment", icon: Factory, stat: "0.5% → 8%", label: "site conversion" },
  { name: "Calibration Labs", icon: Ruler, stat: "₹34.5L", label: "ARR recovered" },
  { name: "Cold Chain & Logistics", icon: Truck, stat: "15% → 7%", label: "churn reduction" },
];

const trustItems = [
  "HVAC Contractors", "Pharma Manufacturers", "Auto Components",
  "Cold Chain", "Industrial Equipment", "Calibration Labs",
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (t: number) => {
            const p = Math.min((t - start) / dur, 1);
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <div ref={ref} className="font-display text-4xl md:text-6xl font-bold text-gradient">{prefix}{val}{suffix}</div>;
}

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <HeroBackground />
        <SpectraNoise opacity={0.04} />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center fade-up">
          <div className="text-xs tracking-[0.4em] text-gold mb-8">
            INDUXTRON · BUSINESS AI SYSTEMS
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
            <span className="block">WHERE INDUSTRY</span>
            <span className="block text-gradient">MEETS INTELLIGENCE</span>
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            AI systems built for Indian industrial businesses. Engineered for results.
            Available by application only.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:glow-primary transition-shadow">
              Request Access
            </Link>
            <Link to="/systems" className="px-8 py-4 rounded-md border border-border text-foreground hover:bg-accent transition-colors">
              Explore Systems
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-mono text-text-accent">
            <span>5 AI Systems</span><span className="text-border">|</span>
            <span>90-Day ROI</span><span className="text-border">|</span>
            <span>Select Businesses Only</span>
          </div>
        </div>
        <ChevronDown className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce" />
      </section>

      {/* TRUST TICKER */}
      <section className="py-10 border-y border-border overflow-hidden bg-secondary/40">
        <div className="text-center text-xs tracking-[0.3em] text-muted-foreground mb-6">
          TRUSTED BY BUSINESSES IN
        </div>
        <div className="relative">
          <div className="flex ticker-track gap-16 whitespace-nowrap">
            {[...trustItems, ...trustItems, ...trustItems].map((t, i) => (
              <span key={i} className="text-foreground/60 font-display tracking-wider">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto leading-tight">
            Indian industry runs on manual processes. <span className="text-gradient">That ends now.</span>
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { Icon: Clock, h: "RFQs answered in 48 hours.", b: "You lose to whoever replied first." },
              { Icon: AlertTriangle, h: "Calibration certificates expire.", b: "Clients quietly leave for competitors." },
              { Icon: TrendingDown, h: "Key accounts go silent.", b: "Nobody notices for months." },
            ].map(({ Icon, h, b }, i) => (
              <Reveal key={i} delay={i * 120} variant="scaleFade">
                <div className="glass-card p-8 rounded-xl h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{h}</h3>
                  <p className="text-muted-foreground">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE SYSTEMS */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] text-gold mb-4">THE PORTFOLIO</div>
            <h2 className="text-3xl md:text-5xl font-bold">Five AI Systems. Built for Indian Industry.</h2>
            <p className="mt-4 text-muted-foreground">Each system targets one critical revenue leak in your business.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90} variant="scaleFade">
                <Link
                  to="/systems/$slug"
                  params={{ slug: s.slug }}
                  className="glass-card p-7 rounded-xl group flex flex-col h-full"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                    <span className="text-primary font-mono text-sm">0{i + 1}</span>
                  </div>
                  <div className="text-gold text-sm font-mono tracking-wider mb-1">{s.name}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">{s.line}</p>
                  <div className="font-mono text-2xl text-gradient mb-1">{s.roi}</div>
                  <div className="text-xs text-muted-foreground mb-4">Build: {s.build}</div>
                  <span className="inline-flex items-center gap-2 text-primary text-sm group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROI NUMBERS */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xs tracking-[0.3em] text-gold mb-4">MEASURABLE IMPACT</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {[
              { v: 85, p: "₹", s: "L/yr", l: "QuoteGPT revenue lift" },
              { v: 345, p: "₹", s: "L ARR", l: "CertAlert recurring", small: true },
              { v: 135, p: "₹", s: " Cr/yr", l: "TenderRadar wins" },
              { v: 96, p: "₹", s: "L saved", l: "ChurnRadar retention" },
            ].map((n, i) => (
              <div key={i} className="px-4">
                <CountUp to={n.v} prefix={n.p} suffix={n.s} />
                <div className="mt-3 text-sm text-muted-foreground">{n.l}</div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-muted-foreground">Across 5 AI systems. Measurable ROI within 90 days.</p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Built for the industries that built India.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {industries.map(({ name, icon: Icon }, idx) => (
              <Reveal key={name} delay={idx * 60} variant="scaleFade">
                <div className="xray-card glass-card rounded-xl h-full">
                  <div className="xray-surface p-6 flex items-center gap-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="text-gold" size={22} />
                    </div>
                    <div className="font-semibold">{name}</div>
                  </div>
                  <div className="xray-reveal p-6 flex flex-col justify-center bg-bg-deep/90">
                    <div className="text-[10px] tracking-[0.3em] text-gold mb-1">DEPLOYED</div>
                    <div className="font-mono text-2xl text-gradient">+38%</div>
                    <div className="text-xs text-muted-foreground mt-1">avg revenue lift in {name.split(" ")[0]}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="We work with the few. Not the many."
        body="Induxtron builds AI systems for serious industrial businesses across Maharashtra. We take on new clients by application only. Every deployment is managed personally."
      />
    </Layout>
  );
}
