import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { Quote } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Real ROI from Induxtron AI Deployments" },
      { name: "description", content: "Six anonymised deployments across HVAC, pharma, calibration, auto, equipment and cold chain. Measurable rupee ROI within 90 days." },
      { name: "keywords", content: "AI case studies India manufacturing, RFQ automation ROI, calibration renewal case study, GeM tender wins" },
      { property: "og:title", content: "Case Studies — Real ROI from Induxtron AI Deployments" },
      { property: "og:description", content: "Six deployments. Real numbers. Real rupees. Across Maharashtra industry." },
      { property: "og:url", content: "https://induxtron.com/case-studies" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.com/case-studies" }],
  }),
  component: CaseStudiesPage,
});

const cases = [
  { id: 1, company: "HVAC Contractor", city: "Aurangabad", system: "QuoteGPT", before: "RFQ response 36h", after: "RFQ response 52s", roi: "+₹85L / yr", quote: "Three competitors. Same RFQ. We were the only quote in the buyer's inbox by lunch.", time: "ROI in 6 weeks", industry: "HVAC" },
  { id: 2, company: "Calibration Lab", city: "Pune", system: "CertAlert", before: "Renewal rate 64%", after: "Renewal rate 89%", roi: "+₹38L ARR", quote: "We did not realise how much business was quietly leaking out the back door each month.", time: "ROI in 4 weeks", industry: "Calibration" },
  { id: 3, company: "Industrial Dealer", city: "Nashik", system: "IndustrialBot", before: "0.6% conversion", after: "7.4% conversion", roi: "+16 deals / mo", quote: "Visitors at 11 PM now get a real answer. Half of them ping us by morning.", time: "ROI in 3 weeks", industry: "Equipment" },
  { id: 4, company: "Auto Components", city: "Aurangabad", system: "QuoteGPT", before: "Win rate 19%", after: "Win rate 34%", roi: "+₹62L / yr", quote: "Our Tier-1 RFQs are now drafted before the spec sheet finishes downloading.", time: "ROI in 8 weeks", industry: "Auto" },
  { id: 5, company: "Pharma Plant", city: "Aurangabad", system: "TenderRadar", before: "0 tenders / mo", after: "3 wins / quarter", roi: "+₹1.1 Cr / yr", quote: "We had no idea this much GeM volume existed in our category.", time: "ROI in 10 weeks", industry: "Pharma" },
  { id: 6, company: "Cold Chain Operator", city: "Mumbai", system: "ChurnRadar", before: "Churn 14%", after: "Churn 6%", roi: "+₹72L saved", quote: "Four key accounts caught and saved last quarter alone.", time: "ROI in 12 weeks", industry: "Cold Chain" },
];

const filters = ["All", "QuoteGPT", "CertAlert", "IndustrialBot", "TenderRadar", "ChurnRadar"];

function CaseStudiesPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? cases : cases.filter((c) => c.system === active);

  return (
    <Layout>
      <PageHero
        tag="PROOF"
        title="Real results."
        highlight="Real rupees."
        sub="Each engagement is run by Sahil personally. Numbers below are aggregated and anonymised; full case studies available on request."
      />

      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm border transition-colors ${
                active === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 sm:gap-6">
          {visible.map((c) => (
            <article key={c.id} className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                <div>
                  <div className="font-semibold">{c.company}</div>
                  <div className="text-xs text-muted-foreground">{c.city} · {c.industry}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-text-accent border border-primary/30">{c.system}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Before</div>
                  <div className="font-mono text-xs sm:text-sm mt-1 break-words">{c.before}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gold">After</div>
                  <div className="font-mono text-xs sm:text-sm mt-1 break-words">{c.after}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Impact</div>
                  <div className="font-mono text-xs sm:text-sm mt-1 text-gradient font-bold break-words">{c.roi}</div>
                </div>
              </div>
              <div className="border-l-2 border-gold pl-4 italic text-sm sm:text-base text-foreground/90">
                <Quote className="text-gold mb-2" size={16} />
                {c.quote}
              </div>
              <div className="mt-5 text-xs text-muted-foreground">{c.time}</div>
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
