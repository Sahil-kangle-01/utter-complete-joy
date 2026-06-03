import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { Snowflake, FlaskConical, Cog, Factory, Ruler, Truck } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — HVAC, Pharma, Auto, Calibration, Cold Chain" },
      { name: "description", content: "Induxtron AI built for six Indian industrial verticals: HVAC contractors, pharma plants, auto component makers, calibration labs, equipment dealers, and cold chain operators." },
      { name: "keywords", content: "AI for HVAC India, pharma manufacturing AI, auto components AI, calibration lab software, cold chain AI" },
      { property: "og:title", content: "Industries We Serve — Induxtron" },
      { property: "og:description", content: "Six verticals. One operating layer. Tuned to Indian industrial reality." },
      { property: "og:url", content: "https://induxtron.com/industries" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.com/industries" }],
  }),
  component: IndustriesPage,
});

const industries = [
  { Icon: Snowflake, name: "HVAC & Refrigeration Contractors", stat: "~₹85L/yr revenue lift", problems: "Slow RFQ response. AMC certificates expiring silently. Walk-in enquiries unanswered after hours.", systems: ["QuoteGPT", "CertAlert", "IndustrialBot"], use: "A 40-person HVAC contractor in Aurangabad responds to RFQs in 60 seconds, raises win rate from 18% to 35%." },
  { Icon: FlaskConical, name: "Pharma Manufacturing Plants", stat: "Compliance + retention", problems: "Equipment calibration tracking. Audit-ready certificate trail. Tender opportunities missed.", systems: ["CertAlert", "TenderRadar", "ChurnRadar"], use: "Pharma plant tracks 600+ instrument calibrations and bids 3+ relevant tenders per month." },
  { Icon: Cog, name: "Auto Component Manufacturers", stat: "Quote-to-order acceleration", problems: "Multi-spec RFQs from Tier-1 OEMs. Drawing interpretation. Quote turnaround.", systems: ["QuoteGPT", "ChurnRadar"], use: "Tier-2 component supplier extracts 12+ fields from OEM RFQs and drafts quotes in under a minute." },
  { Icon: Ruler, name: "Calibration Laboratories", stat: "₹34.5L ARR recovered", problems: "1,000+ certificates expiring across the year. Renewal reminders missed. Lapsed clients not won back.", systems: ["CertAlert", "IndustrialBot"], use: "NABL-accredited lab moves renewal rate from 65% to 88% with the 3-touch sequence." },
  { Icon: Factory, name: "Industrial Equipment Dealers", stat: "8% website conversion", problems: "Dealership website generates leads at 0.5%. Tender visibility. Long sales cycles.", systems: ["IndustrialBot", "TenderRadar", "QuoteGPT"], use: "Dealer network deploys IndustrialBot — converts 8% of 2,000 monthly visitors." },
  { Icon: Truck, name: "Cold Chain & Logistics", stat: "Account retention", problems: "Long-tail key accounts going silent. Compliance certifications. Renewal tracking.", systems: ["ChurnRadar", "CertAlert"], use: "Cold chain operator catches 4 at-risk key accounts per quarter before they switch providers." },
];

function IndustriesPage() {
  return (
    <Layout>
      <PageHero
        tag="INDUSTRIES"
        title="Built for the industries"
        highlight="that run India."
        sub="Six industry verticals. One operating layer. Every system tuned to the technical, regulatory, and commercial reality of Indian manufacturing."
      />

      <section className="py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
          {industries.map(({ Icon, name, stat, problems, systems, use }, i) => (
            <div key={name} className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 grid md:grid-cols-12 gap-5 sm:gap-6">
              <div className="md:col-span-2 flex md:block">
                <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
                  <Icon className="text-gold" size={26} />
                </div>
              </div>
              <div className="md:col-span-6">
                <div className="text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground mb-2">0{i + 1} · {stat}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3"><span className="text-foreground font-semibold">Problems they face — </span>{problems}</p>
                <p className="text-sm sm:text-base text-muted-foreground"><span className="text-foreground font-semibold">Example — </span>{use}</p>
              </div>
              <div className="md:col-span-4">
                <div className="text-xs tracking-[0.2em] text-gold mb-3">SYSTEMS</div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {systems.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs bg-primary/15 text-text-accent border border-primary/30">{s}</span>
                  ))}
                </div>
                <Link to="/apply" className="inline-flex text-sm text-primary hover:underline">
                  Request access for {name.split(" ")[0]} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
