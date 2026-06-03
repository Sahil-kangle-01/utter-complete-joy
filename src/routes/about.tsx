import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { Linkedin, Zap, Target, Shield, Award } from "lucide-react";
import sahilPhoto from "@/assets/sahil-kangle.jpeg";
import sudeshPhoto from "@/assets/sudesh-dahale.png";
import sakshiPhoto from "@/assets/sakshi-jomivale.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Induxtron — Built in Aurangabad for Indian Industry" },
      { name: "description", content: "Founded by Sahil Kangle in Aurangabad, Induxtron gives Indian industrial businesses world-class AI leverage. Application-only client roster." },
      { name: "keywords", content: "Induxtron, Sahil Kangle, AI Aurangabad, industrial AI India, manufacturing AI founder" },
      { property: "og:title", content: "About Induxtron — Built in Aurangabad for Indian Industry" },
      { property: "og:description", content: "Founded by Sahil Kangle. World-class AI leverage for Indian industrial and manufacturing businesses." },
      { property: "og:url", content: "https://induxtron.com/about" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: "Induxtron",
            founder: [
              { "@type": "Person", name: "Sahil Kangle", jobTitle: "Co-Founder", sameAs: ["https://www.linkedin.com/in/sahil-kangle"] },
              { "@type": "Person", name: "Sudesh Dahale", jobTitle: "Co-Founder", sameAs: ["https://www.linkedin.com/in/sudesh-dahale-240384257/"] },
              { "@type": "Person", name: "Sakshi Jomivale", jobTitle: "Co-Founder", sameAs: ["https://www.linkedin.com/in/sakshi-jomivale/"] },
            ],
            address: { "@type": "PostalAddress", addressLocality: "Aurangabad", addressCountry: "IN" },
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { Icon: Zap, title: "Speed", body: "We ship working systems in weeks, not quarters." },
  { Icon: Target, title: "Precision", body: "Every system targets one specific revenue leak." },
  { Icon: Shield, title: "Reliability", body: "Built to run 24×7 in real industrial environments." },
  { Icon: Award, title: "Ownership", body: "We deploy personally. We stay accountable." },
];

function AboutPage() {
  return (
    <Layout>
      <PageHero
        tag="ABOUT INDUXTRON"
        title="We believe Indian industry deserves"
        highlight="world-class AI."
        sub="Built in Aurangabad. For Aurangabad. For India."
      />

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
          <p>
            Induxtron started from watching manufacturing businesses lose revenue to manual
            processes — slow quotes, forgotten renewals, missed tenders. The opportunities were
            always there. The systems to capture them were not.
          </p>
          <p>
            We are engineers who grew up around HVAC businesses, pharma plants, and
            auto-component factories. We know these problems firsthand. We are building the
            tools we wish those businesses had a decade ago.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-14">
          <div className="text-xs tracking-[0.3em] text-gold mb-4">OUR MISSION</div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            To give every Indian industrial business the same{" "}
            <span className="text-gradient">AI leverage</span> that Fortune 500 companies have
            had for years.
          </h2>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <div className="text-xs tracking-[0.3em] text-gold mb-4">VALUES</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">What we are built on.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ Icon, title, body }) => (
              <div key={title} className="glass-card p-6 sm:p-7 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <Icon className="text-primary" size={22} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <div className="text-xs tracking-[0.3em] text-gold mb-4">CO-FOUNDERS</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">The team behind Induxtron.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sahil Kangle",
                photo: sahilPhoto,
                linkedin: "https://www.linkedin.com/in/sahil-kangle",
                bio: "Co-Founder, Induxtron Business Systems. Building AI infrastructure for the industrial businesses of Maharashtra and beyond.",
              },
              {
                name: "Sudesh Dahale",
                photo: sudeshPhoto,
                linkedin: "https://www.linkedin.com/in/sudesh-dahale-240384257/",
                bio: "Co-Founder, Induxtron Business Systems. Engineering reliable AI systems for real-world industrial operations.",
              },
              {
                name: "Sakshi Jomivale",
                photo: sakshiPhoto,
                linkedin: "https://www.linkedin.com/in/sakshi-jomivale/",
                bio: "Co-Founder, Induxtron Business Systems. Driving product, design, and customer success for Indian industry.",
              },
            ].map((f) => (
              <div key={f.name} className="glass-card rounded-2xl p-6 sm:p-7 text-center">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/30 to-gold/20 max-w-[200px] mx-auto mb-5">
                  <img src={f.photo} alt={`${f.name}, Co-Founder of Induxtron`} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs tracking-[0.3em] text-gold mb-2">CO-FOUNDER</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{f.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{f.bio}</p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm hover:gap-3 transition-all"
                >
                  <Linkedin size={16} /> Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-muted-foreground text-xs tracking-[0.2em] mb-2">UDYAM</div>
            <div className="font-mono break-all">UDYAM-MH-04-0296135</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs tracking-[0.2em] mb-2">LOCATION</div>
            <div>Chhatrapati Sambhajinagar, Maharashtra</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs tracking-[0.2em] mb-2">CONTACT</div>
            <a href="mailto:sahil@induxtron.com" className="hover:text-gold break-all">sahil@induxtron.com</a>
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
