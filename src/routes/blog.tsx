import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Induxtron Insights" },
      { name: "description", content: "Insights for Indian industrial businesses. AI strategy, industry analysis, product updates, case studies." },
    ],
  }),
  component: BlogPage,
});

const featured = {
  title: "Why Indian HVAC businesses lose 40% of RFQs before they even respond",
  excerpt: "We pulled six months of inbound RFQs from a 40-person HVAC contractor and tracked exactly when each was answered, who answered first, and who won the order. The results were not subtle.",
  category: "Industry Insights",
  read: "9 min read",
  date: "May 12, 2026",
};

const posts = [
  { title: "GeM procurement crossed ₹4 Lakh Crore. Are you bidding?", category: "AI Strategy", read: "6 min", date: "May 8, 2026" },
  { title: "The hidden cost of manual quoting in B2B manufacturing", category: "Industry Insights", read: "7 min", date: "May 4, 2026" },
  { title: "How one calibration lab recovered ₹12 Lakhs in lapsed renewals", category: "Case Studies", read: "5 min", date: "Apr 28, 2026" },
  { title: "Why your sales head should not be writing quotes at 11 PM", category: "AI Strategy", read: "5 min", date: "Apr 21, 2026" },
  { title: "The account health score: a simple framework for B2B retention", category: "Product Updates", read: "8 min", date: "Apr 14, 2026" },
  { title: "Hindi, Hinglish, and the technical buyer: notes from IndustrialBot logs", category: "Product Updates", read: "6 min", date: "Apr 7, 2026" },
  { title: "Calibration certificate expiry: a quiet ₹34.5 lakh problem", category: "Industry Insights", read: "5 min", date: "Mar 31, 2026" },
  { title: "Five questions to ask before deploying any AI in your factory", category: "AI Strategy", read: "10 min", date: "Mar 24, 2026" },
];

const categories = ["All", "AI Strategy", "Industry Insights", "Product Updates", "Case Studies"];

function BlogPage() {
  return (
    <Layout>
      <PageHero
        tag="INSIGHTS"
        title="Insights for Indian"
        highlight="industrial businesses."
        sub="Notes from the field. Written by the people who deploy these systems for a living."
      />

      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <span key={c} className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <article className="glass-card rounded-2xl p-6 sm:p-8 md:p-12 grid md:grid-cols-5 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-2 aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/40 to-gold/30 grid-bg" />
            <div className="md:col-span-3">
              <div className="text-[10px] sm:text-xs tracking-[0.3em] text-gold mb-3">FEATURED · {featured.category}</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{featured.title}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {featured.read}</span>
                <span>·</span>
                <span>{featured.date}</span>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-primary group">
                Read full piece <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="glass-card rounded-2xl p-6 flex flex-col">
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-primary/20 to-secondary mb-5 grid-bg" />
              <div className="text-xs tracking-[0.2em] text-gold mb-2">{p.category.toUpperCase()}</div>
              <h3 className="font-bold mb-3 flex-1">{p.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {p.read}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
